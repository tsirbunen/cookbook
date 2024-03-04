import { RecipesFilterValues } from '../app-pages/recipes/page/FilteringProvider'
import { RecipeCategory } from '../types/types'
import { AppState } from './StateContextProvider'

export enum Dispatch {
  SET_RECIPES_AND_FILTERS = 'SET_RECIPES_AND_FILTERS',
  UPDATE_PICKED_RECIPE_IDS = 'UPDATE_PICKED_RECIPE_IDS'
}

export type DispatchAction =
  | { type: Dispatch.SET_RECIPES_AND_FILTERS; payload: { recipes: RecipeCategory[]; filters: RecipesFilterValues } }
  | { type: Dispatch.UPDATE_PICKED_RECIPE_IDS; payload: { recipeId: number; category: string } }

export const reducer = (state: AppState, action: DispatchAction) => {
  switch (action.type) {
    case Dispatch.SET_RECIPES_AND_FILTERS:
      return { ...state, recipes: action.payload.recipes, filters: action.payload.filters }
    case Dispatch.UPDATE_PICKED_RECIPE_IDS:
      return updatePickedRecipeIds(state, action.payload)
    default:
      throw new Error(`${JSON.stringify(action)} is not an app state reducer action!`)
  }
}

const updatePickedRecipeIds = (state: AppState, payload: { recipeId: number; category: string }) => {
  const { recipeId, category } = payload
  const pickedCategoryRecipeIds = state.pickedRecipeIdsByCategory[category] ?? []
  const shouldRemove = pickedCategoryRecipeIds.includes(recipeId)

  const updatedIds = shouldRemove
    ? pickedCategoryRecipeIds.filter((id) => id !== recipeId)
    : [...pickedCategoryRecipeIds, recipeId]
  const updatedPickedCategoryIds = { ...state.pickedRecipeIdsByCategory }
  updatedPickedCategoryIds[category] = updatedIds

  return { ...state, pickedRecipeIdsByCategory: updatedPickedCategoryIds }
}
