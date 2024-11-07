import { createNewRecipe } from '../../../../services/recipes/service'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const createRecipe: NonNullable<MutationResolvers['createRecipe']> = async (_parent, { createRecipeInput }) => {
  return {
    __typename: 'Recipe',
    ...(await createNewRecipe(createRecipeInput))
  }
}
