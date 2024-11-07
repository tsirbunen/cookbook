import { TargetSchema } from '../../../../../../src/types/graphql-schema-types.generated'
import type { ValidationSchema } from '../../modules/types.generated'
import {
  ingredientGroupSchema,
  instructionGroupSchema,
  isPrivateSchema,
  ovenNeededSchema,
  recipeDescriptionSchema,
  recipeLanguageSchema,
  recipeTagSchema,
  recipeTitleSchema
} from './property-schemas'

const createRecipeInputJsonSchema = {
  title: 'Create recipe input',
  description: 'Input for creating a recipe',
  type: 'object',
  required: ['title', 'language', 'ovenNeeded', 'isPrivate', 'ingredientGroups', 'instructionGroups'],
  properties: {
    title: recipeTitleSchema,
    description: recipeDescriptionSchema,
    tags: {
      type: 'array',
      uniqueItems: true,
      items: recipeTagSchema,
      errorMessage: {
        uniqueItems: 'Recipe tags must be unique!'
      }
    },
    language: recipeLanguageSchema,
    ovenNeeded: ovenNeededSchema,
    isPrivate: isPrivateSchema,
    ingredientGroups: {
      type: 'array',
      items: ingredientGroupSchema,
      minItems: 1,
      errorMessage: {
        minItems: 'There must be at least one ingredient group!'
      }
    },
    instructionGroups: {
      type: 'array',
      items: instructionGroupSchema,
      minItems: 1,
      errorMessage: {
        minItems: 'There must be at least one instruction group!'
      }
    }
  },
  errorMessage: {
    properties: {
      title: 'Recipe must have a title!',
      language: 'Recipe must have a language!',
      ovenNeeded: 'Oven needed value must be set to true or false!',
      isPrivate: 'Is private value must be set to true or false!'
    }
  }
}

export const createRecipeInputSchema: ValidationSchema = {
  target: TargetSchema.CreateRecipeInput,
  schema: createRecipeInputJsonSchema
}
