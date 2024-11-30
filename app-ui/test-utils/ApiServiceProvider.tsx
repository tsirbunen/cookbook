'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { type RecipesFilterValues, getEmptyFilterValues } from '../app-pages/search/page/FilteringProvider'
import { AppStateContext, type AppStateContextType } from '../state/StateContextProvider'
import { Dispatch } from '../state/reducer'

import {
  allLanguages,
  allTags,
  allTestRecipes
} from '../../app-datastore/example-data/extract-recipe-data-for-github-actions-tests.js'
import type { Account, EmailAccountInput, Recipe } from '../types/graphql-schema-types.generated'
import { SearchMode } from '../widgets/form-textarea-search/FormTextAreaSearch'

export type ApiService = {
  filterRecipes: (filters: RecipesFilterValues) => Promise<void>
  createAccount: (accountInput: EmailAccountInput) => Promise<Account | null>
  requestVerificationCode: (phoneNumber: string) => Promise<boolean | null>
  signInToAccount: (signInInput: { phoneNumber: string; code: string }) => Promise<Account | null>
  deleteAccount: () => Promise<boolean | null>
}

const createAccount = async (_accountInput: EmailAccountInput) => {
  throw new Error('Not implemented')
}
const requestVerificationCode = async (_phoneNumber: string) => {
  throw new Error('Not implemented')
}

const signInToAccount = async (_signInInput: { phoneNumber: string; code: string }) => {
  throw new Error('Not implemented')
}

const deleteAccount = async () => {
  throw new Error('Not implemented')
}

export const ApiServiceContext = createContext<ApiService>({} as ApiService)

const ApiServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const [allRecipes] = useState(allTestRecipes)

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run only once
  useEffect(() => {
    dispatch({
      type: Dispatch.SET_RECIPES_AND_FILTERS,
      payload: {
        recipes: getFilteredRecipes(allTestRecipes as Recipe[]),
        filters: getEmptyFilterValues()
      }
    })
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run only once
  useEffect(() => {
    dispatch({
      type: Dispatch.SET_LANGUAGES,
      payload: { languages: allLanguages }
    })
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run only once
  useEffect(() => {
    dispatch({
      type: Dispatch.SET_TAGS,
      payload: { tags: allTags }
    })
  }, [])

  const filterRecipes = async (filters: RecipesFilterValues) => {
    if (!allRecipes.length) return

    const filteredRecipes = getFilteredRecipes(allRecipes as Recipe[], filters)
    dispatch({ type: Dispatch.SET_RECIPES_AND_FILTERS, payload: { recipes: filteredRecipes, filters } })
  }

  return (
    <ApiServiceContext.Provider
      value={{ filterRecipes, createAccount, requestVerificationCode, signInToAccount, deleteAccount }}
    >
      {children}
    </ApiServiceContext.Provider>
  )
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
