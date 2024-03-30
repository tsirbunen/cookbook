'use client'

import { Dispatch, createContext, useContext, useEffect, useReducer } from 'react'
import { AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import { DispatchCookingEvent, DispatchCookingEventAction, cookingReducer } from '../cooking-state/cooking-reducer'
import { CookingRecipeData, TimerData } from '../../../types/types'
import { CookingState, DisplayConfig, getInitialCookingState } from '../cooking-state/cooking-state'

type Cooking = {
  pickedRecipes: Recipe[]
  pickedRecipesCount: number
  displayConfig: DisplayConfig
  dispatchCookingEvent: Dispatch<DispatchCookingEventAction>
  cookingRecipes: CookingRecipeData[]
  timersByRecipeId: Record<number, TimerData>
  toggleIsCookingRecipe: (recipe: Recipe) => void
  toggleIngredientAdded: (ingredientId: number) => void
  ingredientsAdded: number[]
  instructionsDone: number[]
  multiColumnRecipes: number[]
  toggleInstructionDone: (instructionId: number) => void
  toggleMultiColumn: (recipeId: number) => void
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

  useEffect(() => {
    dispatchCookingEvent({
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_COUNT,
      payload: { maxPanelsCount, pickedRecipesCount: pickedRecipes.length }
    })
  }, [pickedRecipes])

  const toggleIsCookingRecipe = (recipe: Recipe) => {
    dispatchCookingEvent({ type: DispatchCookingEvent.TOGGLE_IS_COOKING_RECIPE, payload: { recipe } })
  }

  const toggleIngredientAdded = (ingredientId: number) => {
    dispatchCookingEvent({ type: DispatchCookingEvent.TOGGLE_ADD_INGREDIENT, payload: { ingredientId } })
  }

  const toggleInstructionDone = (instructionId: number) => {
    dispatchCookingEvent({ type: DispatchCookingEvent.TOGGLE_INSTRUCTION_DONE, payload: { instructionId } })
  }

  const toggleMultiColumn = (recipeId: number) => {
    dispatchCookingEvent({ type: DispatchCookingEvent.TOGGLE_MULTI_COLUMN, payload: { recipeId } })
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
        dispatchCookingEvent,
        toggleIsCookingRecipe,
        toggleIngredientAdded,
        toggleInstructionDone,
        toggleMultiColumn
      }}
    >
      {children}
    </CookingContext.Provider>
  )
}

export default CookingProvider
