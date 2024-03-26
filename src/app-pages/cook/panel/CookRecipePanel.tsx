/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import RecipeTitle from './RecipeTitle'
import RecipePhotos from './RecipePhotos'
import RecipePropertyIcons from '../../../widgets/property-icon/RecipePropertyIcons'
import RecipeIngredients from './RecipeIngredients'
import { useWidthChangedObserver } from '../../../hooks/useWidthChangedObserver'

type RecipePanelProps = {
  recipe?: Recipe
}

const CookRecipePanel = ({ recipe }: RecipePanelProps) => {
  const { elementRef, currentWidth } = useWidthChangedObserver()

  if (!recipe) return null

  const { isFavorite, ovenNeeded } = recipe

  return (
    <div css={container} ref={elementRef}>
      <RecipePhotos title={recipe.title} />
      <RecipeTitle title={recipe.title} />
      <RecipePropertyIcons isFavorite={isFavorite} ovenNeeded={ovenNeeded} justifyContent="center" />

      <RecipeIngredients ingredientGroups={recipe.ingredientGroups} currentWidth={currentWidth} recipeId={recipe.id} />
    </div>
  )
}

export default CookRecipePanel

const container = css`
  width: 100%;
`
