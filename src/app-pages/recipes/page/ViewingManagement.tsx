/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { css } from '@emotion/react'
import ViewModeManagementTool from '../viewing-management/ViewModeManagementTool'
import { RecipesViewingContext } from './RecipesViewingProvider'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import PickedRecipesManagementTool from '../viewing-management/PickedRecipesManagementTool'
import { createPortal } from 'react-dom'
import { toolsElementId } from '../../../widgets/header-with-optional-toggles/HeaderWithOptionalToggles'

import { splitViewWidth } from '../../../constants/constants'
import RecipesViewingHeaderToggles from '../viewing-management/RecipesViewingHeaderToggles'
import FilteringManagementTool from '../viewing-management/FilteringManagementTool'

const ViewingManagement = () => {
  const { isMobile, isSplitView } = useContext(ViewSizeContext)
  const { showSelectMode, showPickedRecipes, showFiltering, someFeatureIsToggled } = useContext(RecipesViewingContext)

  const innerCss = isSplitView ? slitViewCss(someFeatureIsToggled) : boxCss(isMobile, showFiltering)
  const toolsPortalDomNode = document.getElementById(toolsElementId)

  return (
    <div css={innerCss}>
      {toolsPortalDomNode ? createPortal(<RecipesViewingHeaderToggles />, toolsPortalDomNode) : null}

      <div css={toolsCss}>
        {showSelectMode ? <ViewModeManagementTool isMobile={isMobile} /> : null}
        {showPickedRecipes ? <PickedRecipesManagementTool isMobile={isMobile} /> : null}
        {showFiltering ? <FilteringManagementTool isMobile={isMobile} /> : null}
      </div>
    </div>
  )
}

export default ViewingManagement

const toolsCss = css`
  padding-right: 15px;
`

const slitViewCss = (someFeatureIsToggled: boolean) => css`
  width: ${someFeatureIsToggled ? `${splitViewWidth}` : '0'}px;
`

const boxCss = (isMobile: boolean, showFiltering: boolean) => css`
  height: ${showFiltering ? '100%' : undefined};
  padding-left: ${isMobile ? '5px' : '10px'};
`
