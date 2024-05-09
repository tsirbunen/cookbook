'use client'

import React, { createContext, useReducer } from 'react'
import { DispatchAction, reducer } from './reducer'
import { RecipesFilterValues } from '../app-pages/search/page/FilteringProvider'
import { Settings } from '../types/types'
import { Recipe } from '../types/graphql-schema-types.generated'

export type AppStateContextType = {
  state: AppState
  dispatch: React.Dispatch<DispatchAction>
}

export type AppState = {
  recipesById: Record<string, Recipe>
  recipes: Recipe[]
  filters: RecipesFilterValues
  pickedRecipeIds: number[]
  pickedRecipes: Recipe[]
  settings: Settings
}

export const initialAppState = {
  recipesById: {},
  recipes: [],
  filters: {
    categories: [],
    languages: [],
    ingredients: { searchTerm: '', searchMode: undefined }
  },
  pickedRecipeIds: [],
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
