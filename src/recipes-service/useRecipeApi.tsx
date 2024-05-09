import { Language, Recipe } from '../types/graphql-schema-types.generated'
import {
  AllLanguagesDocument,
  AllLanguagesQuery,
  AllLanguagesQueryVariables,
  AllRecipesDocument,
  AllRecipesQuery,
  AllRecipesQueryVariables
} from './queries.generated'

import { ApolloError, useQuery } from '@apollo/client'

type UseRecipeApi = {
  allRecipesError: ApolloError | undefined
  allRecipesLoading: boolean
  allRecipes: Recipe[] | undefined
  allLanguagesError: ApolloError | undefined
  allLanguagesLoading: boolean
  allLanguages: Language[] | undefined
}

/**
 * The useRecipeApi hook handles all the conversation with the api server for recipe data.
 */
export const useRecipeApi = (): UseRecipeApi => {
  const {
    error: allRecipesError,
    loading: allRecipesLoading,
    data: allRecipesData
  } = useQuery<AllRecipesQuery, AllRecipesQueryVariables>(AllRecipesDocument)

  const {
    error: allLanguagesError,
    loading: allLanguagesLoading,
    data: allLanguagesData
  } = useQuery<AllLanguagesQuery, AllLanguagesQueryVariables>(AllLanguagesDocument)

  return {
    allRecipesError,
    allRecipesLoading,
    allRecipes: allRecipesData?.allRecipes,
    allLanguagesError,
    allLanguagesLoading,
    allLanguages: allLanguagesData?.allLanguages
  }
}
