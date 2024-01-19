'use client'

import { createContext, useEffect, useState } from 'react'
import { Recipe } from '../types/graphql-schema-types.generated'
import { RecipeFilters, useRecipeApi } from './useRecipeApi'

export type RecipeCategory = {
  category: string
  recipes: Recipe[]
}

export type RecipeService = {
  recipes: Recipe[]
  filteredRecipesInCategories: RecipeCategory[]
  filterRecipes: (filters: RecipeFilters) => Promise<void>
  pickedRecipeIds: number[]
  pickedRecipeIdsByCategory: Record<string, number[]>
  updatePickedRecipeIds: (recipeId: number) => void
  updatePickedRecipes: (recipeId: number, category: string) => void
}

export const RecipeServiceContext = createContext<RecipeService>({} as RecipeService)

/**
 * The RecipeServiceProvider provides the recipes for the whole app.
 * It holds the state of recipes, picked recipe ids, etc.
 */
const RecipeServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filteredRecipesInCategories, setFilteredRecipesInCategories] = useState<RecipeCategory[]>([])
  const [pickedRecipeIds, setPickedRecipeIds] = useState<number[]>([])
  const [pickedRecipeIdsByCategory, setPickedRecipeIdsByCategory] = useState<Record<string, number[]>>({})
  const { getAllRecipes, getFilteredCategorizedRecipes } = useRecipeApi()

  useEffect(() => {
    if (window !== undefined) {
      const getRecipes = async () => {
        const allRecipes = await getAllRecipes()
        if (allRecipes) setRecipes(allRecipes)
        const filteredRecipes = await getFilteredCategorizedRecipes({})
        setFilteredRecipesInCategories(filteredRecipes)
      }

      getRecipes()
    }
  }, [])

  const filterRecipes = async (filters: RecipeFilters) => {
    const filteredRecipes = await getFilteredCategorizedRecipes(filters)
    setFilteredRecipesInCategories(filteredRecipes)
  }

  const updatePickedRecipeIds = (recipeId: number) => {
    setPickedRecipeIds((previousIds) => {
      const shouldRemove = previousIds.includes(recipeId)
      const updatedIds = shouldRemove ? previousIds.filter((id) => id !== recipeId) : [...previousIds, recipeId]
      return updatedIds
    })
  }

  const updatePickedRecipes = (recipeId: number, category: string) => {
    setPickedRecipeIdsByCategory((previous) => {
      const pickedCategoryRecipeIds = previous[category] ?? []
      const shouldRemove = pickedCategoryRecipeIds.includes(recipeId)
      const updatedIds = shouldRemove
        ? pickedCategoryRecipeIds.filter((id) => id !== recipeId)
        : [...pickedCategoryRecipeIds, recipeId]
      const updatedPickedCategoryIds = { ...previous }
      updatedPickedCategoryIds[category] = updatedIds
      return updatedPickedCategoryIds
    })
  }

  return (
    <RecipeServiceContext.Provider
      value={{
        recipes,
        filteredRecipesInCategories,
        filterRecipes,
        pickedRecipeIds,
        pickedRecipeIdsByCategory,
        updatePickedRecipeIds,
        updatePickedRecipes
      }}
    >
      {children}
    </RecipeServiceContext.Provider>
  )
}

export default RecipeServiceProvider
