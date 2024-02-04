/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useContext } from 'react'
import { ViewSizeContext } from '../../../app-layout/ViewSizeProvider'
import { ViewRecipesMode } from '../viewing-management/view-mode-management-tool/ViewModeManagementTool'
import { cardsViewMobileWidth } from '../recipes-display/recipe-photo-cards/RecipePhotoCard'
import RecipesDisplay from '../recipes-display/RecipesDisplay'
import ViewingManagement from '../viewing-management/ViewingManagement'
import RecipesViewingProvider, { RecipesViewingContext } from './RecipesViewingProvider'
import FilteringProvider from '../viewing-management/filtering-management-tool/FilteringProvider'
import { navBarWidth } from '../../../constants/constants'

const RecipesViewingPage = () => {
  const { windowWidth, isMobile, isSplitView, headerHeight } = useContext(ViewSizeContext)
  const { mode } = useContext(RecipesViewingContext)

  const isSummaryMode = mode === ViewRecipesMode.SUMMARIES
  const width = windowWidth.current - navBarWidth

  return (
    <RecipesViewingProvider>
      <FilteringProvider>
        {isSplitView ? (
          <div css={outerCss}>
            <div css={splitBoxCss(headerHeight)}>
              <ViewingManagement />

              <div css={scrollableRecipesCss}>
                <RecipesDisplay />
              </div>
            </div>
          </div>
        ) : (
          <div css={scrollableAllCss}>
            <div css={page(isMobile, width, isSummaryMode, headerHeight)}>
              <div css={container(isMobile, isSplitView)}>
                <ViewingManagement />
                <RecipesDisplay />
              </div>
            </div>
          </div>
        )}
      </FilteringProvider>
    </RecipesViewingProvider>
  )
}

export default RecipesViewingPage

const outerCss = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
`

const scrollableRecipesCss = css`
  width: 100%;
  overflow-x: hidden;
`

const scrollableAllCss = css`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex: 1;
  flex-direction: row;
`

const splitBoxCss = (headerHeight: number) => css`
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
