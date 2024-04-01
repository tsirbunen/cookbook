'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import { ViewRecipesMode } from '../viewing-management/ViewModeManagementTool'
import { LocalStorageKeys, useLocalStorage } from '../../../hooks/useLocalStorage'

type RecipesViewing = {
  mode: ViewRecipesMode
  setMode: (newMode: ViewRecipesMode) => void
  showRecipes: boolean
  recipesAreHidden: boolean
  toggleHideRecipes: () => void
  showSelectMode: boolean
  toggleShowSelectMode: () => void
  showPickedRecipes: boolean
  toggleShowPickedRecipes: () => void
  showFiltering: boolean
  toggleShowFiltering: () => void
  someFeatureIsToggled: boolean
  favoriteRecipeIds: number[]
  toggleFavoriteRecipeId: (recipeId: number) => void
}

export const RecipesViewingContext = createContext<RecipesViewing>({} as RecipesViewing)

// FAVORITE_RECIPE_IDS_LOCAL_STORAGE_KEY

/**
 * This provider holds the state of what is displayed on the recipes viewing page:
 * what viewing management "tools" are displayed (if any) and if recipes are shown
 * and in what mode (with what kind of styling).
 */
const RecipesViewingProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSplitView } = useContext(ViewSizeContext)
  const { favoriteRecipeIds, toggleValueForKey } = useLocalStorage()
  const [mode, setMode] = useState(ViewRecipesMode.PHOTOS)
  const [recipesAreHidden, setRecipesAreHidden] = useState(false)
  const [showSelectMode, setShowSelectMode] = useState(false)
  const [showPickedRecipes, setShowPickedRecipes] = useState(false)
  const [showFiltering, setShowFiltering] = useState(false)

  const toggleShowSelectMode = () => setShowSelectMode((previous) => !previous)
  const toggleHideRecipes = () => setRecipesAreHidden((previous) => !previous)
  const toggleShowPickedRecipes = () => setShowPickedRecipes((previous) => !previous)
  const toggleShowFiltering = () => setShowFiltering((previous) => !previous)
  const toggleFavoriteRecipeId = (recipeId: number) => toggleValueForKey(LocalStorageKeys.FAVORITE_RECIPE_IDS, recipeId)

  const showRecipes = isSplitView || !recipesAreHidden
  const someFeatureIsToggled = showSelectMode || showPickedRecipes || showFiltering

  return (
    <RecipesViewingContext.Provider
      value={{
        showRecipes,
        mode,
        toggleHideRecipes,
        recipesAreHidden,
        showSelectMode,
        toggleShowSelectMode,
        setMode,
        showPickedRecipes,
        toggleShowPickedRecipes,
        showFiltering,
        toggleShowFiltering,
        someFeatureIsToggled,
        favoriteRecipeIds,
        toggleFavoriteRecipeId
      }}
    >
      {children}
    </RecipesViewingContext.Provider>
  )
}

export default RecipesViewingProvider
