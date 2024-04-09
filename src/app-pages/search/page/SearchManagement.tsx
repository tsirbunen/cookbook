/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { css } from '@emotion/react'
import ViewModeManagementTool from '../search-management/ViewModeManagementTool'
import { RecipesViewingContext } from './SearchRecipesProvider'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import PickedRecipesManagementTool from '../search-management/PickedRecipesManagementTool'
import { createPortal } from 'react-dom'
import { toolsElementId } from '../../../widgets/header-with-optional-toggles/HeaderWithToggles'

import { SPLIT_VIEW_WIDTH } from '../../../constants/layout'
import RecipesViewingHeaderToggles from '../search-management/SearchRecipesHeaderToggles'
import FilteringManagementTool from '../search-management/FilteringManagementTool'

const SearchManagement = () => {
  const { isSplitView } = useContext(ViewSizeContext)
  const { showSelectMode, showPickedRecipes, showFiltering, someFeatureIsToggled } = useContext(RecipesViewingContext)

  const innerCss = isSplitView ? slitViewCss(someFeatureIsToggled) : boxCss(showFiltering)
  const toolsPortalDomNode = document.getElementById(toolsElementId)

  return (
    <div css={innerCss}>
      {toolsPortalDomNode ? createPortal(<RecipesViewingHeaderToggles />, toolsPortalDomNode) : null}

      <div>
        {showSelectMode ? <ViewModeManagementTool /> : null}
        {showPickedRecipes ? <PickedRecipesManagementTool /> : null}
        {showFiltering ? <FilteringManagementTool /> : null}
      </div>
    </div>
  )
}

export default SearchManagement

const slitViewCss = (someFeatureIsToggled: boolean) => css`
  width: ${someFeatureIsToggled ? `${SPLIT_VIEW_WIDTH}` : '0'}px;
`

const boxCss = (showFiltering: boolean) => css`
  height: ${showFiltering ? '100%' : undefined};
  padding-left: 10px;
`
