'use client'

import { createContext, useContext, useEffect } from 'react'
import { Recipe } from '../types/graphql-schema-types.generated'
import { RecipeFilters, useRecipeApi } from './useRecipeApi'
import { AppStateContext, AppStateContextType } from '../state/StateContextProvider'
import { Dispatch } from '../state/reducer'

export type RecipeCategory = {
  category: string
  recipes: Recipe[]
}

export type RecipeService = {
  filterRecipes: (filters: RecipeFilters) => Promise<void>
}

export const RecipeServiceContext = createContext<RecipeService>({} as RecipeService)

/**
 * This provider is responsible for performing all communication with the api through
 * the useRecipeApi hook. When the app loads, this provider orchestrates fetching recipes
 * from the api (using the hook) and stores the recipes to state. Later, if, for example,
 * some filters are applied or a new recipe is created or an old recipe is updated,
 * this provider orchestrates the necessary actions.
 * Note: This provider does not store data.App state provider is for that purpose.
 */
const RecipeServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useContext(AppStateContext) as AppStateContextType

  const { getFilteredCategorizedRecipes } = useRecipeApi()

  useEffect(() => {
    if (window !== undefined) {
      const getRecipes = async () => {
        const filteredRecipes = await getFilteredCategorizedRecipes()
        dispatch({ type: Dispatch.SET_RECIPES_AND_FILTERS, payload: { recipes: filteredRecipes, filters: {} } })
      }

      getRecipes()
    }
  }, [])

  const filterRecipes = async (filters: RecipeFilters) => {
    const filteredRecipes = await getFilteredCategorizedRecipes(filters)
    dispatch({ type: Dispatch.SET_RECIPES_AND_FILTERS, payload: { recipes: filteredRecipes, filters } })
  }

  return (
    <RecipeServiceContext.Provider
      value={{
        filterRecipes
      }}
    >
      {children}
    </RecipeServiceContext.Provider>
  )
}

export default RecipeServiceProvider
