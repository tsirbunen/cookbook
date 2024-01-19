/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react'
import { ViewSizeContext, navBarWidth } from '../../app-layout/ViewSizeProvider'
import { css } from '@emotion/react'
import ViewModeManager from './view-mode-manager/ViewModeManager'
import RecipesPhotoCardsView from './recipe-photo-cards/RecipePhotoCardsView'
import { cardsViewMobileWidth } from './recipe-photo-cards/RecipePhotoCard'
import RecipesSummariesView, { maxSummaryWidth } from './recipe-summaries/RecipesSummariesView'
import RecipesTitlesView from './recipe-titles/RecipesTitlesView'
import { RecipeServiceContext } from '../../recipes-service/RecipeServiceProvider'
import PickRecipeManager from './pick-recipe-manager/PickRecipeManager'
import { ColorCodes } from '../../theme/theme'
import React from 'react'
import { Recipe } from '../../types/graphql-schema-types.generated'

export enum ViewRecipesMode {
  PHOTOS = 'PHOTOS',
  SUMMARIES = 'SUMMARIES',
  TITLES = 'TITLES'
}

const RecipesPage = () => {
  const { isMobile, windowWidth } = useContext(ViewSizeContext)
  const { filteredRecipesInCategories, pickedRecipeIdsByCategory, updatePickedRecipes } =
    useContext(RecipeServiceContext)
  const [mode, setMode] = useState(ViewRecipesMode.PHOTOS)

  const selectMode = (newMode: ViewRecipesMode) => {
    setMode(newMode)
  }

  const pickedRecipes = filteredRecipesInCategories
    .map((recipeCategory) => {
      if (pickedRecipeIdsByCategory[recipeCategory.category]) {
        const pickedIdsInCategory = pickedRecipeIdsByCategory[recipeCategory.category]
        return recipeCategory.recipes.filter((r) => pickedIdsInCategory.includes(r.id))
      }
    })
    .flat()
    .filter(Boolean) as Recipe[]

  return (
    <div css={outerContainer(isMobile, windowWidth.current - navBarWidth, mode === ViewRecipesMode.SUMMARIES)}>
      <div css={innerContainer(isMobile)}>
        <div css={toolsContainer(isMobile)}>
          <ViewModeManager currentMode={mode} selectMode={selectMode} />
          <PickRecipeManager pickedRecipes={pickedRecipes} onPickRecipeChanged={updatePickedRecipes} />
        </div>

        <div css={contentContainer(isMobile, windowWidth.current - navBarWidth, mode === ViewRecipesMode.SUMMARIES)}>
          {filteredRecipesInCategories.map((recipeCategory) => {
            return (
              <React.Fragment key={`recipe-category-${recipeCategory.category}`}>
                <div css={categoryTitle}>{recipeCategory.category.toUpperCase()}</div>
                {mode === ViewRecipesMode.PHOTOS ? (
                  <RecipesPhotoCardsView
                    recipes={recipeCategory.recipes}
                    onPickRecipeChanged={updatePickedRecipes}
                    pickedRecipeIdsByCategory={pickedRecipeIdsByCategory}
                  />
                ) : null}

                {mode === ViewRecipesMode.SUMMARIES ? (
                  <RecipesSummariesView
                    recipes={recipeCategory.recipes}
                    onPickRecipeChanged={updatePickedRecipes}
                    pickedRecipeIdsByCategory={pickedRecipeIdsByCategory}
                  />
                ) : null}

                {mode === ViewRecipesMode.TITLES ? (
                  <RecipesTitlesView
                    recipes={recipeCategory.recipes}
                    onPickRecipeChanged={updatePickedRecipes}
                    pickedRecipeIdsByCategory={pickedRecipeIdsByCategory}
                  />
                ) : null}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RecipesPage

const categoryTitle = css`
  font-weight: bold;
  color: ${ColorCodes.VERY_DARK};
  margin: 10px 0px 5px 5px;
  width: 100%;
  justify-content: start;
`

const innerContainer = (isMobile: boolean) => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: ${isMobile ? 'center' : 'start'};
    width: 100%;
  `
}

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

const outerContainer = (isMobile: boolean, width: number, isSummaryMode: boolean) => {
  const widthSubtraction = isSummaryMode ? 20 : 0
  return css`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: ${isMobile ? cardsViewMobileWidth - widthSubtraction : width - navBarWidth}px;
  `
}

const toolsContainer = (isMobile: boolean) => css`
  background-color: ${ColorCodes.VERY_PALE};
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  z-index: 20;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-left: ${isMobile ? '5px' : '10px'};
  padding-bottom: ${isMobile ? '0px' : '10px'};
  box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.24);
`
