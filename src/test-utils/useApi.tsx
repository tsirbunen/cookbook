/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import {
  getTestRecipesForCypressGitHubActionsTests,
  getTestLanguagesForCypressGitHubActionsTests,
  getTestTagsForCypressGitHubActionsTests
} from '../../app/api/test-data-migrations/test-recipes-migration-data'

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
