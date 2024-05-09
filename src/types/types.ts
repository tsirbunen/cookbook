import { Recipe } from './graphql-schema-types.generated'

export enum FilterableRecipeProperty {
  categories = 'categories',
  languages = 'languages',
  ingredients = 'ingredients'
}

export type TimerData = {
  secondsAtStart: number
  startedAt: Date
}

export type CookingRecipeData = {
  recipe: Recipe
  ingredientsAddedIds: number[]
  instructionsCompletedIds: number[]
}

export type Settings = {
  soundsEnabled: boolean | null
}

export type ScaledIngredientData = {
  amount: number
  unit: string
}

export type ScalingData = {
  multiplier: number
  ingredientId?: number
}
