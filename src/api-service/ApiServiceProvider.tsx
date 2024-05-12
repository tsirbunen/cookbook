'use client'

import { createContext, useContext, useEffect } from 'react'
import { useApi } from './useApi'
import { AppStateContext, AppStateContextType } from '../state/StateContextProvider'
import { Dispatch } from '../state/reducer'
import { RecipesFilterValues, getEmptyFilterValues } from '../app-pages/search/page/FilteringProvider'
import { getFilteredRecipes } from './utils'

export type ApiService = {
  filterRecipes: (filters: RecipesFilterValues) => Promise<void>
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
  const { allRecipesData, allLanguagesData, allTagsData } = useApi()

  useEffect(() => {
    if (allRecipesData.data?.allRecipes !== undefined) {
      dispatch({
        type: Dispatch.SET_RECIPES_AND_FILTERS,
        payload: { recipes: getFilteredRecipes(allRecipesData.data.allRecipes), filters: getEmptyFilterValues() }
      })
    }
  }, [allRecipesData.data])

  useEffect(() => {
    if (allLanguagesData.data?.allLanguages !== undefined) {
      dispatch({
        type: Dispatch.SET_LANGUAGES,
        payload: { languages: allLanguagesData.data.allLanguages }
      })
    }
  }, [allLanguagesData.data])

  useEffect(() => {
    if (allTagsData.data?.allTags !== undefined) {
      dispatch({
        type: Dispatch.SET_TAGS,
        payload: { tags: allTagsData.data.allTags }
      })
    }
  }, [allTagsData.data])

  const filterRecipes = async (filters: RecipesFilterValues) => {
    if (!allRecipesData.data?.allRecipes.length) return

    const filteredRecipes = getFilteredRecipes(allRecipesData.data.allRecipes, filters)
    dispatch({ type: Dispatch.SET_RECIPES_AND_FILTERS, payload: { recipes: filteredRecipes, filters } })
  }

  return <ApiServiceContext.Provider value={{ filterRecipes }}>{children}</ApiServiceContext.Provider>
}

export default ApiServiceProvider
