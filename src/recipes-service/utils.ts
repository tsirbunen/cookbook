import { Recipe } from '../types/graphql-schema-types.generated'
import { RecipeCategory } from '../types/types'
import { SearchMode } from '../widgets/form-textarea-search/FormTextAreaSearch'
import { RecipesFilterValues } from '../app-pages/search/page/FilteringProvider'
import { NO_CATEGORY_TITLE } from '../constants/text-content'

export const getFilteredCategorizedRecipes = (allRecipes: Recipe[], filters?: RecipesFilterValues) => {
  let filteredRecipes

  // TODO: Add possibility to filter AND or OR!

  if (filters?.categories?.length) {
    const categoriesToInclude = filters.categories
    filteredRecipes = allRecipes.filter((r) => r.category && categoriesToInclude.includes(r.category))
  } else {
    filteredRecipes = allRecipes
  }

  if (filters?.ingredients.searchTerm.length) {
    const wordsToContain = filters.ingredients.searchTerm.split(' ').map((w) => w.toLowerCase())

    const filterFn = filters.ingredients.searchMode === SearchMode.AND ? 'every' : 'some'
    filteredRecipes = filteredRecipes.filter((r) => {
      return r.ingredientGroups[filterFn]((g) => {
        return g.ingredients.some((i) => {
          return wordsToContain.some((w) => {
            return i.name.toLowerCase().includes(w)
          })
        })
      })
    })
  }

  if (!filteredRecipes) {
    throw new Error('No recipes')
  }

  const filteredRecipesInCategories: RecipeCategory[] = arrangeRecipesInCategories(filteredRecipes)
  return filteredRecipesInCategories
}

export const arrangeRecipesInCategories = (recipes: Recipe[]) => {
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
      category: NO_CATEGORY_TITLE,
      recipes: recipesWithoutCategory
    })
  }

  return recipesInCategories
}
