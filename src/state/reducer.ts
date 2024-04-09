import { RecipesFilterValues } from '../app-pages/search/page/FilteringProvider'
import { Recipe } from '../types/graphql-schema-types.generated'
import { RecipeCategory } from '../types/types'
import { AppState } from './StateContextProvider'

export enum Dispatch {
  SET_RECIPES_AND_FILTERS = 'SET_RECIPES_AND_FILTERS',
  UPDATE_PICKED_RECIPES = 'UPDATE_PICKED_RECIPES',
  CHANGE_RECIPES_ORDER = 'CHANGE_RECIPES_ORDER',
  TOGGLE_SOUNDS_ENABLED = 'TOGGLE_SOUNDS_ENABLED'
}

export type DispatchAction =
  | { type: Dispatch.SET_RECIPES_AND_FILTERS; payload: { recipes: RecipeCategory[]; filters: RecipesFilterValues } }
  | { type: Dispatch.UPDATE_PICKED_RECIPES; payload: { recipeId: number; category: string } }
  | { type: Dispatch.CHANGE_RECIPES_ORDER; payload: { newOrderOfIds: number[] } }
  | { type: Dispatch.TOGGLE_SOUNDS_ENABLED; payload: { enabled: boolean } }

export const reducer = (state: AppState, action: DispatchAction) => {
  switch (action.type) {
    case Dispatch.SET_RECIPES_AND_FILTERS:
      return { ...state, recipes: action.payload.recipes, filters: action.payload.filters }
    case Dispatch.UPDATE_PICKED_RECIPES:
      return updatePickedRecipes(state, action.payload)
    case Dispatch.CHANGE_RECIPES_ORDER:
      return updatePickedRecipesOrder(state, action.payload)
    case Dispatch.TOGGLE_SOUNDS_ENABLED:
      return {
        ...state,
        settings: {
          ...state.settings,
          soundsEnabled: action.payload.enabled
        }
      }
    default:
      throw new Error(`${JSON.stringify(action)} is not an app state reducer action!`)
  }
}

const updatePickedRecipes = (state: AppState, payload: { recipeId: number; category: string }) => {
  const { recipeId, category } = payload
  const pickedCategoryRecipeIds = state.pickedRecipeIdsByCategory[category] ?? []
  const shouldRemove = pickedCategoryRecipeIds.includes(recipeId)

  const updatedIds = shouldRemove
    ? pickedCategoryRecipeIds.filter((id) => id !== recipeId)
    : [...pickedCategoryRecipeIds, recipeId]

  const updatedPickedCategoryIds = { ...state.pickedRecipeIdsByCategory }
  updatedPickedCategoryIds[category] = updatedIds

  const recipe = state.recipes
    .filter((recipeCategory) => recipeCategory.category === category)[0]
    .recipes.find((recipe) => recipe.id === recipeId)
  const updatedPickedRecipes = (
    shouldRemove ? state.pickedRecipes.filter((r) => r.id !== recipeId) : [...state.pickedRecipes, recipe]
  ) as Recipe[]

  return { ...state, pickedRecipeIdsByCategory: updatedPickedCategoryIds, pickedRecipes: updatedPickedRecipes }
}

// FIXME: CHANGE STATE SO THAT FINDING RECIPES IS EASIER!!!
const updatePickedRecipesOrder = (state: AppState, payload: { newOrderOfIds: number[] }) => {
  const allRecipes = state.recipes.flatMap((recipeCategory) => recipeCategory.recipes)

  const recipesInOrder = []
  for (const id of payload.newOrderOfIds) {
    const recipe = allRecipes.find((r) => r.id === id)
    if (recipe) {
      recipesInOrder.push(recipe)
    }
  }

  return { ...state, pickedRecipes: recipesInOrder }
}
