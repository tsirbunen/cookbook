/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import RecipeTitle from './RecipeTitle'
import Photos from './Photos'
import RecipePropertyIcons from '../../../widgets/property-icon/RecipePropertyIcons'
import RecipeIngredients from './RecipeIngredients'
import { useWidthChangedObserver } from '../../../hooks/useWidthChangedObserver'
import RecipeTags from './RecipeTags'
import RecipeDescription from './RecipeDescription'
import RecipeInstructions from './RecipeInstructions'
import RecipeToggles from './RecipeToggles'
import RecipeCategory from './RecipeCategory'

type RecipePanelProps = {
  recipe?: Recipe
}

const CookRecipePanel = ({ recipe }: RecipePanelProps) => {
  const { elementRef, currentWidth } = useWidthChangedObserver()

  if (!recipe) return null

  const { isFavorite, ovenNeeded } = recipe

  return (
    <div css={container} ref={elementRef}>
      <Photos title={recipe.title} />
      <RecipeTitle title={recipe.title} />
      {recipe.category ? <RecipeCategory category={recipe.category} /> : null}
      <RecipePropertyIcons
        isFavorite={isFavorite}
        ovenNeeded={ovenNeeded}
        hasTags={recipe.tags.length > 0}
        justifyContent="center"
      />
      {recipe.tags ? <RecipeTags tags={recipe.tags} /> : null}
      {recipe.description ? <RecipeDescription description={recipe.description} /> : null}
      <RecipeToggles recipe={recipe} />

      <RecipeIngredients ingredientGroups={recipe.ingredientGroups} currentWidth={currentWidth} recipeId={recipe.id} />
      <RecipeInstructions
        instructionGroups={recipe.instructionGroups}
        currentWidth={currentWidth}
        recipeId={recipe.id}
      />
    </div>
  )
}

export default CookRecipePanel

const container = css`
  width: 100%;
  margin-bottom: 50px;
`
