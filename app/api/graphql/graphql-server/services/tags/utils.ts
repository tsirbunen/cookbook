import { inArray } from 'drizzle-orm'
import { DatabaseType, TagDBSelect } from '../../database/inferred-types/inferred-types'
import { recipesToTags, tags } from '../../database/database-schemas/tags'
import { Tag } from '../../modules/types.generated'

export const getAllDatabaseTags = async (databaseOrTransaction: DatabaseType): Promise<Tag[]> => {
  const allTags = await databaseOrTransaction.query.tags.findMany()
  return allTags
}

export const handleFindExistingOrCreateNewTags = async (
  trx: DatabaseType,
  newRecipeId: number,
  tagInputs?: Array<string> | null
) => {
  if (!tagInputs) return

  const existingTagIds: Record<string, number> = {}
  const existingTags = await trx.query.tags.findMany({
    where: inArray(tags.tag, tagInputs),
    columns: { id: true, tag: true }
  })

  existingTags.forEach((tag: TagDBSelect) => {
    existingTagIds[tag.tag] = tag.id!
  })

  const tagsToCreate = tagInputs.filter((tag) => !existingTagIds[tag])
  const allTags = [...existingTags]
  if (tagsToCreate.length) {
    const newTags = await trx
      .insert(tags)
      .values(tagsToCreate.map((tag) => ({ tag })))
      .returning()

    for (const tag of newTags) {
      existingTagIds[tag.tag] = tag.id!
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
