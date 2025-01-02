'use client'

import { createContext, useState } from 'react'
import { ViewRecipesMode } from '../tools/ViewModeTool'

type RecipesSearch = {
  mode: ViewRecipesMode
  recipesAreHidden: boolean
  setMode: (newMode: ViewRecipesMode) => void
  showFiltering: boolean
  showPickedRecipes: boolean
  showSelectMode: boolean
  someFeatureIsToggled: boolean
  toggleHideRecipes: () => void
  toggleShowFiltering: () => void
  toggleShowPickedRecipes: () => void
  toggleShowSelectMode: () => void
}

export const SearchToolsContext = createContext<RecipesSearch>({} as RecipesSearch)

/**
 * This provider holds the state of what is displayed on the recipes viewing page:
 * what viewing management "tools" are displayed (if any) and if recipes are shown
 * and in what mode (with what kind of styling).
 */
const SearchToolsProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState(ViewRecipesMode.PHOTOS)
  const [recipesAreHidden, setRecipesAreHidden] = useState(false)
  const [showSelectMode, setShowSelectMode] = useState(false)
  const [showPickedRecipes, setShowPickedRecipes] = useState(false)
  const [showFiltering, setShowFiltering] = useState(false)

  const toggleShowSelectMode = () => setShowSelectMode((previous) => !previous)
  const toggleHideRecipes = () => setRecipesAreHidden((previous) => !previous)
  const toggleShowPickedRecipes = () => setShowPickedRecipes((previous) => !previous)
  const toggleShowFiltering = () => setShowFiltering((previous) => !previous)

  const someFeatureIsToggled = showSelectMode || showPickedRecipes || showFiltering

  return (
    <SearchToolsContext.Provider
      value={{
        mode,
        recipesAreHidden,
        setMode,
        showFiltering,
        showPickedRecipes,
        showSelectMode,
        someFeatureIsToggled,
        toggleHideRecipes,
        toggleShowFiltering,
        toggleShowPickedRecipes,
        toggleShowSelectMode
      }}
    >
      {children}
    </SearchToolsContext.Provider>
  )
}

export default SearchToolsProvider
