/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { ViewSizeContext } from '../../../app-layout/ViewSizeProvider'
import { css } from '@emotion/react'
import RecipesPhotoCardsView from './recipe-photo-cards/RecipePhotoCardsView'
import { cardsViewMobileWidth } from './recipe-photo-cards/RecipePhotoCard'
import RecipesSummariesView, { maxSummaryWidth } from './recipe-summaries/RecipesSummariesView'
import RecipesTitlesView from './recipe-titles/RecipesTitlesView'
import { ColorCodes } from '../../../theme/theme'
import React from 'react'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { ViewRecipesMode } from '../viewing-management/view-mode-management-tool/ViewModeManagementTool'
import ScrollToTopButton from '../../../components/scroll-to-top-button/ScrollToTopButton'
import { AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { Dispatch } from '../../../state/reducer'
import { RecipesViewingContext } from '../page/RecipesViewingProvider'
import { navBarWidth, splitViewWidth } from '../../../constants/constants'

export type RecipesViewElementProps = {
  recipes: Recipe[]
  onPickRecipeChanged: (recipeId: number, category: string) => void
  pickedRecipeIdsByCategory: Record<string, number[]>
}

const recipesViewElementsByMode = {
  PHOTOS: RecipesPhotoCardsView,
  SUMMARIES: RecipesSummariesView,
  TITLES: RecipesTitlesView
}

const RecipesDisplay = () => {
  const { isMobile, windowWidth, isSplitView } = useContext(ViewSizeContext)
  const { showRecipes, mode } = useContext(RecipesViewingContext)
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  const onPickRecipeChanged = (recipeId: number, category: string) => {
    dispatch({ type: Dispatch.UPDATE_PICKED_RECIPE_IDS, payload: { recipeId, category } })
  }

  if (!showRecipes) {
    return null
  }

  const RecipesViewElement = recipesViewElementsByMode[mode]
  const filteredRecipesInCategories = state.recipes
  let width = windowWidth.current - navBarWidth
  if (isSplitView) width -= splitViewWidth

  return (
    <div css={contentContainer(isMobile, width, mode === ViewRecipesMode.SUMMARIES)}>
      {filteredRecipesInCategories.map((recipeCategory) => {
        return (
          <React.Fragment key={`recipe-category-${recipeCategory.category}`}>
            <div css={categoryTitle}>{recipeCategory.category.toUpperCase()}</div>

            <RecipesViewElement
              recipes={recipeCategory.recipes}
              onPickRecipeChanged={onPickRecipeChanged}
              pickedRecipeIdsByCategory={state.pickedRecipeIdsByCategory}
            />
          </React.Fragment>
        )
      })}
      <ScrollToTopButton />
    </div>
  )
}

export default RecipesDisplay

const categoryTitle = css`
  font-weight: bold;
  color: ${ColorCodes.VERY_DARK};
  margin: 10px 0px 5px 5px;
  width: 100%;

  justify-content: start;
`

const contentContainer = (isMobile: boolean, width: number, isSummaryMode: boolean) => {
  const widthSubtraction = isSummaryMode ? 20 : 0
  const maxWidthValue = maxSummaryWidth > width ? width : maxSummaryWidth
  const maxWidth = isSummaryMode ? `${maxWidthValue}px` : undefined
  const marginLeft = isMobile ? 0 : isSummaryMode ? 15 : 10

  return css`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: ${isMobile ? 'center' : 'start'};
    width: ${isMobile ? cardsViewMobileWidth - widthSubtraction : width - 30}px;
    margin-left: ${marginLeft}px;
    max-width: ${maxWidth}px;
  `
}
