import type { RecipesFilterValues } from '../app-pages/search/search-management/FilteringProvider'
import type { Recipe } from '../types/graphql-schema-types.generated'
import { SearchMode } from '../widgets/form-textarea-search/FormTextAreaSearch'

export const getFilteredRecipes = (allRecipes: Recipe[], filters?: RecipesFilterValues) => {
  let filteredRecipes = allRecipes

  if (filters?.languages?.length) {
    const languages = filters.languages.map((language) => language.toUpperCase())
    filteredRecipes = filteredRecipes.filter(({ language }) => languages.includes(language.language.toUpperCase()))
  }

  if (filters?.tags?.length) {
    const tags = filters.tags.map((tag) => tag.toUpperCase())
    filteredRecipes = filteredRecipes.filter(({ tags: recipeTags }) => {
      return (recipeTags ?? []).some(({ tag }) => tags.includes(tag.toUpperCase()))
    })
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

  return [...filteredRecipes]
}
