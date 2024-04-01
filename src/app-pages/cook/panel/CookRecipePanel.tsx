/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import RecipeTitle from './RecipeTitle'
import Photos from './Photos'
import RecipePropertyIcons from '../../../widgets/property-icon/RecipePropertyIcons'
import Ingredients from './Ingredients'
import { useWidthChangedObserver } from '../../../hooks/useWidthChangedObserver'
import RecipeTags from './RecipeTags'
import Description from './Description'
import Instructions from './Instructions'
import RecipeToggles from './RecipeToggles'
import CategoryTitle from './CategoryTitle'
import { ColorCodes } from '../../../theme/theme'
import { useContext, useMemo } from 'react'
import { CookingContext } from '../page/CookingProvider'
import { RecipesViewingContext } from '../../recipes/page/RecipesViewingProvider'

type RecipePanelProps = {
  recipe?: Recipe
}

const CookRecipePanel = ({ recipe }: RecipePanelProps) => {
  const { elementRef, canHaveTwoColumns } = useWidthChangedObserver()
  const { multiColumnRecipes } = useContext(CookingContext)
  const { favoriteRecipeIds } = useContext(RecipesViewingContext)

  const columnsCountToDisplay = useMemo(() => {
    const multiColumnIsSelected = recipe ? multiColumnRecipes.some((id) => id === recipe.id) : false
    return canHaveTwoColumns && multiColumnIsSelected ? 2 : 1
  }, [canHaveTwoColumns, multiColumnRecipes])

  if (!recipe) return null

  const { ovenNeeded } = recipe

  return (
    <div css={container} ref={elementRef}>
      <Photos title={recipe.title} />
      <div css={topCss}>
        <RecipeTitle title={recipe.title} />
        {recipe.category ? <CategoryTitle category={recipe.category} /> : null}

        <div css={propertiesCss}>
          <RecipePropertyIcons
            isFavorite={favoriteRecipeIds.includes(recipe.id)}
            ovenNeeded={ovenNeeded}
            hasTags={recipe.tags.length > 0}
            justifyContent="center"
          />
        </div>
        {recipe.tags ? <RecipeTags tags={recipe.tags} /> : null}
        {recipe.description ? <Description description={recipe.description} /> : null}
        <RecipeToggles recipe={recipe} canHaveTwoColumns={canHaveTwoColumns} />
        <Ingredients
          ingredientGroups={recipe.ingredientGroups}
          columnCount={columnsCountToDisplay}
          recipeId={recipe.id}
        />
        <Instructions
          instructionGroups={recipe.instructionGroups}
          columnCount={columnsCountToDisplay}
          recipeId={recipe.id}
        />
      </div>
    </div>
  )
}

export default CookRecipePanel

const container = css`
  width: 100%;
`

const topCss = css`
  width: 100%;
  position: relative;
  top: -120px;
  border-radius: 100px 100px 0px 0px;
  background-size: cover;
  background-color: ${ColorCodes.BACKGROUND};
`

const propertiesCss = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
`
