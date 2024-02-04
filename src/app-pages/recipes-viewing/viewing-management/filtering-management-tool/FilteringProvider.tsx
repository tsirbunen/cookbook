import { createContext, useContext, useState } from 'react'
import ButtonsFilter from './ButtonsFilter'
import SearchFilter from './SearchFilter'
import { RecipeServiceContext } from '../../../../recipes-service/RecipeServiceProvider'
import { AppStateContext, AppStateContextType } from '../../../../state/StateContextProvider'

export enum FilterableProperty {
  CATEGORY = 'CATEGORY',
  INGREDIENT = 'INGREDIENT'
}

export type PropertyFilterProps = {
  property: FilterableProperty
}

export type PropertyDefinitions = {
  property: FilterableProperty
  label: string
  options: string[]
  isMultiSelect: boolean
  FilterElement: ({ property }: PropertyFilterProps) => JSX.Element | React.ReactNode
}

export const propertyDefinitions = {
  [FilterableProperty.CATEGORY]: {
    property: FilterableProperty.CATEGORY,
    label: 'Categories',
    options: ['breakfast', 'lunch', 'dinner', 'brunch', 'snacks'],
    isMultiSelect: true,
    FilterElement: ButtonsFilter
  },
  [FilterableProperty.INGREDIENT]: {
    property: FilterableProperty.INGREDIENT,
    label: 'Ingredients',
    options: [],
    isMultiSelect: true,
    FilterElement: SearchFilter
  }
}

type Filters = {
  getDefinitions: (property: FilterableProperty) => PropertyDefinitions
  getFilters: (property: FilterableProperty) => string[]
  updateFilters: (property: FilterableProperty, values: string[]) => void
  applyFilters: () => void
  clearFilterAndApply: (property: FilterableProperty) => void
  clearAllFilters: () => void
  filtersHaveChanged: () => boolean
  selectedFiltersCount: number
}

export const FiltersContext = createContext<Filters>({} as Filters)

const FilteringProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useContext(AppStateContext) as AppStateContextType
  const { filterRecipes } = useContext(RecipeServiceContext)
  const [categories, setCategories] = useState<string[]>(state.filters[FilterableProperty.CATEGORY] ?? [])
  const [ingredients, setIngredients] = useState<string[]>(state.filters[FilterableProperty.INGREDIENT] ?? [])

  const getDefinitions = (property: FilterableProperty) => {
    return propertyDefinitions[property]
  }

  const getFilters = (property: FilterableProperty) => {
    switch (property) {
      case FilterableProperty.CATEGORY:
        return categories
      case FilterableProperty.INGREDIENT:
        return ingredients
      default:
        throw new Error('Property not filterable!')
    }
  }

  const updateFilters = (property: FilterableProperty, values: string[]) => {
    switch (property) {
      case FilterableProperty.CATEGORY:
        setCategories((previous) => {
          const isSelected = previous.includes(values[0])
          if (isSelected) return previous.filter((c) => c !== values[0])
          return [...previous, values[0]]
        })
        break
      case FilterableProperty.INGREDIENT:
        setIngredients(values)
        break
      default:
        throw new Error('Property not filterable!')
    }
  }

  const getSelectedFiltersCount = () => {
    const filterValues = [categories, ingredients]
    return filterValues.reduce((cumulated, value) => {
      const toAdd = value.length > 0 ? 1 : 0
      return cumulated + toAdd
    }, 0)
  }

  const applyFilters = () => {
    const filterCandidates: Record<FilterableProperty, string[]> = {
      [FilterableProperty.CATEGORY]: categories,
      [FilterableProperty.INGREDIENT]: ingredients
    }
    const filtersWithValue: Record<string, string[]> = {}
    Object.entries(filterCandidates).forEach(([property, value]) => {
      if (value.length) filtersWithValue[property] = value
    })
    filterRecipes(filtersWithValue)
  }

  const clearFilterAndApply = (propertyToClear: FilterableProperty) => {
    updateFilters(propertyToClear, [])

    const filterCandidates: Record<FilterableProperty, string[]> = {
      [FilterableProperty.CATEGORY]: categories,
      [FilterableProperty.INGREDIENT]: ingredients
    }
    const filtersWithValue: Record<string, string[]> = {}
    Object.entries(filterCandidates).forEach(([property, value]) => {
      if (property !== propertyToClear && value.length) filtersWithValue[property] = value
    })
    filterRecipes(filtersWithValue)
  }

  const clearAllFilters = () => {
    setCategories([])
    setIngredients([])
  }

  const filtersHaveChanged = () => {
    const filterCandidates: Record<FilterableProperty, string[]> = {
      [FilterableProperty.CATEGORY]: categories,
      [FilterableProperty.INGREDIENT]: ingredients
    }
    const hasChanged = Object.entries(filterCandidates).some(([property, value]) => {
      const savedValue = state.filters[property] ?? []
      savedValue.sort()
      const currentValue = value.toSorted()
      if (savedValue.length !== currentValue.length) return true
      return savedValue.some((item, index) => item !== currentValue[index])
    })
    return hasChanged
  }

  const selectedFiltersCount = getSelectedFiltersCount()

  return (
    <FiltersContext.Provider
      value={{
        getDefinitions,
        getFilters,
        updateFilters,
        clearFilterAndApply,
        applyFilters,
        selectedFiltersCount,
        clearAllFilters,
        filtersHaveChanged
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export default FilteringProvider
