import { SearchToolsContext } from '../app-pages/search/state/SearchToolsProvider'
import { ViewRecipesMode } from '../app-pages/search/tools/ViewModeTool'

const TestSearchRecipesProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchToolsContext.Provider
      value={{
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
        someFeatureIsToggled: true
      }}
    >
      {children}
    </SearchToolsContext.Provider>
  )
}

export default TestSearchRecipesProvider
