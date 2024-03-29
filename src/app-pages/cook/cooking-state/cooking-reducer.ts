import { MAX_ALLOWED_PANELS_COUNT } from '../../../constants/layout'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { CookingRecipeData } from '../../../types/types'
import { DisplayConfig, CookingState } from './cooking-state'

export type DisplayDirection = 'previous' | 'next'
export enum DispatchCookingEvent {
  UPDATE_DISPLAY_CONFIG = 'UPDATE_DISPLAY_CONFIG',
  UPDATE_DISPLAY_RECIPES_COUNT = 'UPDATE_DISPLAY_RECIPES_COUNT',
  UPDATE_DISPLAY_RECIPES_INDEXES = 'UPDATE_DISPLAY_RECIPES_INDEXES',
  TOGGLE_IS_COOKING_RECIPE = 'TOGGLE_IS_COOKING_RECIPE',
  TOGGLE_ADD_INGREDIENT = 'TOGGLE_ADD_INGREDIENT',
  TOGGLE_INSTRUCTION_DONE = 'TOGGLE_INSTRUCTION_DONE'
}

export type DispatchCookingEventAction =
  | {
      type: DispatchCookingEvent.UPDATE_DISPLAY_CONFIG
      payload: DisplayConfig
    }
  | {
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_COUNT
      payload: { newValue?: number; maxPanelsCount: number; pickedRecipesCount: number }
    }
  | {
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_INDEXES
      payload: { moveDirection: 'previous' | 'next'; pickedRecipesCount: number }
    }
  | { type: DispatchCookingEvent.TOGGLE_IS_COOKING_RECIPE; payload: { recipe: Recipe } }
  | { type: DispatchCookingEvent.TOGGLE_ADD_INGREDIENT; payload: { ingredientId: number } }
  | { type: DispatchCookingEvent.TOGGLE_INSTRUCTION_DONE; payload: { instructionId: number } }

export const cookingReducer = (state: CookingState, action: DispatchCookingEventAction) => {
  switch (action.type) {
    case DispatchCookingEvent.UPDATE_DISPLAY_CONFIG:
      return { ...state, displayConfig: action.payload }
    case DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_COUNT:
      return {
        ...state,
        displayConfig: getUpdatedDisplayConfigAfterCountChanged(state.displayConfig, action.payload)
      }
    case DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_INDEXES:
      return {
        ...state,
        displayConfig: getUpdatedDisplayConfigAfterIndexesChanged(state.displayConfig, action.payload)
      }
    case DispatchCookingEvent.TOGGLE_IS_COOKING_RECIPE:
      return toggleIsCookingRecipes(state, action.payload)
    case DispatchCookingEvent.TOGGLE_ADD_INGREDIENT:
      return { ...state, ingredientsAdded: getUpdatedIdList(state.ingredientsAdded, action.payload.ingredientId) }
    case DispatchCookingEvent.TOGGLE_INSTRUCTION_DONE:
      return { ...state, instructionsDone: getUpdatedIdList(state.instructionsDone, action.payload.instructionId) }
    default:
      throw new Error(`${JSON.stringify(action)} is not a cooking state reducer action!`)
  }
}

const getUpdatedIdList = (list: number[], targetId: number) => {
  let updatedList = [...list]
  const shouldAdd = updatedList.every((id) => id !== targetId)
  if (shouldAdd) updatedList.push(targetId)
  else updatedList = updatedList.filter((id) => id !== targetId)
  return updatedList
}

const toggleIsCookingRecipes = (state: CookingState, payload: { recipe: Recipe }) => {
  let updatedCookingRecipes: CookingRecipeData[]
  const isStartCooking = state.cookingRecipes.every(
    (recipeCookingData) => recipeCookingData.recipe.id !== payload.recipe.id
  )

  if (isStartCooking) {
    updatedCookingRecipes = [
      ...state.cookingRecipes,
      { recipe: payload.recipe, ingredientsAddedIds: [], instructionsCompletedIds: [] }
    ]
  } else {
    updatedCookingRecipes = state.cookingRecipes.filter(
      (recipeCookingData) => recipeCookingData.recipe.id !== payload.recipe.id
    )
  }

  return {
    ...state,
    cookingRecipes: updatedCookingRecipes
  }
}

const getUpdatedDisplayConfigAfterCountChanged = (
  currentDisplayConfig: DisplayConfig,
  payload: { newValue?: number; maxPanelsCount: number; pickedRecipesCount: number }
) => {
  const { count, indexes } = currentDisplayConfig
  const { newValue, maxPanelsCount, pickedRecipesCount } = payload

  if (pickedRecipesCount === 0) return { count: 0, indexes: {} }

  const candidates = [pickedRecipesCount, maxPanelsCount, MAX_ALLOWED_PANELS_COUNT]
  if (newValue === undefined) candidates.push(count === 0 ? 1 : count)
  else candidates.push(newValue)

  const newDisplayCount = Math.min(...candidates)
  let leftIndex = indexes.leftRecipeIndex ?? 0
  const shouldMoveLeftIndexToLeft = leftIndex > pickedRecipesCount - newDisplayCount
  if (shouldMoveLeftIndexToLeft) leftIndex = pickedRecipesCount - newDisplayCount

  const middleRecipeIndex = newDisplayCount > 1 ? leftIndex + 1 : undefined
  const rightRecipeIndex = newDisplayCount > 2 ? leftIndex + 2 : undefined
  const newIndexes = { leftRecipeIndex: leftIndex, middleRecipeIndex, rightRecipeIndex }

  return { indexes: newIndexes, count: newDisplayCount }
}

const getUpdatedDisplayConfigAfterIndexesChanged = (
  currentDisplayConfig: DisplayConfig,
  payload: { moveDirection: DisplayDirection; pickedRecipesCount: number }
) => {
  const { moveDirection, pickedRecipesCount } = payload
  const { indexes, count } = currentDisplayConfig
  const { leftRecipeIndex } = indexes
  let leftIndex = leftRecipeIndex ?? 0
  const canMoveLeft = leftIndex > 0
  if (moveDirection === 'previous' && !canMoveLeft) return { count, indexes }

  const canMoveRight = pickedRecipesCount - count > leftIndex
  if (moveDirection === 'next' && !canMoveRight) return { count, indexes }

  leftIndex = moveDirection === 'previous' ? leftIndex - 1 : leftIndex + 1
  const middleRecipeIndex = count > 1 ? leftIndex + 1 : undefined
  const rightRecipeIndex = count > 2 ? leftIndex + 2 : undefined
  const newIndexes = { leftRecipeIndex: leftIndex, middleRecipeIndex, rightRecipeIndex }

  return { count, indexes: newIndexes }
}
