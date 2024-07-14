import { patchExistingRecipe } from '../../../../services/recipes/service'
import type { MutationResolvers, Recipe } from './../../../types.generated'
export const patchRecipe: NonNullable<MutationResolvers['patchRecipe']> = async (
  _parent,
  { recipeId, recipePatch },
  _ctx
) => {
  const recipeWithUpdatedData = await patchExistingRecipe(recipeId, recipePatch)
  return recipeWithUpdatedData as unknown as Recipe
}
