import { RecipesViewingContext } from '../app-pages/search/page/SearchRecipesProvider'
import { ViewRecipesMode } from '../app-pages/search/search-management/ViewModeManagementTool'

const TestSearchRecipesProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecipesViewingContext.Provider
      value={{
        showRecipes: true,
        mode: ViewRecipesMode.PHOTOS,
        toggleHideRecipes: () => {},
        recipesAreHidden: false,
        showSelectMode: false,
        toggleShowSelectMode: () => {},
        setMode: () => {},
        showPickedRecipes: false,
        toggleShowPickedRecipes: () => {},
        showFiltering: true,
        toggleShowFiltering: () => {},
        someFeatureIsToggled: true,
        favoriteRecipeIds: [],
        toggleFavoriteRecipeId: () => {}
      }}
    >
      {children}
    </RecipesViewingContext.Provider>
  )
}

export default TestSearchRecipesProvider
