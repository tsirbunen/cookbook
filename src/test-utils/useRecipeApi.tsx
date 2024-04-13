/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApolloError } from '@apollo/client'
import { useState } from 'react'
import { getTestDataForCypressGitHubActionsTests } from '../../app/api/test-data-migrations/test-recipes-migration-data'

type UseRecipeApi = {
  queryError: ApolloError | undefined
  queryLoading: boolean
  allRecipes: any
}

export const useRecipeApi = (): UseRecipeApi => {
  const [allRecipes] = useState(getTestDataForCypressGitHubActionsTests())
  return {
    queryError: undefined,
    queryLoading: false,
    allRecipes
  }
}
