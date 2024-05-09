import { MAX_ALLOWED_PANELS_COUNT } from '../../../constants/layout'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { ScalingData } from '../../../types/types'
import { DisplayConfig, CookingState } from './cooking-state'
import { produce } from 'immer'

export type DisplayDirection = 'previous' | 'next'
export enum DispatchCookingEvent {
  UPDATE_DISPLAY_RECIPES_COUNT = 'UPDATE_DISPLAY_RECIPES_COUNT',
  UPDATE_DISPLAY_RECIPES_INDEXES = 'UPDATE_DISPLAY_RECIPES_INDEXES',
  TOGGLE_IS_COOKING_RECIPE = 'TOGGLE_IS_COOKING_RECIPE',
  TOGGLE_ADD_INGREDIENT = 'TOGGLE_ADD_INGREDIENT',
  TOGGLE_INSTRUCTION_DONE = 'TOGGLE_INSTRUCTION_DONE',
  TOGGLE_MULTI_COLUMN = 'TOGGLE_MULTI_COLUMN',
  SCALE_RECIPE = 'SCALE_RECIPE',
  TOGGLE_ONLY_METRIC = 'TOGGLE_ONLY_METRIC',
  TOGGLE_IS_SCALING = 'TOGGLE_IS_SCALING'
}

export type DispatchCookingEventAction =
  | {
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_COUNT
      payload: { newValue?: number; maxPanelsCount: number; pickedRecipesCount: number }
    }
  | {
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_INDEXES
      payload: { moveDirection: 'previous' | 'next'; pickedRecipesCount: number }
    }
  | { type: DispatchCookingEvent.TOGGLE_IS_COOKING_RECIPE; payload: { recipe: Recipe } }
  | { type: DispatchCookingEvent.TOGGLE_ADD_INGREDIENT; payload: { recipeId: number; ingredientId: number } }
  | { type: DispatchCookingEvent.TOGGLE_INSTRUCTION_DONE; payload: { recipeId: number; instructionId: number } }
  | { type: DispatchCookingEvent.TOGGLE_MULTI_COLUMN; payload: { recipeId: number } }
  | {
      type: DispatchCookingEvent.SCALE_RECIPE
      payload: { recipeId: number; scalingData: ScalingData }
    }
  | { type: DispatchCookingEvent.TOGGLE_ONLY_METRIC; payload: { recipeId: number } }
  | { type: DispatchCookingEvent.TOGGLE_IS_SCALING; payload: { recipeId: number } }

export const cookingReducer = produce((draft: CookingState, action: DispatchCookingEventAction) => {
  switch (action.type) {
    case DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_COUNT:
      draft.displayConfig = getUpdatedDisplayConfigAfterCountChanged(draft.displayConfig, action.payload)
      break
    case DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_INDEXES:
      draft.displayConfig = getUpdatedDisplayConfigAfterIndexesChanged(draft.displayConfig, action.payload)
      break
    case DispatchCookingEvent.TOGGLE_IS_COOKING_RECIPE:
      toggleIsCookingRecipes(draft, action.payload)
      break
    case DispatchCookingEvent.TOGGLE_ADD_INGREDIENT:
      draft.ingredientsAdded = getUpdatedIdList(draft.ingredientsAdded, action.payload.ingredientId)
      break
    case DispatchCookingEvent.TOGGLE_INSTRUCTION_DONE:
      draft.instructionsDone = getUpdatedIdList(draft.instructionsDone, action.payload.instructionId)
      break
    case DispatchCookingEvent.TOGGLE_MULTI_COLUMN:
      draft.multiColumnRecipes = getUpdatedIdList(draft.multiColumnRecipes, action.payload.recipeId)
      break
    case DispatchCookingEvent.SCALE_RECIPE:
      updateScaling(draft, action.payload)
      break
    case DispatchCookingEvent.TOGGLE_ONLY_METRIC:
      draft.onlyMetricRecipeIds = getUpdatedIdList(draft.onlyMetricRecipeIds, action.payload.recipeId)
      break
    case DispatchCookingEvent.TOGGLE_IS_SCALING:
      draft.isScalingRecipeIds = getUpdatedIdList(draft.isScalingRecipeIds, action.payload.recipeId)
      break
    default:
      throw new Error(`${JSON.stringify(action)} is not a cooking state reducer action!`)
  }
})

const updateScaling = (draft: CookingState, payload: { scalingData: ScalingData; recipeId: number }) => {
  const { scalingData, recipeId } = payload
  draft.scalingByRecipeId[recipeId] = scalingData
}

const getUpdatedIdList = (list: number[], targetId: number) => {
  let updatedList = [...list]
  const shouldAdd = updatedList.every((id) => id !== targetId)
  if (shouldAdd) updatedList.push(targetId)
  else updatedList = updatedList.filter((id) => id !== targetId)
  return updatedList
}

const toggleIsCookingRecipes = (draft: CookingState, payload: { recipe: Recipe }) => {
  const isStartCooking = draft.cookingRecipes.every(
    (recipeCookingData) => recipeCookingData.recipe.id !== payload.recipe.id
  )

  if (isStartCooking) {
    draft.cookingRecipes.push({ recipe: payload.recipe, ingredientsAddedIds: [], instructionsCompletedIds: [] })
  } else {
    draft.cookingRecipes = draft.cookingRecipes.filter(
      (recipeCookingData) => recipeCookingData.recipe.id !== payload.recipe.id
    )
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
