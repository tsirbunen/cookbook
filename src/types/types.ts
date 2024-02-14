import { Recipe } from './graphql-schema-types.generated'

export enum Category {
  'BREAKFAST' = 'BREAKFAST',
  'LUNCH' = 'LUNCH',
  'DINNER' = 'DINNER',
  'BRUNCH' = 'BRUNCH',
  'SNACK' = 'SNACK'
}

export type RecipeCategory = {
  category: string
  recipes: Recipe[]
}

export enum FilterableRecipeProperty {
  categories = 'categories',
  ingredients = 'ingredients'
}
