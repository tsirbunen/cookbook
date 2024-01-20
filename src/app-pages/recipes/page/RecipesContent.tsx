/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { ViewSizeContext, navBarWidth } from '../../../app-layout/ViewSizeProvider'
import { css } from '@emotion/react'
import RecipesPhotoCardsView from '../recipe-photo-cards/RecipePhotoCardsView'
import { cardsViewMobileWidth } from '../recipe-photo-cards/RecipePhotoCard'
import RecipesSummariesView, { maxSummaryWidth } from '../recipe-summaries/RecipesSummariesView'
import RecipesTitlesView from '../recipe-titles/RecipesTitlesView'
import { RecipeServiceContext } from '../../../recipes-service/RecipeServiceProvider'
import { ColorCodes } from '../../../theme/theme'
import React from 'react'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { ViewRecipesMode } from '../view-mode-manager/ViewModeManager'
import ScrollToTopButton from '../../../components/scroll-to-top-button/ScrollToTopButton'

export type RecipesViewElementProps = {
  recipes: Recipe[]
  onPickRecipeChanged: (recipeId: number, category: string) => void
  pickedRecipeIdsByCategory: Record<string, number[]>
}

type RecipesContentProps = {
  mode: ViewRecipesMode
}

const recipesViewElementsByMode = {
  PHOTOS: RecipesPhotoCardsView,
  SUMMARIES: RecipesSummariesView,
  TITLES: RecipesTitlesView
}

const RecipesContent = ({ mode }: RecipesContentProps) => {
  const { isMobile, windowWidth } = useContext(ViewSizeContext)
  const { filteredRecipesInCategories, pickedRecipeIdsByCategory, updatePickedRecipes } =
    useContext(RecipeServiceContext)

  const RecipesViewElement = recipesViewElementsByMode[mode]

  return (
    <div css={contentContainer(isMobile, windowWidth.current - navBarWidth, mode === ViewRecipesMode.SUMMARIES)}>
      {filteredRecipesInCategories.map((recipeCategory) => {
        return (
          <React.Fragment key={`recipe-category-${recipeCategory.category}`}>
            <div css={categoryTitle}>{recipeCategory.category.toUpperCase()}</div>

            <RecipesViewElement
              recipes={recipeCategory.recipes}
              onPickRecipeChanged={updatePickedRecipes}
              pickedRecipeIdsByCategory={pickedRecipeIdsByCategory}
            />
          </React.Fragment>
        )
      })}
      <ScrollToTopButton />
    </div>
  )
}

export default RecipesContent

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
    margin-top: ${isMobile ? 10 : 15}px;
    max-width: ${maxWidth}px;
  `
}
