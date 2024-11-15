import type { DataStore } from '../../database/data-stores/data-store'
import type { RecipeExpanded, RecipeTag, RecipeToTag, Tag } from '../types-and-interfaces/types'

export class TagHandler {
  constructor(private dataStore: DataStore) {}

  async getAllTags(): Promise<Tag[]> {
    return await this.dataStore.withinTransaction(async () => {
      return await this.dataStore.getAllTags()
    })
  }

  // Note: This function does not check for existing relations, so only use it when it is known that
  // the relations do not exist yet.
  async findOrCreateTagsAndSetRelations(newRecipeId: number, tagInputs?: Array<string> | null) {
    if (!tagInputs?.length) return

    const existingTags = await this.dataStore.getTagsByTagTexts(tagInputs)
    const tagsMap: Record<string, number> = this.tagsToMap(existingTags)

    const tagsToCreate = tagInputs.filter((tag) => !tagsMap[tag])
    if (tagsToCreate.length) {
      const newTags = await this.dataStore.createTags(tagsToCreate)

      for (const tag of newTags) {
        tagsMap[tag.tag] = tag.id
      }
    }

    const tagRelationInputs = this.getRelationInputs(tagInputs, tagsMap, newRecipeId)
    await this.dataStore.createRecipeToTagRelations(tagRelationInputs)

    return this.mapToTags(tagsMap)
  }

  async handlePatchAndPurgeRecipeTags(tags: string[], originalRecipe: RecipeExpanded) {
    const originalRelations = this.getFormattedRelations(originalRecipe.recipesToTags)
    const relationsToRemove = this.getRelationsToRemove(tags, originalRelations)
    if (relationsToRemove.length) await this.removeRelationAndMaybeTag(relationsToRemove)

    const originalTagTexts = originalRelations.map(({ tag }) => tag.tag)
    const tagsToCreate = tags.filter((tag) => !originalTagTexts.includes(tag))
    await this.findOrCreateTagsAndSetRelations(originalRecipe.id, tagsToCreate)
  }

  async removeRelationAndMaybeTag(relationsToRemove: { id: number; tag: { id: number; tag: string } }[]) {
    for (const relation of relationsToRemove) {
      await this.dataStore.removeRecipeTagRelations([relation.id])
      const otherRecipesWithTagIds = await this.dataStore.getRecipesByTag(relation.tag.id)
      if (!otherRecipesWithTagIds.length) await this.dataStore.removeTag(relation.tag.id)
    }
  }

  getRelationsToRemove(tags: string[], originalRelations: { id: number; tag: { id: number; tag: string } }[]) {
    return originalRelations.filter(({ tag }) => !tags.includes(tag.tag))
  }

  getRelationInputs(tagInputs: string[], existingTagIds: Record<string, number>, newRecipeId: number) {
    return tagInputs.map((tag) => ({
      tagId: existingTagIds[tag],
      recipeId: newRecipeId
    }))
  }

  tagsToMap(existingTags: Tag[]) {
    return existingTags.reduce(
      (acc, tag) => {
        acc[tag.tag] = tag.id
        return acc
      },
      {} as Record<string, number>
    )
  }

  mapToTags(existingTags: Record<string, number>) {
    return Object.entries(existingTags).map(([tag, id]) => ({ tag, id }))
  }

  getFormattedRelations(recipesToTags: RecipeToTag[] | null): RecipeTag[] {
    return (
      recipesToTags?.map(({ id, tags }) => {
        return { id, tag: tags }
      }) ?? []
    )
  }
}
