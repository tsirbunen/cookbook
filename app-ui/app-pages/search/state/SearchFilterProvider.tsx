import { xor } from 'lodash'
import { createContext, useContext, useState } from 'react'
import { ApiServiceContext } from '../../../api-service/ApiServiceProvider'
import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import { FilterableRecipeProperty } from '../../../types/types'
import type { FormButtonsSelectorValue } from '../../../widgets/form-buttons-selector/FormButtonsSelector'
import { SearchMode, type TextAreaSearchValues } from '../../../widgets/form-textarea-search/FormTextAreaSearch'

export interface RecipesFilterValues {
  [FilterableRecipeProperty.languages]: FormButtonsSelectorValue
  [FilterableRecipeProperty.tags]: FormButtonsSelectorValue
  [FilterableRecipeProperty.ingredients]: TextAreaSearchValues
}

type RecipesFiltering = {
  languages: string[]
  tags: string[]
  initialValues: RecipesFilterValues
  applyFilters: () => void
  clearFilters: () => void
  filtersHaveValues: () => boolean
  appliedFiltersCount: number
  updateFormFilters: (newValues: RecipesFilterValues) => void
  hasChanges: boolean
}

export const SearchFiltersContext = createContext<RecipesFiltering>({} as RecipesFiltering)
const defaultSearchMode = SearchMode.OR

const SearchFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useContext(AppStateContext) as AppStateContextType
  const { filterRecipes } = useContext(ApiServiceContext)
  const [filterValues, setFilterValues] = useState<RecipesFilterValues>(state.filters)
  const [hasChanges, setHasChanges] = useState(false)

  const updateFormFilters = (newValues: RecipesFilterValues) => {
    setFilterValues(newValues)
    setHasChanges(someFilterHasChanged(state.filters, newValues))
  }

  const getAppliedFiltersCount = () => {
    const appliedFilters = state.filters
    let count = 0
    if (appliedFilters.languages.length) count += 1
    if (appliedFilters.tags.length) count += 1
    if (appliedFilters.ingredients.searchTerm.length) count += 1

    return count
  }

  const applyFilters = () => {
    filterRecipes(filterValues)
    setFilterValues(filterValues)
    setHasChanges(false)
  }

  const clearFilters = () => {
    const emptyValues = getEmptyFilterValues()
    setHasChanges(someFilterHasChanged(state.filters, emptyValues))
  }

  const appliedFiltersCount = getAppliedFiltersCount()
  const initialValues = { ...state.filters }

  return (
    <SearchFiltersContext.Provider
      value={{
        languages: state.languages.map((language) => language.language),
        tags: state.tags.map((tag) => tag.tag),
        initialValues,
        applyFilters,
        appliedFiltersCount,
        clearFilters,
        filtersHaveValues: () => filtersHaveValues(filterValues),
        updateFormFilters,
        hasChanges
      }}
    >
      {children}
    </SearchFiltersContext.Provider>
  )
}

export default SearchFilterProvider

export const getEmptyFilterValues = (): RecipesFilterValues => {
  return {
    languages: [],
    tags: [],
    ingredients: { searchTerm: '', searchMode: undefined }
  }
}

const filtersHaveValues = (filterValues: RecipesFilterValues) => {
  if (filterValues.languages.length) return true
  if (filterValues.tags.length) return true
  if (filterValues.ingredients.searchMode && filterValues.ingredients.searchMode !== defaultSearchMode) return true
  if (filterValues.ingredients.searchTerm.length) return true
  return false
}

const someFilterHasChanged = (originalFilters: RecipesFilterValues, currentFilters: RecipesFilterValues) => {
  const languagesHaveChanged = xor(originalFilters.languages, currentFilters.languages).length > 0
  if (languagesHaveChanged) return true

  const tagsHaveChanged = xor(originalFilters.tags, currentFilters.tags).length > 0
  if (tagsHaveChanged) return true

  const ingredientsHaveChanged =
    originalFilters.ingredients.searchTerm !== currentFilters.ingredients.searchTerm ||
    (originalFilters.ingredients.searchTerm.length &&
      originalFilters.ingredients.searchMode !== currentFilters.ingredients.searchMode)
  if (ingredientsHaveChanged) return true

  return false
}
