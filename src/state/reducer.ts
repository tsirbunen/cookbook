import { RecipesFilterValues } from '../app-pages/search/page/FilteringProvider'
import { Recipe } from '../types/graphql-schema-types.generated'
import { AppState } from './StateContextProvider'
import { produce } from 'immer'

export enum Dispatch {
  SET_RECIPES_AND_FILTERS = 'SET_RECIPES_AND_FILTERS',
  UPDATE_PICKED_RECIPES = 'UPDATE_PICKED_RECIPES',
  CHANGE_RECIPES_ORDER = 'CHANGE_RECIPES_ORDER',
  TOGGLE_SOUNDS_ENABLED = 'TOGGLE_SOUNDS_ENABLED'
}

export type DispatchAction =
  | { type: Dispatch.SET_RECIPES_AND_FILTERS; payload: { recipes: Recipe[]; filters: RecipesFilterValues } }
  | { type: Dispatch.UPDATE_PICKED_RECIPES; payload: { recipeId: number } }
  | { type: Dispatch.CHANGE_RECIPES_ORDER; payload: { newOrderOfIds: number[] } }
  | { type: Dispatch.TOGGLE_SOUNDS_ENABLED; payload: { enabled: boolean } }

export const reducer = produce((draft: AppState, { type, payload }: DispatchAction) => {
  switch (type) {
    case Dispatch.SET_RECIPES_AND_FILTERS:
      setRecipesAndFilters(draft, payload)
      break
    case Dispatch.UPDATE_PICKED_RECIPES:
      updatePickedRecipes(draft, payload)
      break
    case Dispatch.CHANGE_RECIPES_ORDER:
      updatePickedRecipesOrder(draft, payload)
      break
    case Dispatch.TOGGLE_SOUNDS_ENABLED:
      toggleSoundsAreEnabled(draft, payload)
      break
    default:
      throw new Error(`${JSON.stringify(type)} is not an app state reducer action type!`)
  }
})

const setRecipesAndFilters = (draft: AppState, payload: { recipes: Recipe[]; filters: RecipesFilterValues }) => {
  draft.recipes = payload.recipes
  draft.filters = payload.filters
}

const toggleSoundsAreEnabled = (draft: AppState, payload: { enabled: boolean }) => {
  draft.settings.soundsEnabled = payload.enabled
}

export const updatePickedRecipes = (draft: AppState, payload: { recipeId: number }) => {
  const { recipeId } = payload
  const recipe = draft.recipes.find((recipe) => recipe.id === recipeId)

  if (!recipe) return

  const shouldRemove = draft.pickedRecipeIds.includes(recipeId)
  if (shouldRemove) {
    draft.pickedRecipeIds = draft.pickedRecipeIds.filter((id) => id !== recipeId)
    draft.pickedRecipes = draft.pickedRecipes.filter((r) => r.id !== recipeId)
  } else {
    draft.pickedRecipeIds.push(recipeId)
    draft.pickedRecipes.push(recipe)
  }
}

// FIXME: CHANGE STATE SO THAT FINDING RECIPES IS EASIER!!!
const updatePickedRecipesOrder = (draft: AppState, payload: { newOrderOfIds: number[] }) => {
  const allRecipes = draft.recipes

  const recipesInOrder = []
  for (const id of payload.newOrderOfIds) {
    const recipe = allRecipes.find((r) => r.id === id)
    if (recipe) {
      recipesInOrder.push(recipe)
    }
  }

  draft.pickedRecipes = recipesInOrder
}
