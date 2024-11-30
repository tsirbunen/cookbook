import { eq, inArray } from 'drizzle-orm'
import type { RecipeToTagInsert, Tag } from '../../app-business-domain/types-and-interfaces/types'
import type { Database } from '../config/config'
import { recipesToTags, tags } from '../database-schemas/tags'

export class TagStore {
  // FIXME: Implement querying and sorting tags according to their usage count
  async getAllTags(trx: Database): Promise<Tag[]> {
    return await trx.query.tags.findMany()
  }

  async getByTagTexts(trx: Database, tagInputs: string[]) {
    return (
      (await trx.query.tags.findMany({
        where: inArray(tags.tag, tagInputs),
        columns: { id: true, tag: true }
      })) ?? []
    )
  }

  async removeRelationsToRecipes(trx: Database, relationIds: number[]) {
    await trx.delete(recipesToTags).where(inArray(recipesToTags.id, relationIds))
  }

  async create(trx: Database, tagsToCreate: string[]) {
    return await trx
      .insert(tags)
      .values(tagsToCreate.map((tag) => ({ tag })))
      .returning()
  }

  async getRecipesByTag(trx: Database, tagId: number) {
    const recipeToTagItems = await trx.query.recipesToTags.findMany({ where: eq(recipesToTags.tagId, tagId) })
    return recipeToTagItems.map((item) => item.recipeId)
  }

  async createRecipeRelations(trx: Database, tagRelationInputs: RecipeToTagInsert[]) {
    await trx.insert(recipesToTags).values(tagRelationInputs).returning()
  }

  async deleteRecipeRelations(trx: Database, recipeId: number) {
    await trx.delete(recipesToTags).where(eq(recipesToTags.recipeId, recipeId))
  }

  async deleteTag(trx: Database, tagId: number) {
    await trx.delete(tags).where(eq(tags.id, tagId))
  }
}
