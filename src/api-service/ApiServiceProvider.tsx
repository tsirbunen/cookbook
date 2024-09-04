'use client'

import { createContext, useContext, useEffect } from 'react'
import { FetchResult } from '@apollo/client'
import { AppStateContext, AppStateContextType } from '../state/StateContextProvider'
import { Dispatch } from '../state/reducer'
import { RecipesFilterValues, getEmptyFilterValues } from '../app-pages/search/page/FilteringProvider'
import { getFilteredRecipes } from './utils'
import {
  InitialRecipesAndRelatedDataDocument,
  InitialRecipesAndRelatedDataQuery,
  InitialRecipesAndRelatedDataQueryVariables
} from './graphql-queries/initialData.generated'
import { AllRecipesDocument, AllRecipesQuery, AllRecipesQueryVariables } from './graphql-queries/allRecipes.generated'

import { AccountInput } from '../types/graphql-schema-types.generated'
import {
  CreateAccountDocument,
  CreateAccountMutation,
  CreateAccountMutationVariables
} from './graphql-mutations/createAccount.generated'
import {
  RequestVerificationCodeDocument,
  RequestVerificationCodeMutation,
  RequestVerificationCodeMutationVariables
} from './graphql-mutations/requestVerificationCode.generated'
import {
  SignInToAccountWithCodeDocument,
  SignInToAccountWithCodeMutation,
  SignInToAccountWithCodeMutationVariables
} from './graphql-mutations/signInToAccountWithCode.generated'
import {
  DeleteAccountDocument,
  DeleteAccountMutation,
  DeleteAccountMutationVariables
} from './graphql-mutations/deleteAccount.generated'
import { GraphQLClientContext } from '../graphql-client/graphql-client'

export type ApiService = {
  filterRecipes: (filters: RecipesFilterValues) => Promise<void>
  createAccount: (accountInput: AccountInput) => Promise<FetchResult<CreateAccountMutation>>
  requestVerificationCode: (phoneNumber: string) => Promise<FetchResult<RequestVerificationCodeMutation>>
  signInToAccountWithCode: (code: string) => Promise<FetchResult<SignInToAccountWithCodeMutation>>
  deleteAccount: () => Promise<FetchResult<DeleteAccountMutation>>
}

export const ApiServiceContext = createContext<ApiService>({} as ApiService)

/**
 * This provider is responsible for performing all communication with the api.
 * When the app loads, this provider orchestrates fetching recipes
 * from the api (using the hook) and stores the recipes to state. Later, if, for example,
 * some filters are applied or a new recipe is created or an old recipe is updated,
 * this provider orchestrates the necessary actions.
 * Note: This provider does not store data. App state provider is for that purpose.
 */
const ApiServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { client } = useContext(GraphQLClientContext)
  const { dispatch } = useContext(AppStateContext) as AppStateContextType

  const createAccount = async (accountInput: AccountInput) => {
    const result = await client.mutate<CreateAccountMutation, CreateAccountMutationVariables>({
      mutation: CreateAccountDocument,
      variables: { accountInput }
    })
    // FIXME: Add here possible error handling and snackbar to show the user what happened
    return result
  }

  const requestVerificationCode = async (phoneNumber: string) => {
    const result = await client.mutate<RequestVerificationCodeMutation, RequestVerificationCodeMutationVariables>({
      mutation: RequestVerificationCodeDocument,
      variables: { phoneNumber }
    })
    // FIXME: Add here possible error handling and snackbar to show the user what happened
    return result
  }

  const signInToAccountWithCode = async (code: string) => {
    const result = await client.mutate<SignInToAccountWithCodeMutation, SignInToAccountWithCodeMutationVariables>({
      mutation: SignInToAccountWithCodeDocument,
      variables: { code }
    })
    // FIXME: Add here possible error handling and snackbar to show the user what happened
    return result
  }

  const deleteAccount = async () => {
    const result = await client.mutate<DeleteAccountMutation, DeleteAccountMutationVariables>({
      mutation: DeleteAccountDocument
    })
    // FIXME: Add here possible error handling and snackbar to show the user what happened
    return result
  }

  useEffect(() => {
    const getRecipes = async () => {
      const initialData = await client.query<
        InitialRecipesAndRelatedDataQuery,
        InitialRecipesAndRelatedDataQueryVariables
      >({
        query: InitialRecipesAndRelatedDataDocument
      })

      const { allRecipes, allLanguages, allTags } = initialData.data

      if (allRecipes !== undefined) {
        dispatch({
          type: Dispatch.SET_RECIPES_AND_FILTERS,
          payload: { recipes: getFilteredRecipes(allRecipes), filters: getEmptyFilterValues() }
        })
      }

      if (allLanguages !== undefined) {
        dispatch({ type: Dispatch.SET_LANGUAGES, payload: { languages: allLanguages } })
      }

      if (allTags !== undefined) {
        dispatch({ type: Dispatch.SET_TAGS, payload: { tags: allTags } })
      }
    }
    getRecipes()
  }, [])

  const filterRecipes = async (filters: RecipesFilterValues) => {
    // FIXME: Implement query recipes with filters from api
    const allRecipesData = await client.query<AllRecipesQuery, AllRecipesQueryVariables>({
      query: AllRecipesDocument
    })
    if (!allRecipesData.data?.allRecipes.length) return

    const filteredRecipes = getFilteredRecipes(allRecipesData.data.allRecipes, filters)
    dispatch({ type: Dispatch.SET_RECIPES_AND_FILTERS, payload: { recipes: filteredRecipes, filters } })
  }

  return (
    <ApiServiceContext.Provider
      value={{
        filterRecipes,
        createAccount,
        requestVerificationCode,
        signInToAccountWithCode,
        deleteAccount
      }}
    >
      {children}
    </ApiServiceContext.Provider>
  )
}

export default ApiServiceProvider
