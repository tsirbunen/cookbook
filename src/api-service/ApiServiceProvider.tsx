'use client'

import { createContext, MutableRefObject, useContext, useEffect, useRef } from 'react'
import { ApolloError, FetchResult } from '@apollo/client'
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

import { Account, AccountInput, BaseError } from '../types/graphql-schema-types.generated'
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
import { GraphQLClientContext } from './graphql-client/graphql-client'
import { SimpleToast, ToastServiceContext } from '../toast-service/ToastServiceProvider'
import { ToastId } from '@chakra-ui/toast'
import {
  ToastInputs,
  createAccountToasts,
  requestVerificationCodeToasts,
  signInToAccountToasts
} from './toast-inputs-and-errors'
import { GraphQLError } from 'graphql'

export type ApiService = {
  filterRecipes: (filters: RecipesFilterValues) => Promise<void>
  createAccount: (accountInput: AccountInput) => Promise<Account | null>
  requestVerificationCode: (phoneNumber: string) => Promise<boolean | null>
  signInToAccountWithCode: (code: string) => Promise<Account | null>
  deleteAccount: () => Promise<boolean | null>
}

export const ApiServiceContext = createContext<ApiService>({} as ApiService)

/**
 * This provider is responsible for performing all communication with the api.
 * When the app loads, this provider orchestrates fetching recipes
 * from the api (using the hook) and stores the recipes to state. Later, if, for example,
 * some filters are applied or a new recipe is created or an old recipe is updated,
 * this provider orchestrates the necessary actions. This provider also takes care of
 * showing the user the status of the query (i.e. it shows a toast telling whether the app
 * is loading or the response has arrived and is success or error).
 * Note: This provider does not store data. App state provider is for that purpose.
 */
const ApiServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const { client } = useContext(GraphQLClientContext)
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const { showUpdatableToast, updateUpdatableToast } = useContext(ToastServiceContext)
  const toastIdRef = useRef() as MutableRefObject<ToastId>

  // Better error handling here?
  // https://the-guild.dev/blog/graphql-error-handling-with-fp

  /**
   * This function performs the given graphql query or mutation within a try-catch block
   * and shows the user an updating toast indicating the status of the query.
   * @param fn The graphql query or mutation function to be carried out
   * @param toastInputs The loading, success, and error toasts to be shown to the user
   * @returns The data from the query or mutation or null if an error occurred
   */
  const performWithToasts = async function <T>(
    fn: () => Promise<FetchResult<T>>,
    toastInputs: ToastInputs
  ): Promise<T | null> {
    const { loadingToast, successToast, errorToast, errorText } = toastInputs
    showUpdatableToast(toastIdRef, loadingToast)

    try {
      const { data, errors } = await fn()
      console.log({ data, errors })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resultError = Object.values(data as any).find((value: any) => value?.errorMessage) as BaseError
      console.log({ resultError })
      if (resultError) {
        handleShowErrorMessage(errorToast, { resultError })
        return null
      }

      if (data) {
        updateUpdatableToast(toastIdRef, successToast)
        return data as T
      }

      if (errors) {
        handleShowErrorMessage(errorToast, { errors })
        return null
      }

      throw new Error(errorText)
    } catch (error) {
      handleShowErrorMessage(errorToast, { error })
    }

    return null
  }

  const handleShowErrorMessage = (
    errorToast: SimpleToast,
    error: { resultError?: BaseError; errors?: readonly GraphQLError[]; error?: ApolloError | unknown }
  ) => {
    console.log({ error })
    const graphQLErrors = error.errors ?? (error.error as ApolloError)?.graphQLErrors
    const errorMessage = graphQLErrors?.[0]?.message ?? (error as ApolloError)?.message
    const description = error.resultError
      ? error.resultError.errorMessage
      : errorMessage
      ? errorMessage
      : errorToast.description
    console.log({ description })
    updateUpdatableToast(toastIdRef, { ...errorToast, description })
  }

  const createAccount = async (accountInput: AccountInput) => {
    const fn = () =>
      client.mutate<CreateAccountMutation, CreateAccountMutationVariables>({
        mutation: CreateAccountDocument,
        variables: { accountInput }
      })

    const data = await performWithToasts<CreateAccountMutation>(fn, createAccountToasts)
    if (data?.createAccount?.__typename === 'Account') {
      return data?.createAccount
    }

    return null
  }

  const requestVerificationCode = async (phoneNumber: string) => {
    const fn = () =>
      client.mutate<RequestVerificationCodeMutation, RequestVerificationCodeMutationVariables>({
        mutation: RequestVerificationCodeDocument,
        variables: { phoneNumber }
      })

    const data = await performWithToasts<RequestVerificationCodeMutation>(fn, requestVerificationCodeToasts)
    return data?.requestVerificationCode === false ? false : data?.requestVerificationCode === true ? true : null
  }

  const signInToAccountWithCode = async (code: string) => {
    const fn = () =>
      client.mutate<SignInToAccountWithCodeMutation, SignInToAccountWithCodeMutationVariables>({
        mutation: SignInToAccountWithCodeDocument,
        variables: { code }
      })

    const data = await performWithToasts<SignInToAccountWithCodeMutation>(fn, signInToAccountToasts)
    if (data?.signInToAccountWithCode?.__typename === 'Account') {
      return data?.signInToAccountWithCode
    }

    return null
  }

  const deleteAccount = async () => {
    const fn = () =>
      client.mutate<DeleteAccountMutation, DeleteAccountMutationVariables>({
        mutation: DeleteAccountDocument
      })

    const data = await performWithToasts<DeleteAccountMutation>(fn, signInToAccountToasts)
    return data?.deleteAccount === false ? false : data?.deleteAccount === true ? true : null
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
