import { Language, Recipe, Tag } from '../types/graphql-schema-types.generated'
import { ApolloError, useQuery } from '@apollo/client'
import { AllRecipesDocument, AllRecipesQuery, AllRecipesQueryVariables } from './graphql-queries/allRecipes.generated'
import {
  AllLanguagesDocument,
  AllLanguagesQuery,
  AllLanguagesQueryVariables
} from './graphql-queries/allLanguages.generated'
import { AllTagsDocument, AllTagsQuery, AllTagsQueryVariables } from './graphql-queries/allTags.generated'

export type UseApi = {
  allRecipesData: {
    error?: ApolloError
    loading: boolean
    data?: { allRecipes: Recipe[] }
  }
  allLanguagesData: {
    error?: ApolloError
    loading: boolean
    data?: { allLanguages: Language[] }
  }
  allTagsData: {
    error?: ApolloError
    loading: boolean
    data?: { allTags: Tag[] }
  }
}

/**
 * The useApi hook handles all the conversation with the api server.
 */
export const useApi = (): UseApi => {
  const allRecipesData = useQuery<AllRecipesQuery, AllRecipesQueryVariables>(AllRecipesDocument)
  const allLanguagesData = useQuery<AllLanguagesQuery, AllLanguagesQueryVariables>(AllLanguagesDocument)
  const allTagsData = useQuery<AllTagsQuery, AllTagsQueryVariables>(AllTagsDocument)

  return {
    allRecipesData,
    allLanguagesData,
    allTagsData
  }
}
