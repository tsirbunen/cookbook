'use client'

import React, { createContext, useReducer } from 'react'
import { DispatchAction, reducer } from './reducer'
import { RecipesFilterValues } from '../app-pages/search/page/FilteringProvider'
import { AccountInfo, JSONSchemaType, Settings } from '../types/types'
import { Language, Recipe, Tag, TargetSchema } from '../types/graphql-schema-types.generated'

export type AppStateContextType = {
  state: AppState
  dispatch: React.Dispatch<DispatchAction>
}

export type AppState = {
  recipes: Recipe[]
  tags: Tag[]
  languages: Language[]
  filters: RecipesFilterValues
  pickedRecipeIds: number[]
  pickedRecipes: Recipe[]
  settings: Settings
  account: AccountInfo | null
  validationSchemas: Record<TargetSchema, JSONSchemaType> | null
}

export const initialAppState = {
  recipes: [],
  tags: [],
  languages: [],
  filters: {
    categories: [],
    languages: [],
    tags: [],
    ingredients: { searchTerm: '', searchMode: undefined }
  },
  pickedRecipeIds: [],
  pickedRecipes: [],
  settings: {
    soundsEnabled: null
  },
  account: null,
  validationSchemas: null
}

export const AppStateContext = createContext({})

/**
 * This provider holds the app state that has the most important data that is needed
 * all around the app (like filtered recipes, picked recipe ids, etc.).
 */
const AppStateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialAppState)

  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
}

export default AppStateContextProvider
