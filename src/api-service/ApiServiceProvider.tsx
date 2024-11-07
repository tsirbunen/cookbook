'use client'

import type { ApolloError, FetchResult } from '@apollo/client'
import { type MutableRefObject, createContext, useContext, useEffect, useRef } from 'react'
import { type RecipesFilterValues, getEmptyFilterValues } from '../app-pages/search/page/FilteringProvider'
import { AppStateContext, type AppStateContextType } from '../state/StateContextProvider'
import { Dispatch } from '../state/reducer'
import {
  type Account,
  type BaseError,
  type CreateRecipeInput,
  type EmailAccountInput,
  type NonEmailAccountInput,
  type Recipe,
  ValidationTarget
} from '../types/graphql-schema-types.generated'
import {
  CreateEmailAccountDocument,
  type CreateEmailAccountMutation,
  type CreateEmailAccountMutationVariables
} from './graphql-mutations/createEmailAccount.generated'
import {
  CreateNonEmailAccountDocument,
  type CreateNonEmailAccountMutation,
  type CreateNonEmailAccountMutationVariables
} from './graphql-mutations/createNonEmailAccount.generated'
import {
  CreateRecipeDocument,
  type CreateRecipeMutation,
  type CreateRecipeMutationVariables
} from './graphql-mutations/createRecipe.generated'
import {
  AllRecipesDocument,
  type AllRecipesQuery,
  type AllRecipesQueryVariables
} from './graphql-queries/allRecipes.generated'
import {
  FetchValidationSchemasDocument,
  type FetchValidationSchemasQuery,
  type FetchValidationSchemasQueryVariables
} from './graphql-queries/fetchValidationSchemas.generated'
import {
  GetAccountDocument,
  type GetAccountQuery,
  type GetAccountQueryVariables
} from './graphql-queries/getAccount.generated'
import {
  InitialRecipesAndRelatedDataDocument,
  type InitialRecipesAndRelatedDataQuery,
  type InitialRecipesAndRelatedDataQueryVariables
} from './graphql-queries/initialData.generated'
import { getFilteredRecipes } from './utils'

import {
  RequestVerificationEmailDocument,
  type RequestVerificationEmailMutation,
  type RequestVerificationEmailMutationVariables
} from './graphql-mutations/requestVerificationEmail.generated'

import {
  SignInToEmailAccountDocument,
  type SignInToEmailAccountMutation,
  type SignInToEmailAccountMutationVariables
} from './graphql-mutations/signInToEmailAccount.generated'

import type { ToastId } from '@chakra-ui/toast'
import { type SimpleToast, ToastServiceContext } from '../toast-service/ToastServiceProvider'
import type { JSONSchemaType } from '../types/types'
import { GraphQLClientContext } from './graphql-client/graphql-client'
import {
  DeleteAccountDocument,
  type DeleteAccountMutation,
  type DeleteAccountMutationVariables
} from './graphql-mutations/deleteAccount.generated'
import {
  type ToastInputs,
  createAccountToasts,
  createRecipeToasts,
  deleteAccountToasts,
  getAccountToasts,
  requestVerificationEmailToasts,
  signInToEmailAccountToasts
} from './toast-inputs-and-errors'

