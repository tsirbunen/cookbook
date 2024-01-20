/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import RecipeSummary from './RecipeSummary'
import { navBarWidth } from '../../../app-layout/ViewSizeProvider'
import { noCategory } from '../../../recipes-service/useRecipeApi'
import { RecipesViewElementProps } from '../page/RecipesContent'

const RecipesSummariesView = ({ recipes, onPickRecipeChanged, pickedRecipeIdsByCategory }: RecipesViewElementProps) => {
  return (
    <div css={container}>
      {recipes.map((recipe) => {
        const category = recipe.category ?? noCategory
        const recipesPickedInCategory = pickedRecipeIdsByCategory[category] ?? []
        const isPicked = recipesPickedInCategory.includes(recipe.id)

        return (
          <RecipeSummary
            key={`summary-${recipe.id}`}
            recipe={recipe}
            onPickRecipeChanged={() => onPickRecipeChanged(recipe.id, recipe.category ?? noCategory)}
            isPicked={isPicked}
          />
        )
      })}
    </div>
  )
}

export default RecipesSummariesView

export const maxSummaryWidth = 700 - navBarWidth - 50

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  max-width: ${700 - navBarWidth - 50}px;
`
