import { Recipe } from '../types/graphql-schema-types.generated'
import { SearchMode } from '../widgets/form-textarea-search/FormTextAreaSearch'
import { RecipesFilterValues } from '../app-pages/search/page/FilteringProvider'

export const getFilteredRecipes = (allRecipes: Recipe[], filters?: RecipesFilterValues) => {
  let filteredRecipes = allRecipes

  if (filters?.languages?.length) {
    filteredRecipes = filteredRecipes.filter((r) =>
      filters.languages.map((language) => language.toUpperCase()).includes(r.language.language.toUpperCase())
    )
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

  return filteredRecipes
}
