/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { css } from '@emotion/react'
import ViewModeManagementTool from './view-mode-management-tool/ViewModeManagementTool'
import { ColorCodes } from '../../../theme/theme'
import ManagementToolToggles from './management-tool-toggles/ManagementToolToggles'
import { RecipesViewingContext } from '../page/RecipesViewingProvider'
import { ViewSizeContext } from '../../../app-layout/ViewSizeProvider'
import PickedRecipesManagementTool from './picked-recipes-management-tool/PickedRecipesManagementTool'
import FilteringManagementTool from './filtering-management-tool/FilteringManagementTool'
import { createPortal } from 'react-dom'
import { toolsElementId } from '../../../components/header-with-optional-tools/HeaderWithOptionalTools'
import { recipesViewingManagementZIndex } from '../../../constants/z-indexes'
import { splitViewWidth } from '../../../constants/constants'

export const maxToolWidth = 920

const ViewingManagement = () => {
  const { isMobile, isSplitView, headerHeight } = useContext(ViewSizeContext)
  const { toggleHideRecipes, showSelectMode, showPickedRecipes, showFiltering, toggleShowFiltering } =
    useContext(RecipesViewingContext)

  const someFeatureIsToggled = showSelectMode || showPickedRecipes || showFiltering
  const outerCss = isSplitView
    ? slitViewContainer(someFeatureIsToggled)
    : container(isMobile, headerHeight, showFiltering)
  const toolsPortalDomNode = document.getElementById(toolsElementId)

  return (
    <div css={boxCss(someFeatureIsToggled, headerHeight, isSplitView, showFiltering)}>
      <div css={outerCss}>
        {toolsPortalDomNode ? createPortal(<ManagementToolToggles />, toolsPortalDomNode) : null}

        {showSelectMode ? <ViewModeManagementTool /> : null}

        {showPickedRecipes ? <PickedRecipesManagementTool isMobile={isMobile} isSplitView={isSplitView} /> : null}

        {showFiltering ? (
          <FilteringManagementTool
            isMobile={isMobile}
            hideFiltering={() => {
              toggleShowFiltering()
              toggleHideRecipes()
            }}
            isSplitView={isSplitView}
          />
        ) : null}
      </div>
    </div>
  )
}

export default ViewingManagement

const boxCss = (
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

const slitViewContainer = (someFeatureIsToggled: boolean) => css`
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

const container = (isMobile: boolean, headerHeight: number, showFiltering: boolean) => css`
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
