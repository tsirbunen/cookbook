import { Recipe } from './graphql-schema-types.generated'

// TODO: extract all categories from database!
export enum Category {
  'BREAKFAST' = 'BREAKFAST',
  'LUNCH' = 'LUNCH',
  'DINNER' = 'DINNER',
  'BRUNCH' = 'BRUNCH',
  'SNACK' = 'SNACK',
  'DESSERT' = 'DESSERT'
}

// TODO: extract all languages from database!
export enum LanguageOption {
  'ENGLISH' = 'ENGLISH',
  'SUOMI' = 'SUOMI'
}

export type RecipeCategory = {
  category: string
  recipes: Recipe[]
}

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
