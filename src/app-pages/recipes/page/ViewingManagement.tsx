/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { css } from '@emotion/react'
import ViewModeManagementTool from '../viewing-management/ViewModeManagementTool'
import { RecipesViewingContext } from './RecipesViewingProvider'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import PickedRecipesManagementTool from '../viewing-management/PickedRecipesManagementTool'
import { createPortal } from 'react-dom'
import { toolsElementId } from '../../../widgets/header-with-optional-toggles/HeaderWithToggles'

import { SPLIT_VIEW_WIDTH } from '../../../constants/layout'
import RecipesViewingHeaderToggles from '../viewing-management/RecipesViewingHeaderToggles'
import FilteringManagementTool from '../viewing-management/FilteringManagementTool'

const ViewingManagement = () => {
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

export default ViewingManagement

const slitViewCss = (someFeatureIsToggled: boolean) => css`
  width: ${someFeatureIsToggled ? `${SPLIT_VIEW_WIDTH}` : '0'}px;
`

const boxCss = (showFiltering: boolean) => css`
  height: ${showFiltering ? '100%' : undefined};
  padding-left: 10px;
`
