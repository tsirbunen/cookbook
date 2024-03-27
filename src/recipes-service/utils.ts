import { Recipe } from '../types/graphql-schema-types.generated'
import { NO_CATEGORY_TITLE } from '../constants/layout'
import { RecipeCategory } from '../types/types'
import { SearchMode } from '../widgets/form-textarea-search/FormTextAreaSearch'
import { RecipesFilterValues } from '../app-pages/recipes/page/FilteringProvider'

export const getFilteredCategorizedRecipes = (allRecipes: Recipe[], filters?: RecipesFilterValues) => {
  let filteredRecipes: RecipeCategory[] = []

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

  return filteredRecipes
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
