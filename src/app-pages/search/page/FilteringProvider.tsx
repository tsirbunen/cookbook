import { createContext, useContext, useState } from 'react'
import { ApiServiceContext } from '../../../api-service/ApiServiceProvider'
import { AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { SearchMode, TextAreaSearchValues } from '../../../widgets/form-textarea-search/FormTextAreaSearch'
import { xor } from 'lodash'
import { FilterableRecipeProperty } from '../../../types/types'
import { FormButtonsSelectorValue } from '../../../widgets/form-buttons-selector/FormButtonsSelector'

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
  filtersHaveChanges: () => boolean
  appliedFiltersCount: number
  updateLocalFilters: (newValues: RecipesFilterValues) => void
  hasStoredFilters: boolean
}

export const FiltersContext = createContext<RecipesFiltering>({} as RecipesFiltering)
const defaultSearchMode = SearchMode.OR

const FilteringProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useContext(AppStateContext) as AppStateContextType
  const { filterRecipes } = useContext(ApiServiceContext)
  const [filterValues, setFilterValues] = useState<RecipesFilterValues>(state.filters)

  const updateLocalFilters = (newValues: RecipesFilterValues) => {
    setFilterValues(newValues)
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
  }

  const clearFilters = () => {
    setFilterValues(getEmptyFilterValues())
  }

  const filtersHaveChanges = () => {
    const appliedFilters = state.filters

    const languagesHaveChanged = xor(appliedFilters.languages, filterValues.languages).length > 0
    if (languagesHaveChanged) return true

    const tagsHaveChanged = xor(appliedFilters.tags, filterValues.tags).length > 0
    if (tagsHaveChanged) return true

    const ingredientsHaveChanged =
      appliedFilters.ingredients.searchTerm !== filterValues.ingredients.searchTerm ||
      (appliedFilters.ingredients.searchTerm.length &&
        appliedFilters.ingredients.searchMode !== filterValues.ingredients.searchMode)
    if (ingredientsHaveChanged) return true

    return false
  }

  const appliedFiltersCount = getAppliedFiltersCount()
  const initialValues = { ...state.filters }

  return (
    <FiltersContext.Provider
      value={{
        languages: state.languages.map((language) => language.language),
        tags: state.tags.map((tag) => tag.tag),
        initialValues,
        applyFilters,
        appliedFiltersCount,
        clearFilters,
        filtersHaveValues: () => filtersHaveValues(filterValues),
        filtersHaveChanges,
        updateLocalFilters,
        hasStoredFilters: filtersHaveValues(state.filters)
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export default FilteringProvider

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
