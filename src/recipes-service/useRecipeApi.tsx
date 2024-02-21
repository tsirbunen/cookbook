import { Recipe } from '../types/graphql-schema-types.generated'
import { AllRecipesDocument, AllRecipesQuery, AllRecipesQueryVariables } from './queries.generated'

import { ApolloError, useQuery } from '@apollo/client'

type UseRecipeApi = {
  queryError: ApolloError | undefined
  queryLoading: boolean
  allRecipes: Recipe[] | undefined
}

/**
 * The useRecipeApi hook handles all the conversation with the api server for recipe data.
 */
export const useRecipeApi = (): UseRecipeApi => {
  const { error, loading, data } = useQuery<AllRecipesQuery, AllRecipesQueryVariables>(AllRecipesDocument)

  return {
    queryError: error,
    queryLoading: loading,
    allRecipes: data?.allRecipes
  }
}
