/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { css } from '@emotion/react'
import ViewModeManagementTool from '../viewing-management/ViewModeManagementTool'
import { ColorCodes } from '../../../theme/theme'
import { RecipesViewingContext } from './RecipesViewingProvider'
import { ViewSizeContext } from '../../../app-layout/ViewSizeProvider'
import PickedRecipesManagementTool from '../viewing-management/PickedRecipesManagementTool'
import { createPortal } from 'react-dom'
import { toolsElementId } from '../../../widgets/header-with-optional-toggles/HeaderWithOptionalToggles'
import { recipesViewingManagementZIndex } from '../../../constants/z-indexes'
import { splitViewWidth } from '../../../constants/constants'
import RecipesViewingHeaderToggles from '../viewing-management/RecipesViewingHeaderToggles'
import FilteringManagementTool from '../viewing-management/FilteringManagementTool'

const ViewingManagement = () => {
  const { isMobile, isSplitView, headerHeight } = useContext(ViewSizeContext)
  const { showSelectMode, showPickedRecipes, showFiltering } = useContext(RecipesViewingContext)

  const someFeatureIsToggled = showSelectMode || showPickedRecipes || showFiltering
  const innerCss = isSplitView ? slitViewCss(someFeatureIsToggled) : boxCss(isMobile, headerHeight, showFiltering)
  const toolsPortalDomNode = document.getElementById(toolsElementId)

  return (
    <div css={outerCss(someFeatureIsToggled, headerHeight, isSplitView, showFiltering)}>
      <div css={innerCss}>
        {toolsPortalDomNode ? createPortal(<RecipesViewingHeaderToggles />, toolsPortalDomNode) : null}

        <div css={toolsCss}>
          {showSelectMode ? <ViewModeManagementTool isMobile={isMobile} /> : null}

          {showPickedRecipes ? <PickedRecipesManagementTool isMobile={isMobile} /> : null}

          {showFiltering ? <FilteringManagementTool isMobile={isMobile} /> : null}
        </div>
      </div>
    </div>
  )
}

export default ViewingManagement

const outerCss = (
  someFeatureIsToggled: boolean,
  headerHeight: number,
  isSplitView: boolean,
  showFiltering: boolean
) => css`
  width: ${isSplitView ? undefined : '100%'};
  height: ${showFiltering || isSplitView ? '100%' : undefined};
  position: sticky;
  top: ${someFeatureIsToggled && !isSplitView ? headerHeight : 0}px;
  z-index: ${recipesViewingManagementZIndex};
  flex: ${showFiltering || isSplitView ? 1 : undefined};
`

const toolsCss = css`
  padding-right: 15px;
`

const slitViewCss = (someFeatureIsToggled: boolean) => css`
  background-color: ${ColorCodes.VERY_PALE};
  display: flex;
  flex: 1;
  flex-direction: column;
  flex: ${someFeatureIsToggled ? 1 : undefined};
  justify-content: start;
  height: 100%;
  width: ${someFeatureIsToggled ? `${splitViewWidth}` : '0'}px;
  padding-left: ${someFeatureIsToggled ? '10px' : '0px'};
  padding-bottom: 15px;
  overflow: scroll;
  overflow-x: hidden;
`

const boxCss = (isMobile: boolean, headerHeight: number, showFiltering: boolean) => css`
  position: sticky;
  top: ${headerHeight}px;
  z-index: ${recipesViewingManagementZIndex};
  background-color: ${ColorCodes.VERY_PALE};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-left: ${isMobile ? '5px' : '10px'};
  box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.24);
  height: ${showFiltering ? '100%' : undefined};
`
