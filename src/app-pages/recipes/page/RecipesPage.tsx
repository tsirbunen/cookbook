/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react'
import { ViewSizeContext, navBarWidth } from '../../../app-layout/ViewSizeProvider'
import { css } from '@emotion/react'
import { ViewRecipesMode } from '../view-mode-manager/ViewModeManager'
import { cardsViewMobileWidth } from '../recipe-photo-cards/RecipePhotoCard'
import RecipesContent from './RecipesContent'
import Tools from './Tools'

const splitViewBreakpoint = 1275

const RecipesPage = () => {
  const { isMobile, windowWidth } = useContext(ViewSizeContext)

  const [mode, setMode] = useState(ViewRecipesMode.PHOTOS)

  const isSummaryMode = mode === ViewRecipesMode.SUMMARIES
  const width = windowWidth.current - navBarWidth
  const isSplitView = width > splitViewBreakpoint

  return (
    <div css={page(isMobile, width, isSummaryMode)}>
      <div css={container(isMobile, isSplitView)}>
        <Tools mode={mode} setMode={setMode} isMobile={isMobile} isSplitView={isSplitView} />

        <RecipesContent mode={mode} />
      </div>
    </div>
  )
}

export default RecipesPage

const page = (isMobile: boolean, width: number, isSummaryMode: boolean) => {
  const widthSubtraction = isSummaryMode ? 20 : 0
  return css`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: start;
    align-items: ${isMobile ? 'center' : 'start'};
    width: ${isMobile ? cardsViewMobileWidth - widthSubtraction : width - navBarWidth}px;
  `
}

const container = (isMobile: boolean, isSplitView: boolean) => css`
  display: flex;
  flex: 1;
  flex-direction: ${isSplitView ? 'row' : 'column'};
  justify-content: start;
  align-items: ${isMobile ? 'center' : 'start'};
  width: 100%;
  height: 100%;
`
