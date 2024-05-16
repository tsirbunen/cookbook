'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { AppStateContext, AppStateContextType } from '../state/StateContextProvider'
import { Dispatch } from '../state/reducer'
import { RecipesFilterValues, getEmptyFilterValues } from '../app-pages/search/page/FilteringProvider'
import {
  getTestLanguagesForCypressGitHubActionsTests,
  getTestRecipesForCypressGitHubActionsTests,
  getTestTagsForCypressGitHubActionsTests
} from '../../app/api/test-data-migrations/test-recipes-migration-data'
import { Recipe } from '../types/graphql-schema-types.generated'
import { SearchMode } from '../widgets/form-textarea-search/FormTextAreaSearch'

export type ApiService = {
  filterRecipes: (filters: RecipesFilterValues) => Promise<void>
}

export const ApiServiceContext = createContext<ApiService>({} as ApiService)

const allTestRecipes = getTestRecipesForCypressGitHubActionsTests()

const ApiServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const [allRecipes] = useState(allTestRecipes)

  useEffect(() => {
    dispatch({
      type: Dispatch.SET_RECIPES_AND_FILTERS,
      payload: {
        recipes: getFilteredRecipes(allTestRecipes),
        filters: getEmptyFilterValues()
      }
    })
  }, [])

  useEffect(() => {
    dispatch({
      type: Dispatch.SET_LANGUAGES,
      payload: { languages: getTestLanguagesForCypressGitHubActionsTests() }
    })
  }, [])

  useEffect(() => {
    dispatch({
      type: Dispatch.SET_TAGS,
      payload: { tags: getTestTagsForCypressGitHubActionsTests() }
    })
  }, [])

  const filterRecipes = async (filters: RecipesFilterValues) => {
    if (!allRecipes.length) return

    const filteredRecipes = getFilteredRecipes(allRecipes, filters)
    dispatch({ type: Dispatch.SET_RECIPES_AND_FILTERS, payload: { recipes: filteredRecipes, filters } })
  }

  return <ApiServiceContext.Provider value={{ filterRecipes }}>{children}</ApiServiceContext.Provider>
}

export default ApiServiceProvider

const getFilteredRecipes = (allRecipes: Recipe[], filters?: RecipesFilterValues) => {
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

  return filteredRecipes
}
