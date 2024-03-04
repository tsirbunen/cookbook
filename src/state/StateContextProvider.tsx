'use client'

import React, { createContext, useReducer } from 'react'
import { DispatchAction, reducer } from './reducer'
import { RecipesFilterValues, getEmptyFilterValues } from '../app-pages/recipes/page/FilteringProvider'
import { RecipeCategory } from '../types/types'

export type AppStateContextType = {
  state: AppState
  dispatch: React.Dispatch<DispatchAction>
}

export type AppState = {
  recipes: RecipeCategory[]
  filters: RecipesFilterValues
  pickedRecipeIdsByCategory: Record<string, number[]>
}

const initialAppState = {
  recipes: [],
  filters: getEmptyFilterValues(),
  pickedRecipeIdsByCategory: {}
}

export const AppStateContext = createContext({})

/**
 * This provider holds the app state that has the most important data that is needed
 * all around the app (like filtered recipes, picked recipe ids, etc.).
 */
export const AppStateContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialAppState)

  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
}
