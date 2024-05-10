'use client'

import { createContext, useContext, useEffect } from 'react'
import { useApi } from './useApi'
import { AppStateContext, AppStateContextType } from '../state/StateContextProvider'
import { Dispatch } from '../state/reducer'
import { RecipesFilterValues, getEmptyFilterValues } from '../app-pages/search/page/FilteringProvider'
import { getFilteredRecipes } from './utils'
import { Language } from '../types/graphql-schema-types.generated'

export type ApiService = {
  filterRecipes: (filters: RecipesFilterValues) => Promise<void>
  allLanguages?: Language[]
}

export const ApiServiceContext = createContext<ApiService>({} as ApiService)

/**
 * This provider is responsible for performing all communication with the api through
 * the useApi hook. When the app loads, this provider orchestrates fetching recipes
 * from the api (using the hook) and stores the recipes to state. Later, if, for example,
 * some filters are applied or a new recipe is created or an old recipe is updated,
 * this provider orchestrates the necessary actions.
 * Note: This provider does not store data. App state provider is for that purpose.
 */
const ApiServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const { allRecipes, allLanguages } = useApi()

  useEffect(() => {
    if (allRecipes !== undefined) {
      dispatch({
        type: Dispatch.SET_RECIPES_AND_FILTERS,
        payload: { recipes: getFilteredRecipes(allRecipes), filters: getEmptyFilterValues() }
      })
    }
  }, [allRecipes])

  const filterRecipes = async (filters: RecipesFilterValues) => {
    if (!allRecipes?.length) return

    const filteredRecipes = getFilteredRecipes(allRecipes, filters)
    dispatch({ type: Dispatch.SET_RECIPES_AND_FILTERS, payload: { recipes: filteredRecipes, filters } })
  }

  return <ApiServiceContext.Provider value={{ filterRecipes, allLanguages }}>{children}</ApiServiceContext.Provider>
}

export default ApiServiceProvider
