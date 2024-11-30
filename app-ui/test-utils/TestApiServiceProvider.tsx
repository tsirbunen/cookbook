import { useState } from 'react'
import { ApiServiceContext } from '../api-service/ApiServiceProvider'
import type { RecipesFilterValues } from '../app-pages/search/page/FilteringProvider'
import type { EmailAccountInput } from '../types/graphql-schema-types.generated'

const TestApiServiceProvider = ({
  filterValues,
  children
}: {
  filterValues: RecipesFilterValues
  children: React.ReactNode
}) => {
  const [testValues, setTestValues] = useState<RecipesFilterValues>(filterValues)

  const filterRecipes = async (filters: RecipesFilterValues) => {
    setTestValues(filters)
  }

  const createEmailAccount = async (_accountInput: EmailAccountInput) => {
    throw new Error('Not implemented')
  }
  const requestVerificationEmail = async (_phoneNumber: string) => {
    throw new Error('Not implemented')
  }
  const signInToEmailAccount = async (_signInInput: { email: string; password: string }) => {
    throw new Error('Not implemented')
  }
  const deleteAccount = async () => {
    throw new Error('Not implemented')
  }
  const fetchValidationSchemas = async () => {
    throw new Error('Not implemented')
  }
  const getAccount = async () => {
    throw new Error('Not implemented')
  }
  const createNonEmailAccount = async () => {
    throw new Error('Not implemented')
  }
  const createRecipe = async () => {
    throw new Error('Not implemented')
  }
  const fetchAllPublicAndUsersOwnRecipes = async () => {
    throw new Error('Not implemented')
  }
  const setAuthenticationToken = async () => {
    throw new Error('Not implemented')
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
      <TestFilteringProviderUser filterValues={testValues} />
    </ApiServiceContext.Provider>
  )
}

export default TestApiServiceProvider

export const TEST_PREFIX = 'test-prefix'
export const NO_LANGUAGES = 'NO_LANGUAGES'
export const NO_INGREDIENTS = 'NO_INGREDIENTS'

const TestFilteringProviderUser = ({ filterValues }: { filterValues: RecipesFilterValues }) => {
  const { languages, ingredients } = filterValues
  return (
    <div>
      {languages.length === 0 ? <div>{NO_LANGUAGES}</div> : null}
      {languages.map((language: string) => (
        <div key={language}> {`${TEST_PREFIX}-${language}`}</div>
      ))}

      {ingredients.searchTerm.length === 0 ? <div>{NO_INGREDIENTS}</div> : null}
      <div> {`${TEST_PREFIX}-${ingredients.searchTerm}`}</div>
      <div> {`${TEST_PREFIX}-${ingredients.searchMode}`}</div>
    </div>
  )
}
