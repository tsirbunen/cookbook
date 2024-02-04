import { useContext } from 'react'
import { Recipe } from '../types/graphql-schema-types.generated'
import { GraphQLClientContext } from '../graphql-client/graphql-client'
import { AllRecipesDocument, AllRecipesQuery, AllRecipesQueryVariables } from './queries.generated'
import { RecipeCategory } from './RecipeServiceProvider'
import { FilterableProperty } from '../app-pages/recipes-viewing/viewing-management/filtering-management-tool/FilteringProvider'

export const noCategory = 'No category'
export type RecipeFilters = Record<string, string[]>

type UseRecipeApi = {
  getAllRecipes: () => Promise<Recipe[] | undefined>
  getFilteredCategorizedRecipes: (filters?: RecipeFilters) => Promise<RecipeCategory[]>
}

/**
 * The useRecipeApi hook provides its user with functions with which to query the app's
 * api server for recipe data.
 */
export const useRecipeApi = (): UseRecipeApi => {
  const { client } = useContext(GraphQLClientContext)

  const getAllRecipes = async () => {
    try {
      const result = await client.query<AllRecipesQuery, AllRecipesQueryVariables>({
        query: AllRecipesDocument
      })

      const allRecipes = result.data?.allRecipes

      if (!allRecipes) {
        // TODO: Show snackbar, there is error?
        return
      }

      return allRecipes
    } catch (error) {
      console.log({ error })
    }
  }

  const getFilteredCategorizedRecipes = async (filters?: RecipeFilters) => {
    let filteredRecipes: RecipeCategory[] = []

    try {
      // TODO: Change to true filtering
      const result = await client.query<AllRecipesQuery, AllRecipesQueryVariables>({
        query: AllRecipesDocument
      })

      let allRecipes = result.data?.allRecipes
      if (filters?.[FilterableProperty.CATEGORY]) {
        const categoriesToInclude = filters[FilterableProperty.CATEGORY]
        allRecipes = allRecipes.filter((r) => r.category && categoriesToInclude.includes(r.category))
      }

      if (filters?.[FilterableProperty.INGREDIENT]) {
        const wordsToContain = filters[FilterableProperty.INGREDIENT][0].split(' ').map((w) => w.toLowerCase())

        allRecipes = allRecipes.filter((r) => {
          return r.ingredientGroups.some((g) => {
            return g.ingredients.some((i) => {
              return wordsToContain.some((w) => {
                return i.name.toLowerCase().includes(w)
              })
            })
          })
        })
      }

      if (!allRecipes) {
        throw new Error('No recipes')
      }

      filteredRecipes = arrangeRecipesInCategories(allRecipes)
    } catch (error) {
      // TODO: Show snackbar, there is error?
      console.log({ error })
    }

    return filteredRecipes
  }

  return {
    getAllRecipes,
    getFilteredCategorizedRecipes
  }
}

const arrangeRecipesInCategories = (recipes: Recipe[]) => {
  const recipesByCategory: Record<string, Recipe[]> = {}
  const recipesWithoutCategory: Recipe[] = []

  for (const recipe of recipes) {
    const category = recipe.category
    if (!category) {
      recipesWithoutCategory.push(recipe)
    } else {
      if (!recipesByCategory[category]) {
        recipesByCategory[category] = []
      }
      recipesByCategory[category].push(recipe)
    }
  }

  const recipesInCategories = Object.entries(recipesByCategory).map(([category, recipes]) => {
    return {
      category,
      recipes
    }
  })

  if (recipesWithoutCategory.length) {
    recipesInCategories.push({
      category: noCategory,
      recipes: recipesWithoutCategory
    })
  }

  return recipesInCategories
}
