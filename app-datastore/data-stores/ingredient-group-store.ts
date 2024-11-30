import { eq } from 'drizzle-orm'
import type { Database } from '../config/config'
import { ingredientGroups } from '../database-schemas/ingredients'

export class IngredientGroupStore {
  async createIngredientGroup(trx: Database, groupInsert: { recipeId: number; title?: string | null }) {
    const createdGroup = await trx
      .insert(ingredientGroups)
      .values(groupInsert)
      .returning({ insertedId: ingredientGroups.id })
    return createdGroup[0]
  }

  async patchIngredientGroup(trx: Database, groupId: number, groupPatch: { title?: string | null }) {
    await trx.update(ingredientGroups).set(groupPatch).where(eq(ingredientGroups.id, groupId)).returning()
  }
}
