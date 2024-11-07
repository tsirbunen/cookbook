import { TargetSchema } from '../../../../../../../../src/types/graphql-schema-types.generated'
import { patchExistingRecipe } from '../../../../services/recipes/service'
import { validateInput } from '../../../../services/validation/service'
import type { MutationResolvers } from './../../../types.generated'

// @ts-expect-error The __typename will be correctly set due to the __isTypeOf implementation
// so we need not add additional type resolving here as required by TypeScript
export const patchRecipe: NonNullable<MutationResolvers['patchRecipe']> = async (
  _parent,
  { recipeId, recipePatch },
  _ctx
) => {
  const validationError = validateInput(recipePatch, TargetSchema.PatchRecipeInput)
  if (validationError) return { errorMessage: validationError }

  return {
    __typename: 'Recipe',
    ...(await patchExistingRecipe(recipeId, recipePatch))
  }
}
