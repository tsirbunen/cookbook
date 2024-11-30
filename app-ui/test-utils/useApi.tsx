/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import {
  getTestLanguagesForCypressGitHubActionsTests,
  getTestRecipesForCypressGitHubActionsTests,
  getTestTagsForCypressGitHubActionsTests
} from '../../app/api/graphql/graphql-server/database/example-data/extract-recipe-data-for-github-actions-tests'

export const useApi = () => {
  const [allRecipes] = useState(getTestRecipesForCypressGitHubActionsTests())
  const [allLanguages] = useState(getTestLanguagesForCypressGitHubActionsTests())
  const [allTags] = useState(getTestTagsForCypressGitHubActionsTests())
  return {
    allRecipesData: { error: undefined, loading: false, data: { allRecipes } },
    allLanguagesData: { error: undefined, loading: false, data: { allLanguages } },
    allTagsData: { error: undefined, loading: false, data: { allTags } }
  }
}
