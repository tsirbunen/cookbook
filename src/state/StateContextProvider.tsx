'use client'

import React, { createContext, useReducer } from 'react'
import { DispatchAction, reducer } from './reducer'
import { RecipesFilterValues, getEmptyFilterValues } from '../app-pages/search/page/FilteringProvider'
import { RecipeCategory, Settings } from '../types/types'
import { Recipe } from '../types/graphql-schema-types.generated'

export type AppStateContextType = {
  state: AppState
  dispatch: React.Dispatch<DispatchAction>
}

export type AppState = {
  recipes: RecipeCategory[]
  filters: RecipesFilterValues
  pickedRecipeIdsByCategory: Record<string, number[]>
  pickedRecipes: Recipe[]
  settings: Settings
}

const initialAppState = {
  recipes: [],
  filters: getEmptyFilterValues(),
  pickedRecipeIdsByCategory: {},
  pickedRecipes: [],
  settings: {
    soundsEnabled: null
  }
}

export const AppStateContext = createContext({})

/**
 * This provider holds the app state that has the most important data that is needed
 * all around the app (like filtered recipes, picked recipe ids, etc.).
 */
export const AppStateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialAppState)

  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
}
