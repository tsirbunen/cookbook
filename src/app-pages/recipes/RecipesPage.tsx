/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react'
import { ViewSizeContext, navBarWidth } from '../../app-layout/ViewSizeProvider'
import { css } from '@emotion/react'
import SelectRecipesViewMode from './SelectRecipesViewMode'
import RecipesPhotoCardsView from './photo-cards/RecipePhotoCardsView'
import { cardsViewMobileWidth } from './photo-cards/RecipePhotoCard'
import RecipesSummariesView from './summaries/RecipesSummariesView'
import RecipesTitlesView from './titles/RecipesTitlesView'

export enum ViewRecipesMode {
  PHOTOS = 'PHOTOS',
  SUMMARIES = 'SUMMARIES',
  TITLES = 'TITLES'
}

const RecipesPage = () => {
  const { isMobile, windowWidth } = useContext(ViewSizeContext)
  const [mode, setMode] = useState(ViewRecipesMode.PHOTOS)

  const selectMode = (newMode: ViewRecipesMode) => {
    setMode(newMode)
  }

  return (
    <div css={outerContainer}>
      <div css={innerContainer(isMobile, windowWidth.current - navBarWidth)}>
        <SelectRecipesViewMode currentMode={mode} selectMode={selectMode} />
        {mode === ViewRecipesMode.PHOTOS ? <RecipesPhotoCardsView /> : null}
        {mode === ViewRecipesMode.SUMMARIES ? <RecipesSummariesView /> : null}
        {mode === ViewRecipesMode.TITLES ? <RecipesTitlesView /> : null}
      </div>
    </div>
  )
}

export default RecipesPage

const innerContainer = (isMobile: boolean, width: number) => css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: ${isMobile ? 'center' : 'start'};
  width: ${isMobile ? cardsViewMobileWidth : width}px;
  margin-left: ${isMobile ? 0 : 10}px;
`

const outerContainer = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`
