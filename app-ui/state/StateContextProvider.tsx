'use client'

import type React from 'react'
import { createContext, useReducer } from 'react'
import type { RecipesFilterValues } from '../app-pages/search/search-management/FilteringProvider'
import type { Language, Recipe, Tag, ValidationTarget } from '../types/graphql-schema-types.generated'
import type { AccountInfo, JSONSchemaType, Settings } from '../types/types'
import { type DispatchAction, reducer } from './reducer'

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
  validationSchemas: Record<ValidationTarget, JSONSchemaType> | null
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
