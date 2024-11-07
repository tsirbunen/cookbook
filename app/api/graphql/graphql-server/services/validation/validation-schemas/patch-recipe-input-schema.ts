import { ValidationTarget } from '../../../../../../../src/types/graphql-schema-types.generated'
import type { ValidationSchema } from '../../../modules/types.generated'
import { recipeDescriptionSchema, recipeTitleSchema } from './property-schemas'

const patchRecipeInputJsonSchema = {
  title: 'Modify recipe input',
  description: 'Input for modifying a recipe',
  type: 'object',
  required: [],
  properties: {
    title: recipeTitleSchema,
    uniqueItems: true,
    description: recipeDescriptionSchema
  }
}

export const patchRecipeInputSchema: ValidationSchema = {
  target: ValidationTarget.PatchRecipeInput,
  schema: patchRecipeInputJsonSchema
}