export type ApiService = {
  createEmailAccount: (emailAccountInput: EmailAccountInput) => Promise<Account | null>
  createNonEmailAccount: (nonEmailAccountInput: NonEmailAccountInput) => Promise<Account | null>
  createRecipe: (createRecipeInput: CreateRecipeInput) => Promise<Recipe | null>
  deleteAccount: (id: number, uuid: string) => Promise<boolean | null>
  fetchAllPublicAndUsersOwnRecipes: () => Promise<void>
  fetchValidationSchemas: () => Promise<Record<ValidationTarget, JSONSchemaType> | null>
  filterRecipes: (filters: RecipesFilterValues) => Promise<void>
  getAccount: (token: string) => Promise<Account | null>
  requestVerificationEmail: (email: string) => Promise<boolean | null>
  setAuthenticationToken: (token: string | null) => void
  signInToEmailAccount: (signInWithPasswordInput: { email: string; password: string }) => Promise<Account | null>
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
  const { client, setAuthentication } = useContext(GraphQLClientContext)
  const { dispatch } = useContext(AppStateContext) as AppStateContextType
  const { showUpdatableToast, updateUpdatableToast } = useContext(ToastServiceContext)
  const toastIdRef = useRef() as MutableRefObject<ToastId>

  const setAuthenticationToken = (token: string | null) => {
    setAuthentication(token)
  }

  /**
   * This function performs the given graphql query or mutation within a try-catch block
   * and shows the user an updating toast indicating the status of the query.
   * @param fn The graphql query or mutation function to be carried out
   * @param toastInputs The loading, success, and error toasts to be shown to the user
   * @returns The data from the query or mutation or null if an error occurred
   */
  const performWithToasts = async <T,>(
    fn: () => Promise<FetchResult<T>>,
    toastInputs: ToastInputs
  ): Promise<T | null> => {
    const { loadingToast, successToast, errorToast, errorText } = toastInputs
    showUpdatableToast(toastIdRef, loadingToast)

    try {
      // We only need to consider data here. Apollo client manages the errors behind the scenes
      // and in case of an error we end up in the catch block.
      const { data } = await fn()
      if (!data) throw new Error(errorText)

      // In many cases, the api returns a unit type response where the data contains either
      // an entity or an "anticipated error" that extends the BaseError type with field errorMessage.
      const resultError = data
        ? (Object.values(data as object).find((value) => value?.errorMessage) as BaseError)
        : null

      if (!resultError) {
        updateUpdatableToast(toastIdRef, successToast)
        return data as T
      }

      handleShowErrorMessage(errorToast, resultError)
      return null
    } catch (error) {
      handleShowErrorMessage(errorToast, error)
      return null
    }
  }

  const handleShowErrorMessage = (errorToast: SimpleToast, error: BaseError | ApolloError | unknown) => {
    // Apollo client populates the graphQLErrors field in case of a graphql error. Log errors
    // to console in development, but display the user only a user-friendly error message.
    if (process.env.NODE_ENV === 'development') console.log((error as ApolloError)?.graphQLErrors)
    const description = (error as BaseError).errorMessage ?? errorToast.description
    updateUpdatableToast(toastIdRef, { ...errorToast, description })
  }

  const createRecipe = async (createRecipeInput: CreateRecipeInput) => {
    const fn = () =>
      client.mutate<CreateRecipeMutation, CreateRecipeMutationVariables>({
        mutation: CreateRecipeDocument,
        variables: { createRecipeInput }
      })

    const data = await performWithToasts<CreateRecipeMutation>(fn, createRecipeToasts)
    if (data?.createRecipe?.__typename === 'Recipe') {
      return data?.createRecipe ?? null
    }

    return null
  }

  const createNonEmailAccount = async (nonEmailAccountInput: NonEmailAccountInput) => {
    const fn = () =>
      client.mutate<CreateNonEmailAccountMutation, CreateNonEmailAccountMutationVariables>({
        mutation: CreateNonEmailAccountDocument,
        variables: { nonEmailAccountInput }
      })

    const data = await performWithToasts<CreateNonEmailAccountMutation>(fn, createAccountToasts)
    if (data?.createNonEmailAccount?.__typename === 'Account') {
      return data?.createNonEmailAccount
    }

    return null
  }

  const createEmailAccount = async (emailAccountInput: EmailAccountInput) => {
    const fn = () =>
      client.mutate<CreateEmailAccountMutation, CreateEmailAccountMutationVariables>({
        mutation: CreateEmailAccountDocument,
        variables: { emailAccountInput }
      })

    const data = await performWithToasts<CreateEmailAccountMutation>(fn, createAccountToasts)
    if (data?.createEmailAccount?.__typename === 'Account') {
      return data?.createEmailAccount
    }

    return null
  }

  const requestVerificationEmail = async (email: string) => {
    const fn = () =>
      client.mutate<RequestVerificationEmailMutation, RequestVerificationEmailMutationVariables>({
        mutation: RequestVerificationEmailDocument,
        variables: { emailInput: { email } }
      })

    const data = await performWithToasts<RequestVerificationEmailMutation>(fn, requestVerificationEmailToasts)
    const resultType = data?.requestVerificationEmail?.__typename
    return resultType === 'GeneralSuccess' ? true : resultType === 'GeneralError' ? false : null
  }

  const signInToEmailAccount = async (signInToEmailAccountInput: { email: string; password: string }) => {
    const fn = () =>
      client.mutate<SignInToEmailAccountMutation, SignInToEmailAccountMutationVariables>({
        mutation: SignInToEmailAccountDocument,
        variables: { signInToEmailAccountInput }
      })

    const data = await performWithToasts<SignInToEmailAccountMutation>(fn, signInToEmailAccountToasts)
    if (data?.signInToEmailAccount?.__typename === 'Account') {
      return data?.signInToEmailAccount
    }

    return null
  }

  const getAccount = async (token: string) => {
    const fn = () =>
      client.mutate<GetAccountQuery, GetAccountQueryVariables>({
        mutation: GetAccountDocument,
        variables: { token }
      })

    const data = await performWithToasts<GetAccountQuery>(fn, getAccountToasts)
    if (data?.getAccount?.__typename === 'Account') {
      return data?.getAccount
    }

    return null
  }

  const deleteAccount = async (id: number, uuid: string) => {
    const fn = () =>
      client.mutate<DeleteAccountMutation, DeleteAccountMutationVariables>({
        mutation: DeleteAccountDocument,
        variables: { deleteAccountInput: { id, uuid } }
      })

    const data = await performWithToasts<DeleteAccountMutation>(fn, deleteAccountToasts)
    const resultType = data?.deleteAccount?.__typename
    return resultType === 'GeneralSuccess' ? true : resultType === 'GeneralError' ? false : null
  }

  const fetchAllPublicAndUsersOwnRecipes = async () => {
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

  const getValidationSchemas = async () => {
    const schemas = await fetchValidationSchemas()

    if (schemas) {
      dispatch({ type: Dispatch.SET_VALIDATION_SCHEMAS, payload: { validationSchemas: schemas } })
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only want to run this effect once
  useEffect(() => {
    fetchAllPublicAndUsersOwnRecipes()
    getValidationSchemas()
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

  const fetchValidationSchemas = async () => {
    const result = await client.query<FetchValidationSchemasQuery, FetchValidationSchemasQueryVariables>({
      query: FetchValidationSchemasDocument,
      variables: { schemas: Object.values(ValidationTarget) }
    })

    if (!result.data?.validationSchemas) return null

    const validationSchemas = result.data.validationSchemas.reduce(
      // FIXME: Find the rule that requires next line here so that we need not force to next line
      // with a comment to silence biome linting error
      (acc, { target, schema }) => {
        acc[target] = schema
        return acc
      },
      {} as Record<ValidationTarget, JSONSchemaType>
    )

    return validationSchemas
  }

  return (
    <ApiServiceContext.Provider
      value={{
        createEmailAccount,
        createNonEmailAccount,
        createRecipe,
        deleteAccount,
        fetchAllPublicAndUsersOwnRecipes,
        fetchValidationSchemas,
        filterRecipes,
        getAccount,
        requestVerificationEmail,
        setAuthenticationToken,
        signInToEmailAccount
      }}
    >
      {children}
    </ApiServiceContext.Provider>
  )
}

export default ApiServiceProvider
