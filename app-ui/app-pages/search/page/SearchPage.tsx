import { useContext, useEffect } from 'react'
import { ApiServiceContext } from '../../../api-service/ApiServiceProvider'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import RegularTopShowOrHideView from '../../../layout/views/RegularTopShowOrHideView'
import SplitView from '../../../layout/views/SplitView'
import { Page } from '../../../navigation/page-paths'
import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import RecipeWidgets from '../recipe-widgets/RecipeWidgets'
import FilteringProvider from '../search-management/FilteringProvider'
import SearchManagement from '../search-management/SearchManagement'
import { RecipesViewingContext } from '../search-management/SearchRecipesProvider'

/**
 * This page displays the actual recipes and viewing management "tools" with which the user
 * can manage what is displayed in the UI. For example, the user can manage the displayed recipes to
 * present the recipes in different modes (as cards with large images, as cards with main details or
 * simply as plain titles), pick recipes and select whether to view a list of the picked recipes,
 * and set filters. If the window width is large enough, the view management "tools" are displayed
 * on the left (UI is a "split view").
 */
const SearchPage = () => {
  const { isSplitView } = useContext(ViewSizeContext)
  const { someFeatureIsToggled, showFiltering, showRecipes, mode, favoriteRecipeIds } =
    useContext(RecipesViewingContext)
  const { fetchAllPublicAndUsersOwnRecipes } = useContext(ApiServiceContext)
  const { state } = useContext(AppStateContext) as AppStateContextType

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only want to run this effect once
  useEffect(() => {
    fetchAllPublicAndUsersOwnRecipes()
  }, [])

  const searchPageTestId = `${Page.SEARCH}-page`
  const viewingManagement = <SearchManagement />
  const actualRecipes = showRecipes ? (
    <RecipeWidgets
      recipes={state.recipes}
      mode={mode}
      showBackground={true}
      canDragAndDrop={false}
      favoriteRecipeIds={favoriteRecipeIds}
    />
  ) : null

  return (
    <FilteringProvider>
      {isSplitView ? (
        <SplitView
          splitContent={viewingManagement}
          mainContent={actualRecipes}
          hideSplit={!someFeatureIsToggled}
          testId={searchPageTestId}
        />
      ) : (
        <RegularTopShowOrHideView
          topShowOrHideContent={viewingManagement}
          mainContent={actualRecipes}
          showFullHeightTools={showFiltering}
          testId={searchPageTestId}
        />
      )}
    </FilteringProvider>
  )
}

export default SearchPage
