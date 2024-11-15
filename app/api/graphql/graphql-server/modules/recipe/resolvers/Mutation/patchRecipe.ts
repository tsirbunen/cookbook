import { dataStore } from '../../../../database/data-stores/data-store'
import { RecipeHandler } from '../../../../handlers/recipes/handler'
import type { PatchRecipeInput } from '../../../../handlers/types-and-interfaces/types'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const patchRecipe: NonNullable<MutationResolvers['patchRecipe']> = async (
  _parent,
  { recipeId, recipePatch },
  _ctx
) => {
  const handler = new RecipeHandler(dataStore)
  // FIXME: Get rid of type casting to domain types
  const patchedRecipe = await handler.patchExistingRecipe(recipeId, recipePatch as PatchRecipeInput)

  return {
    __typename: 'Recipe',
    ...patchedRecipe
  }
}
