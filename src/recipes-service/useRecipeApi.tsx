import { useContext } from 'react'
import { Recipe } from '../types/graphql-schema-types.generated'
import { GraphQLClientContext } from '../graphql-client/graphql-client'
import { AllRecipesDocument, AllRecipesQuery, AllRecipesQueryVariables } from './queries.generated'
import { RecipesFilterValues } from '../app-pages/recipes-viewing/page/FilteringProvider'
import { SearchMode } from '../widgets/form-textarea-search/FormTextAreaSearch'
import { noCategoryTitle } from '../constants/constants'
import { RecipeCategory } from '../types/types'

type UseRecipeApi = {
  getAllRecipes: () => Promise<Recipe[] | undefined>
  getFilteredCategorizedRecipes: (filters?: RecipesFilterValues) => Promise<RecipeCategory[]>
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
      console.log(result)

      const allRecipes = result.data?.allRecipes

      if (!allRecipes) {
        // FIXME: Show snackbar, there is error?
        return
      }

      return allRecipes
    } catch (error) {
      console.log({ error })
    }
  }

  const getFilteredCategorizedRecipes = async (filters?: RecipesFilterValues) => {
    let filteredRecipes: RecipeCategory[] = []

    try {
      // FIXME: Change to true filtering
      const result = await client.query<AllRecipesQuery, AllRecipesQueryVariables>({
        query: AllRecipesDocument
      })

      let allRecipes = result.data?.allRecipes
      if (filters?.categories?.length) {
        const categoriesToInclude = filters.categories
        allRecipes = allRecipes.filter((r) => r.category && categoriesToInclude.includes(r.category))
      }

      if (filters?.ingredients.searchTerm.length) {
        const wordsToContain = filters.ingredients.searchTerm.split(' ').map((w) => w.toLowerCase())

        const filterFn = filters.ingredients.searchMode === SearchMode.AND ? 'every' : 'some'
        allRecipes = allRecipes.filter((r) => {
          return r.ingredientGroups[filterFn]((g) => {
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
      // FIXME: Show snackbar, there is error?
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
      category: noCategoryTitle,
      recipes: recipesWithoutCategory
    })
  }

  return recipesInCategories
}
