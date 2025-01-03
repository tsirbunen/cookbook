'use client'

import { type Dispatch, createContext, useContext, useEffect, useReducer } from 'react'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import type { Recipe } from '../../../types/graphql-schema-types.generated'
import type { ScalingData, TimerData } from '../../../types/types'
import { DispatchCookingEvent, type DispatchCookingEventAction, cookingReducer } from '../cooking-state/cooking-reducer'
import { type CookingState, type DisplayConfig, getInitialCookingState } from '../cooking-state/cooking-state'

type Cooking = {
  pickedRecipes: Recipe[]
  pickedRecipesCount: number
  displayConfig: DisplayConfig
  dispatchCookingEvent: Dispatch<DispatchCookingEventAction>
  cookingRecipes: Recipe[]
  timersByRecipeId: Record<number, TimerData>
  toggleIsCookingRecipe: (recipeId: number) => void
  toggleIngredient: (recipeId: number, ingredientId: number) => void
  ingredientsAdded: number[]
  instructionsDone: number[]
  multiColumnRecipes: number[]
  toggleInstruction: (recipeId: number, instructionId: number) => void
  toggleMultiColumn: (recipeId: number) => void
  scalingByRecipeId: Record<number, ScalingData>
  scaleRecipe: (recipeId: number, scalingData: ScalingData) => void
  toggleIsScaling: (recipeId: number) => void
  isScalingRecipeIds: number[]
  onlyMetricRecipeIds: number[]
  toggleOnlyMetric: (recipeId: number) => void
  clearAllRecipeSettings: (recipeId: number) => void
}

export type CookingContextType = {
  cookingState: CookingState
  dispatchCookingEvent: React.Dispatch<DispatchCookingEventAction>
}

export const CookingContext = createContext<Cooking>({} as Cooking)

const CookingProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useContext(AppStateContext) as AppStateContextType
  const { maxPanelsCount } = useContext(ViewSizeContext)
  const { pickedRecipes } = state
  const [cookingState, dispatchCookingEvent] = useReducer(
    cookingReducer,
    getInitialCookingState(pickedRecipes.length, maxPanelsCount)
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only run if pickedRecipes change
  useEffect(() => {
    dispatchCookingEvent({
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_COUNT,
      payload: { maxPanelsCount, pickedRecipesCount: pickedRecipes.length }
    })
  }, [pickedRecipes])

  const toggleIsCookingRecipe = (recipeId: number) => {
    const recipe = pickedRecipes.find((pickedRecipe) => pickedRecipe.id === recipeId)
    if (!recipe) return
    dispatchCookingEvent({ type: DispatchCookingEvent.TOGGLE_IS_COOKING_RECIPE, payload: { recipe } })
  }

  const toggleIngredient = (recipeId: number, ingredientId: number) => {
    dispatchCookingEvent({ type: DispatchCookingEvent.TOGGLE_ADD_INGREDIENT, payload: { recipeId, ingredientId } })
  }

  const toggleInstruction = (recipeId: number, instructionId: number) => {
    dispatchCookingEvent({ type: DispatchCookingEvent.TOGGLE_INSTRUCTION_DONE, payload: { recipeId, instructionId } })
  }

  const toggleMultiColumn = (recipeId: number) => {
    dispatchCookingEvent({ type: DispatchCookingEvent.TOGGLE_MULTI_COLUMN, payload: { recipeId } })
  }

  const scaleRecipe = (recipeId: number, scalingData: ScalingData) => {
    dispatchCookingEvent({ type: DispatchCookingEvent.SCALE_RECIPE, payload: { recipeId, scalingData } })
  }

  const toggleIsScaling = (recipeId: number) => {
    dispatchCookingEvent({ type: DispatchCookingEvent.TOGGLE_IS_SCALING, payload: { recipeId } })
  }

  const toggleOnlyMetric = (recipeId: number) => {
    dispatchCookingEvent({ type: DispatchCookingEvent.TOGGLE_ONLY_METRIC, payload: { recipeId } })
  }

  const clearAllRecipeSettings = (recipeId: number) => {
    const recipe = pickedRecipes.find((pickedRecipe) => pickedRecipe.id === recipeId)
    if (!recipe) return
    dispatchCookingEvent({ type: DispatchCookingEvent.CLEAR_ALL_RECIPE_SETTINGS, payload: { recipe } })
  }

  return (
    <CookingContext.Provider
      value={{
        pickedRecipes,
        pickedRecipesCount: pickedRecipes.length,
        displayConfig: cookingState.displayConfig,
        cookingRecipes: cookingState.cookingRecipes,
        timersByRecipeId: cookingState.timersByRecipeId,
        ingredientsAdded: cookingState.ingredientsAdded,
        instructionsDone: cookingState.instructionsDone,
        multiColumnRecipes: cookingState.multiColumnRecipes,
        scalingByRecipeId: cookingState.scalingByRecipeId,
        isScalingRecipeIds: cookingState.isScalingRecipeIds,
        onlyMetricRecipeIds: cookingState.onlyMetricRecipeIds,
        dispatchCookingEvent,
        toggleIsCookingRecipe,
        toggleIngredient,
        toggleInstruction,
        toggleMultiColumn,
        scaleRecipe,
        toggleIsScaling,
        toggleOnlyMetric,
        clearAllRecipeSettings
      }}
    >
      {children}
    </CookingContext.Provider>
  )
}

export default CookingProvider
