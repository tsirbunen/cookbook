import { useContext, useEffect } from 'react'
import { ApiServiceContext } from '../../../api-service/ApiServiceProvider'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import RegularTopShowOrHideView from '../../../layout/views/RegularTopShowOrHideView'
import SplitView from '../../../layout/views/SplitView'
import { Page } from '../../../navigation/page-paths'
import FilteringProvider from '../search-management/FilteringProvider'
import RecipesContent from '../search-management/RecipesContent'
import SearchManagement from '../search-management/SearchManagement'
import { RecipesViewingContext } from '../search-management/SearchRecipesProvider'

/**
 * This page displays the actual recipes and viewing management "tools" with which the user
 * can manage what is displayed in the UI. For example, the user can manage the displayed recipes to
 * present the recipes in different modes (as cards with large images, as cards with main details or
 * as simply as plain titles), pick recipes and select whether to view a list of the picked recipes,
 * and set filters. If the window width is large enough, the view management "tools" are displayed
 * on the left.
 */
const SearchRecipesPage = () => {
  const { isSplitView } = useContext(ViewSizeContext)
  const { someFeatureIsToggled, showFiltering } = useContext(RecipesViewingContext)
  const { fetchAllPublicAndUsersOwnRecipes } = useContext(ApiServiceContext)

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only want to run this effect once
  useEffect(() => {
    fetchAllPublicAndUsersOwnRecipes()
  }, [])

  const searchPageTestId = `${Page.SEARCH}-page`
  const viewingManagement = <SearchManagement />
  const actualRecipes = <RecipesContent />

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

export default SearchRecipesPage
