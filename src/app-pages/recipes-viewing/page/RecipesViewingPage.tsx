/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useContext } from 'react'
import { ViewSizeContext } from '../../../app-layout/ViewSizeProvider'
import { ViewRecipesMode } from '../viewing-management/ViewModeManagementTool'
import { cardsViewMobileWidth } from '../recipes-display/PhotoCardRecipe'
import RecipesContent from './RecipesContent'
import ViewingManagement from './ViewingManagement'
import RecipesViewingProvider, { RecipesViewingContext } from './RecipesViewingProvider'
import FilteringProvider from './FilteringProvider'
import { navBarWidth } from '../../../constants/constants'

/**
 * This page displays the actual recipes and viewing management "tools" with which the user
 * can manage what is displayed in the UI. For example, the user can manage the displayed recipes to
 * present the recipes in different modes (as cards with large images, as cards with main details or
 * as simply as plain titles), pick recipes and select whether to view a list of the picked recipes,
 * and set filters. If the window width is large enough, the view management "tools" are displayed
 * on the left.
 */
const RecipesViewingPage = () => {
  const { windowWidth, isMobile, isSplitView, headerHeight } = useContext(ViewSizeContext)
  const { mode } = useContext(RecipesViewingContext)

  const isSummaryMode = mode === ViewRecipesMode.SUMMARIES
  const width = windowWidth.current - navBarWidth

  return (
    <RecipesViewingProvider>
      <FilteringProvider>
        <div css={outerCss(isSplitView)}>
          {isSplitView ? (
            <div css={scrollableCss(headerHeight)}>
              <ViewingManagement />

              <div css={preventOverflowCss}>
                <RecipesContent />
              </div>
            </div>
          ) : (
            <div css={page(isMobile, width, isSummaryMode, headerHeight)}>
              <div css={container(isMobile, isSplitView)}>
                <ViewingManagement />
                <RecipesContent />
              </div>
            </div>
          )}
        </div>
      </FilteringProvider>
    </RecipesViewingProvider>
  )
}

export default RecipesViewingPage

const outerCss = (isSplitView: boolean) => css`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: ${isSplitView ? 'column' : 'row'};
  overflow-x: hidden;
`

const preventOverflowCss = css`
  width: 100%;
  overflow-x: hidden;
`

const scrollableCss = (headerHeight: number) => css`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 100%;
  overflow: scroll;
  margin-top: ${headerHeight}px;
  overflow-x: hidden;
`

const page = (isMobile: boolean, width: number, isSummaryMode: boolean, headerHeight: number) => {
  const widthSubtraction = isSummaryMode ? 20 : 0

  return css`
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: ${isMobile ? 'center' : 'start'};
    width: ${isMobile ? cardsViewMobileWidth - widthSubtraction : width - navBarWidth}px;
    margin-top: ${headerHeight}px;
  `
}

const container = (isMobile: boolean, isSplitView: boolean) => css`
  display: flex;
  flex: 1;
  flex-direction: ${isSplitView ? 'row' : 'column'};
  justify-content: start;
  align-items: ${isMobile ? 'center' : 'start'};
  width: 100%;
`
