import { eq, inArray } from 'drizzle-orm'
import type { Ingredient } from '../../handlers/types-and-interfaces/types'
import type { Database } from '../config/config'
import { ingredients } from '../database-schemas/ingredients'

export class IngredientStore {
  async insertIngredient(trx: Database, updatedPatchedIngredient: Ingredient) {
    const newIngredient = await trx
      .insert(ingredients)
      .values(updatedPatchedIngredient)
      .returning({ insertedId: ingredients.id })
    return newIngredient[0].insertedId
  }

  async updateIngredient(trx: Database, id: number, updatedPatchedIngredient: Ingredient) {
    await trx.update(ingredients).set(updatedPatchedIngredient).where(eq(ingredients.id, id)).returning()
  }

  async removePreviousIngredientReferences(trx: Database, ingredientsToDeleteIds: number[]) {
    await trx
      .update(ingredients)
      .set({ previousId: null })
      .where(inArray(ingredients.id, ingredientsToDeleteIds))
      .returning()
  }

  async deleteIngredients(trx: Database, ingredientsToDeleteIds: number[]) {
    await trx.delete(ingredients).where(inArray(ingredients.id, ingredientsToDeleteIds))
  }
}
