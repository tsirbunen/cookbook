import { createNewRecipe } from '../../../../services/recipes/service'
import type { MutationResolvers, Recipe } from './../../../types.generated'
export const createRecipe: NonNullable<MutationResolvers['createRecipe']> = async (_parent, { recipeInput }, _ctx) => {
  const newRecipe = await createNewRecipe(recipeInput)
  return newRecipe as unknown as Recipe
}
