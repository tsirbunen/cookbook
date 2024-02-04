/** @jsxImportSource @emotion/react */
import { noCategory } from '../../../../recipes-service/useRecipeApi'
import { RecipesViewElementProps } from '../RecipesDisplay'
import RecipeCard from './RecipePhotoCard'
import { css } from '@emotion/react'

const RecipesPhotoCardsView = ({
  recipes,
  onPickRecipeChanged,
  pickedRecipeIdsByCategory
}: RecipesViewElementProps) => {
  return (
    <div css={grid}>
      {recipes.map((recipe) => {
        const category = recipe.category ?? noCategory
        const recipesPickedInCategory = pickedRecipeIdsByCategory[category] ?? []
        const isPicked = recipesPickedInCategory.includes(recipe.id)

        return (
          <RecipeCard
            key={`card-${recipe.id}`}
            id={recipe.id}
            title={recipe.title}
            onPickRecipeChanged={onPickRecipeChanged}
            isPicked={isPicked}
            category={category}
          />
        )
      })}
    </div>
  )
}

export default RecipesPhotoCardsView

const grid = css`
  display: flex;
  flex-wrap: wrap;
`
