/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { css } from '@emotion/react'
import React from 'react'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { ViewRecipesMode } from '../viewing-management/ViewModeManagementTool'
import ScrollToTopButton from '../../../widgets/scroll-to-top-button/ScrollToTopButton'
import { AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { Dispatch } from '../../../state/reducer'
import { RecipesViewingContext } from './RecipesViewingProvider'
import { NO_CATEGORY_TITLE } from '../../../constants/layout'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import RecipesDisplay from '../recipes-display/RecipesDisplay'

export const recipesContentDataTestId = 'recipes-content'

export type RecipesViewElementProps = {
  recipes: Recipe[]
  onPickRecipeChanged: (recipeId: number, category: string) => void
  pickedRecipeIdsByCategory: Record<string, number[]>
}

const RecipesContent = () => {
  const { showRecipes, mode, favoriteRecipeIds } = useContext(RecipesViewingContext)
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  const onPickRecipeChanged = (recipeId: number, category: string) => {
    dispatch({ type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeId, category } })
  }

  const onRecipesOrderChanged = (newOrderOfIds: number[]) => {
    dispatch({ type: Dispatch.CHANGE_RECIPES_ORDER, payload: { newOrderOfIds } })
  }

  if (!showRecipes) {
    return null
  }

  const recipesInCategories = state.recipes

  return (
    <div css={outerCss(mode === ViewRecipesMode.PHOTOS)} data-testid={recipesContentDataTestId}>
      {recipesInCategories.map((recipeCategory) => {
        const title = recipeCategory.category.toUpperCase()
        const category = recipeCategory.category ?? NO_CATEGORY_TITLE
        const pickedRecipeIds = state.pickedRecipeIdsByCategory[category] ?? []

        return (
          <React.Fragment key={`recipe-category-${title}`}>
            <Title title={title} variant={TitleVariant.MediumLeft} />

            <RecipesDisplay
              recipes={recipeCategory.recipes}
              onPickRecipeChanged={onPickRecipeChanged}
              mode={mode}
              showBackground={true}
              pickedRecipeIds={pickedRecipeIds}
              canDragAndDrop={false}
              onChangedRecipeOrder={onRecipesOrderChanged}
              favoriteRecipeIds={favoriteRecipeIds}
            />
          </React.Fragment>
        )
      })}
      <ScrollToTopButton />
    </div>
  )
}

export default RecipesContent

const outerCss = (isPhotos: boolean) => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 100%;
    padding-left: 10px;
    padding-right: ${!isPhotos ? 10 : 0}px;
  `
}
