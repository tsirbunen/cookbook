import { RecipesViewingContext } from '../SearchRecipesProvider'
import { LocalStorageMock } from '../../../../state/__tests__/local-storage-mock'
import { useContext } from 'react'
import { ViewRecipesMode } from '../../search-management/ViewModeManagementTool'

global.localStorage = new LocalStorageMock()

export const SHOW_RECIPES = 'SHOW_RECIPES'
export const MODE = 'MODE'
export const RECIPES_ARE_HIDDEN = 'RECIPES_ARE_HIDDEN'
export const SHOW_SELECT_MODE = 'SHOW_SELECT_MODE'
export const SHOW_PICKED_RECIPES = 'SHOW_PICKED_RECIPES'
export const SHOW_FILTERING = 'SHOW_FILTERING'
export const SOME_FEATURE_IS_TOGGLED = 'SOME_FEATURE_IS_TOGGLED'
export const FAVORITE_RECIPE_IDS = 'FAVORITE_RECIPE_IDS'
export const TOGGLE_HIDE_RECIPES = 'TOGGLE_HIDE_RECIPES'
export const TOGGLE_SHOW_SELECT_MODE = 'TOGGLE_SHOW_SELECT_MODE'
export const TOGGLE_SHOW_PICKED_RECIPES = 'TOGGLE_SHOW_PICKED_RECIPES'
export const TOGGLE_SHOW_FILTERING = 'TOGGLE_SHOW_FILTERING'
export const SET_MODE_TO_TITLES = 'SET_MODE_TO_TITLES'
export const TOGGLE_FAVORITE_RECIPE_ID = 'TOGGLE_FAVORITE_RECIPE_ID'

const SearchRecipesProviderTestUser = () => {
  const {
    showRecipes,
    mode,
    recipesAreHidden,
    showSelectMode,
    showPickedRecipes,
    showFiltering,
    someFeatureIsToggled,
    favoriteRecipeIds,
    toggleHideRecipes,
    toggleShowSelectMode,
    setMode,
    toggleShowPickedRecipes,
    toggleShowFiltering,
    toggleFavoriteRecipeId
  } = useContext(RecipesViewingContext)

  return (
    <div>
      <div>{`${SHOW_RECIPES}-${showRecipes ? 'true' : 'false'}`}</div>
      <div>{`${MODE}-${mode}`}</div>
      <div>{`${RECIPES_ARE_HIDDEN}-${recipesAreHidden ? 'true' : 'false'}`}</div>
      <div>{`${SHOW_SELECT_MODE}-${showSelectMode ? 'true' : 'false'}`}</div>
      <div>{`${SHOW_PICKED_RECIPES}-${showPickedRecipes ? 'true' : 'false'}`}</div>
      <div>{`${SHOW_FILTERING}-${showFiltering ? 'true' : 'false'}`}</div>
      <div>{`${SOME_FEATURE_IS_TOGGLED}-${someFeatureIsToggled ? 'true' : 'false'}`}</div>
      <div>{`${FAVORITE_RECIPE_IDS}-${favoriteRecipeIds.join(',')}`}</div>
      <button onClick={toggleHideRecipes}>{TOGGLE_HIDE_RECIPES}</button>
      <button onClick={toggleShowSelectMode}>{TOGGLE_SHOW_SELECT_MODE}</button>
      <button onClick={toggleShowPickedRecipes}>{TOGGLE_SHOW_PICKED_RECIPES}</button>
      <button onClick={toggleShowFiltering}>{TOGGLE_SHOW_FILTERING}</button>
      <button onClick={() => setMode(ViewRecipesMode.TITLES)}>{SET_MODE_TO_TITLES}</button>
      <button onClick={() => toggleFavoriteRecipeId(1)}>{TOGGLE_FAVORITE_RECIPE_ID}</button>
    </div>
  )
}

export default SearchRecipesProviderTestUser
