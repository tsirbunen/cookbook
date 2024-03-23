import { useContext } from 'react'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import RecipesContent from './RecipesContent'
import ViewingManagement from './ViewingManagement'
import FilteringProvider from './FilteringProvider'
import SplitView from '../../../layout/views/SplitView'
import RegularTopShowOrHideView from '../../../layout/views/RegularTopShowOrHideView'

/**
 * This page displays the actual recipes and viewing management "tools" with which the user
 * can manage what is displayed in the UI. For example, the user can manage the displayed recipes to
 * present the recipes in different modes (as cards with large images, as cards with main details or
 * as simply as plain titles), pick recipes and select whether to view a list of the picked recipes,
 * and set filters. If the window width is large enough, the view management "tools" are displayed
 * on the left.
 */
const RecipesViewingPage = () => {
  const { isSplitView } = useContext(ViewSizeContext)

  const viewingManagement = <ViewingManagement />
  const actualRecipes = <RecipesContent />

  return (
    <FilteringProvider>
      {isSplitView ? (
        <SplitView splitContent={viewingManagement} mainContent={actualRecipes} />
      ) : (
        <RegularTopShowOrHideView topShowOrHideContent={viewingManagement} mainContent={actualRecipes} />
      )}
    </FilteringProvider>
  )
}

export default RecipesViewingPage
