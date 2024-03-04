'use client'

import { createContext, useContext, useEffect } from 'react'
import { useRecipeApi } from './useRecipeApi'
import { AppStateContext, AppStateContextType } from '../state/StateContextProvider'
import { Dispatch } from '../state/reducer'
import { RecipesFilterValues, getEmptyFilterValues } from '../app-pages/recipes/page/FilteringProvider'
import { getFilteredCategorizedRecipes } from './utils'

export type RecipeService = {
  filterRecipes: (filters: RecipesFilterValues) => Promise<void>
}

export const RecipeServiceContext = createContext<RecipeService>({} as RecipeService)

/**
 * This provider is responsible for performing all communication with the api through
 * the useRecipeApi hook. When the app loads, this provider orchestrates fetching recipes
 * from the api (using the hook) and stores the recipes to state. Later, if, for example,
 * some filters are applied or a new recipe is created or an old recipe is updated,
 * this provider orchestrates the necessary actions.
 * Note: This provider does not store data. App state provider is for that purpose.
 */
const RecipeServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const { allRecipes } = useRecipeApi()

  useEffect(() => {
    if (allRecipes !== undefined) {
      const filteredRecipes = getFilteredCategorizedRecipes(allRecipes)
      dispatch({
        type: Dispatch.SET_RECIPES_AND_FILTERS,
        payload: { recipes: filteredRecipes, filters: getEmptyFilterValues() }
      })
    }
  }, [allRecipes])

  const filterRecipes = async (filters: RecipesFilterValues) => {
    if (!allRecipes?.length) return

    const filteredRecipes = getFilteredCategorizedRecipes(allRecipes, filters)
    dispatch({ type: Dispatch.SET_RECIPES_AND_FILTERS, payload: { recipes: filteredRecipes, filters } })
  }

  return <RecipeServiceContext.Provider value={{ filterRecipes }}>{children}</RecipeServiceContext.Provider>
}

export default RecipeServiceProvider
