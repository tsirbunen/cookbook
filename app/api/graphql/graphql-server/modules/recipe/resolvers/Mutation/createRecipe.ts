import { RecipeHandler } from '../../../../handlers/recipes/handler'
import type { CreateRecipeInput } from '../../../../handlers/types-and-interfaces/types'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const createRecipe: NonNullable<MutationResolvers['createRecipe']> = async (
  _parent,
  { createRecipeInput },
  context
) => {
  const handler = new RecipeHandler(context.dataStore)
  // FIXME: Get rid of type casting to domain types
  const newRecipe = await handler.createNewRecipe(createRecipeInput as CreateRecipeInput)

  return {
    __typename: 'Recipe',
    ...newRecipe
  }
}
