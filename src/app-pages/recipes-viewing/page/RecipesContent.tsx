/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { ViewSizeContext } from '../../../app-layout/ViewSizeProvider'
import { css } from '@emotion/react'
import React from 'react'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { ViewRecipesMode } from '../viewing-management/ViewModeManagementTool'
import ScrollToTopButton from '../../../widgets/scroll-to-top-button/ScrollToTopButton'
import { AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { Dispatch } from '../../../state/reducer'
import { RecipesViewingContext } from './RecipesViewingProvider'
import { navBarWidth, noCategoryTitle } from '../../../constants/constants'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import RecipesDisplay from '../recipes-display/RecipesDisplay'

export type RecipesViewElementProps = {
  recipes: Recipe[]
  onPickRecipeChanged: (recipeId: number, category: string) => void
  pickedRecipeIdsByCategory: Record<string, number[]>
}

export const maxSummaryWidth = 700 - navBarWidth - 50

const RecipesContent = () => {
  const { isMobile } = useContext(ViewSizeContext)
  const { showRecipes, mode } = useContext(RecipesViewingContext)
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  const onPickRecipeChanged = (recipeId: number, category: string) => {
    dispatch({ type: Dispatch.UPDATE_PICKED_RECIPE_IDS, payload: { recipeId, category } })
  }

  if (!showRecipes) {
    return null
  }

  const recipesInCategories = state.recipes

  return (
    <div css={outerCss(isMobile, mode === ViewRecipesMode.PHOTOS)}>
      {recipesInCategories.map((recipeCategory) => {
        const title = recipeCategory.category.toUpperCase()
        const category = recipeCategory.category ?? noCategoryTitle
        const pickedRecipeIds = state.pickedRecipeIdsByCategory[category] ?? []

        return (
          <React.Fragment key={`recipe-category-${title}`}>
            <Title title={title} variant={TitleVariant.MediumLeft} />

            <RecipesDisplay
              recipes={recipeCategory.recipes}
              onPickRecipeChanged={onPickRecipeChanged}
              mode={mode}
              isMobile={isMobile}
              showBackground={true}
              pickedRecipeIds={pickedRecipeIds}
            />
          </React.Fragment>
        )
      })}
      <ScrollToTopButton />
    </div>
  )
}

export default RecipesContent

const outerCss = (isMobile: boolean, isPhotos: boolean) => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: ${isMobile ? 'center' : 'start'};
    width: 100%;
    padding-left: 10px;
    padding-right: ${!isPhotos ? 10 : 0}px;
  `
}
