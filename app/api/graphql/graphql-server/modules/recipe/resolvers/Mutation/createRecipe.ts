import { RecipeHandler } from '../../../../../../../../app-business-domain/handlers/recipes/handler'
import type { CreateRecipeInput } from '../../../../../../../../app-business-domain/types-and-interfaces/types'
import type { BaseError, MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const createRecipe: NonNullable<MutationResolvers['createRecipe']> = async (
  _parent,
  { createRecipeInput },
  context
) => {
  const handler = new RecipeHandler(context.dataStore)
  // FIXME: Get rid of type casting to domain types
  const result = await handler.createNewRecipe(createRecipeInput as CreateRecipeInput)
  if ((result as BaseError).errorMessage) return result

  return {
    __typename: 'Recipe',
    ...result
  }
}
