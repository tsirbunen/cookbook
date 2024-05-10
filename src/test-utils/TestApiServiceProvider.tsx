import { useState } from 'react'
import { RecipesFilterValues } from '../app-pages/search/page/FilteringProvider'
import { ApiServiceContext } from '../api-service/ApiServiceProvider'

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

  return (
    <ApiServiceContext.Provider value={{ filterRecipes }}>
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
