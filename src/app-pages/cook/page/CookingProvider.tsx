'use client'

import { Dispatch, createContext, useContext, useEffect, useReducer } from 'react'
import { AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import { DispatchCookingEvent, DispatchCookingEventAction, cookingReducer } from './cooking-reducer'

type DisplayIndexes = { leftRecipeIndex?: number; middleRecipeIndex?: number; rightRecipeIndex?: number }

type Cooking = {
  pickedRecipes: Recipe[]
  pickedRecipesCount: number

  displayConfig: DisplayConfig
  dispatchCookingEvent: Dispatch<DispatchCookingEventAction>
}

export type CookingState = {
  displayConfig: DisplayConfig
}

export type CookingContextType = {
  cookingState: CookingState
  dispatchCookingEvent: React.Dispatch<DispatchCookingEventAction>
}

export type DisplayConfig = {
  count: number
  indexes: DisplayIndexes
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

  const pickedRecipesCount = pickedRecipes.length
  const displayConfig = cookingState.displayConfig

  return (
    <CookingContext.Provider
      value={{
        pickedRecipes,
        pickedRecipesCount,
        displayConfig,
        dispatchCookingEvent
      }}
    >
      {children}
    </CookingContext.Provider>
  )
}

export default CookingProvider

const getInitialDisplayIndexes = (pickedRecipesCount: number, maxPanelsCount: number) => {
  const leftRecipeIndex = 0
  const middleRecipeIndex = pickedRecipesCount >= 1 && maxPanelsCount > 1 ? 1 : undefined
  const rightRecipeIndex = pickedRecipesCount >= 2 && maxPanelsCount > 2 ? 2 : undefined
  return { leftRecipeIndex, middleRecipeIndex, rightRecipeIndex }
}

const getInitialDisplayCount = (pickedRecipesCount: number, maxPanelsCount: number) => {
  return Math.min(pickedRecipesCount, maxPanelsCount, 3)
}

const getInitialCookingState = (pickedRecipesCount: number, maxPanelsCount: number): CookingState => {
  return {
    displayConfig: {
      count: getInitialDisplayCount(pickedRecipesCount, maxPanelsCount),
      indexes: getInitialDisplayIndexes(pickedRecipesCount, maxPanelsCount)
    }
  }
}
