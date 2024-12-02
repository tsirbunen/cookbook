/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import { toolsElementId } from '../../../widgets/header-with-optional-toggles/HeaderWithToggles'
import PickedRecipesManagementTool from './PickedRecipesManagementTool'
import ViewModeManagementTool from './ViewModeManagementTool'


import { SPLIT_VIEW_WIDTH } from '../../../constants/layout'
import FilteringManagementTool from './FilteringManagementTool'
import RecipesViewingHeaderToggles from './SearchRecipesHeaderToggles'
import { RecipesViewingContext } from './SearchRecipesProvider'

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