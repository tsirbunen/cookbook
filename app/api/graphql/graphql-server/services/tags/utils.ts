import { eq, inArray } from 'drizzle-orm'
import { recipesToTags, tags } from '../../database/database-schemas/tags'
import type { DatabaseType, RecipeSelectDBExpanded } from '../../database/inferred-types/inferred-types'
import type { Tag } from '../../modules/types.generated'

// FIXME: Implement sorting tags according to their usage count
export const getAllDatabaseTags = async (databaseOrTransaction: DatabaseType): Promise<Tag[]> => {
  const allTags = await databaseOrTransaction.query.tags.findMany()
  return allTags
}

export const handleFindExistingOrCreateNewTagsWithRelations = async (
  trx: DatabaseType,
  newRecipeId: number,
  tagInputs?: Array<string> | null
) => {
  if (!tagInputs?.length) return

  const existingTagIds: Record<string, number> = {}
  const existingTags =
    (await trx.query.tags.findMany({
      where: inArray(tags.tag, tagInputs),
      columns: { id: true, tag: true }
    })) ?? []

  for (const tag of existingTags) {
    existingTagIds[tag.tag] = tag.id
  }

  const tagsToCreate = tagInputs.filter((tag) => !existingTagIds[tag])
  const allTags = [...existingTags]
  if (tagsToCreate.length) {
    const newTags =
      (await trx
        .insert(tags)
        .values(tagsToCreate.map((tag) => ({ tag })))
        .returning()) ?? []

    for (const tag of newTags) {
      existingTagIds[tag.tag] = tag.id
    }

    allTags.push(...newTags)
  }

  const tagRelationInputs = tagInputs.map((tag) => ({
    tagId: existingTagIds[tag],
    recipeId: newRecipeId
  }))

  await trx.insert(recipesToTags).values(tagRelationInputs).returning()

  return allTags
}

export const handlePatchAndPurgeRecipeTags = async (
  trx: DatabaseType,
  tags: string[],
  originalRecipe: RecipeSelectDBExpanded
) => {
  const originalRecipeTagRelations = (originalRecipe?.recipesToTags ?? []).map((recipeTagRelation) => {
    return { id: recipeTagRelation.id, tag: recipeTagRelation.tags }
  })

  const recipeTagRelationsToRemoveIds: number[] = []
  const possiblyUnusedTagIds: number[] = []
  const alreadyExistingTags: string[] = []
  for (const relation of originalRecipeTagRelations) {
    if (!tags.includes(relation.tag.tag)) {
      recipeTagRelationsToRemoveIds.push(relation.id)
      possiblyUnusedTagIds.push(relation.tag.id)
    } else {
      alreadyExistingTags.push(relation.tag.tag)
    }
  }

  if (recipeTagRelationsToRemoveIds.length) {
    await removeRecipeTagRelations(trx, recipeTagRelationsToRemoveIds)
  }

  if (possiblyUnusedTagIds.length) {
    for (let i = 0; i < possiblyUnusedTagIds.length; i++) {
      const tagId = possiblyUnusedTagIds[i]
      const recipesWithThisTag = await trx.query.recipesToTags.findMany({
        where: eq(recipesToTags.tagId, tagId)
      })

      if (!recipesWithThisTag.length) {
        await trx.delete(recipesToTags).where(eq(recipesToTags.tagId, tagId))
      }
    }
  }

  const tagsToCreate = tags.filter((tag) => !alreadyExistingTags.includes(tag))

  await handleFindExistingOrCreateNewTagsWithRelations(trx, originalRecipe.id, tagsToCreate)
}

export const removeRecipeTagRelations = async (trx: DatabaseType, relationIds: number[]) => {
  await trx.delete(recipesToTags).where(inArray(recipesToTags.id, relationIds))
}
