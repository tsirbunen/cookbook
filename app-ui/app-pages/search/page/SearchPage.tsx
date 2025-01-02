import { useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ApiServiceContext } from '../../../api-service/ApiServiceProvider'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import RegularTopShowOrHideView from '../../../layout/views/RegularTopShowOrHideView'
import SplitView from '../../../layout/views/SplitView'
import { Page } from '../../../navigation/page-paths'
import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import { toolsElementId } from '../../../widgets/header-with-optional-toggles/HeaderWithToggles'
import SearchFilterProvider from '../state/SearchFilterProvider'
import { SearchToolsContext } from '../state/SearchToolsProvider'
import SearchTools from '../tools/SearchTools'
import Widgets from '../widgets/Widgets'
import SearchPageHeaderToggles from './SearchPageHeaderToggles'

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
  const { showSelectMode, showPickedRecipes, someFeatureIsToggled, recipesAreHidden, showFiltering, mode } =
    useContext(SearchToolsContext)
  const { fetchAllPublicAndUsersOwnRecipes } = useContext(ApiServiceContext)
  const { state } = useContext(AppStateContext) as AppStateContextType

  const toolsPortalDomNode = document.getElementById(toolsElementId)
  const showRecipes = isSplitView || !recipesAreHidden

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only want to run this effect once
  useEffect(() => {
    fetchAllPublicAndUsersOwnRecipes()
  }, [])

  const searchTools = (
    <SearchTools
      someFeatureIsToggled={someFeatureIsToggled}
      showFiltering={showFiltering}
      showSelectMode={showSelectMode}
      showPickedRecipes={showPickedRecipes}
      isSplitView={isSplitView}
    />
  )

  const actualRecipes = (
    <Widgets recipes={showRecipes ? state.recipes : []} mode={mode} showBackground={true} canDragAndDrop={false} />
  )

  return (
    <SearchFilterProvider>
      {toolsPortalDomNode ? createPortal(<SearchPageHeaderToggles />, toolsPortalDomNode) : null}

      {isSplitView ? (
        <SplitView
          splitContent={searchTools}
          mainContent={actualRecipes}
          hideSplit={!someFeatureIsToggled}
          testId={`${Page.SEARCH}-page`}
        />
      ) : (
        <RegularTopShowOrHideView
          topShowOrHideContent={searchTools}
          mainContent={actualRecipes}
          showFullHeightTools={showFiltering}
          testId={`${Page.SEARCH}-page`}
        />
      )}
    </SearchFilterProvider>
  )
}

export default SearchPage
