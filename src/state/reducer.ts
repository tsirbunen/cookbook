import { RecipesFilterValues } from '../app-pages/search/page/FilteringProvider'
import { RecipeCategory } from '../types/types'
import { AppState } from './StateContextProvider'
import { produce } from 'immer'

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

const setRecipesAndFilters = (
  draft: AppState,
  payload: { recipes: RecipeCategory[]; filters: RecipesFilterValues }
) => {
  draft.recipes = payload.recipes
  draft.filters = payload.filters
}

const toggleSoundsAreEnabled = (draft: AppState, payload: { enabled: boolean }) => {
  draft.settings.soundsEnabled = payload.enabled
}

export const updatePickedRecipes = (draft: AppState, payload: { recipeId: number; category: string }) => {
  const { recipeId, category } = payload
  const recipe = draft.recipes
    .filter((recipeCategory) => recipeCategory.category === category)[0]
    .recipes.find((recipe) => recipe.id === recipeId)

  if (!recipe) return

  const shouldRemove = (draft.pickedRecipeIdsByCategory[category] ?? []).includes(recipeId)
  if (shouldRemove) {
    draft.pickedRecipeIdsByCategory[category] = draft.pickedRecipeIdsByCategory[category].filter(
      (id) => id !== recipeId
    )
    draft.pickedRecipes = draft.pickedRecipes.filter((r) => r.id !== recipeId)
  } else {
    draft.pickedRecipeIdsByCategory[category] ??= []
    draft.pickedRecipeIdsByCategory[category].push(recipeId)
    draft.pickedRecipes.push(recipe)
  }
}

// FIXME: CHANGE STATE SO THAT FINDING RECIPES IS EASIER!!!
const updatePickedRecipesOrder = (draft: AppState, payload: { newOrderOfIds: number[] }) => {
  const allRecipes = draft.recipes.flatMap((recipeCategory) => recipeCategory.recipes)

  const recipesInOrder = []
  for (const id of payload.newOrderOfIds) {
    const recipe = allRecipes.find((r) => r.id === id)
    if (recipe) {
      recipesInOrder.push(recipe)
    }
  }
  draft.pickedRecipes = recipesInOrder
}
