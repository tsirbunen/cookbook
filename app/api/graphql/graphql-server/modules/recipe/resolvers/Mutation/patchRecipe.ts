import { RecipeHandler } from '../../../../../../../../app-business-domain/handlers/recipes/handler'
import type { PatchRecipeInput } from '../../../../../../../../app-business-domain/types-and-interfaces/types'
import { dataStore } from '../../../../../../../../app-datastore/data-stores/data-store'
import type { BaseError, MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const patchRecipe: NonNullable<MutationResolvers['patchRecipe']> = async (
  _parent,
  { recipeId, recipePatch },
  _ctx
) => {
  const handler = new RecipeHandler(dataStore)
  // FIXME: Get rid of type casting to domain types
  const result = await handler.patchExistingRecipe(recipeId, recipePatch as PatchRecipeInput)
  if ((result as BaseError).errorMessage) return result

  return {
    __typename: 'Recipe',
    ...result
  }
}
