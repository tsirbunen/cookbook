/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import RecipeTitle from './RecipeTitle'
import Photos, { IMAGE_CONTAINER_HEIGHT } from './Photos'
import RecipePropertyIcons from '../../../widgets/property-icon/RecipePropertyIcons'
import Ingredients from './ingredients-and-scaling/Ingredients'
import { useWidthChangedObserver } from '../../../hooks/useWidthChangedObserver'
import RecipeTags from './RecipeTags'
import Description from './Description'
import Instructions from './Instructions'
import RecipeToggles from './recipe-toggles/RecipeToggles'
import { ColorCodes } from '../../../theme/theme'
import { useContext, useMemo } from 'react'
import { CookingContext } from '../page/CookingProvider'
import { RecipesViewingContext } from '../../search/page/SearchRecipesProvider'

type RecipePanelProps = {
  recipe?: Recipe
}

const CookRecipePanel = ({ recipe }: RecipePanelProps) => {
  const { elementRef, canHaveTwoColumns, panelWidth } = useWidthChangedObserver()
  const { multiColumnRecipes } = useContext(CookingContext)
  const { favoriteRecipeIds } = useContext(RecipesViewingContext)

  const columnsCountToDisplay = useMemo(() => {
    const multiColumnIsSelected = recipe ? multiColumnRecipes.some((id) => id === recipe.id) : false
    return canHaveTwoColumns && multiColumnIsSelected ? 2 : 1
  }, [canHaveTwoColumns, multiColumnRecipes])

  if (!recipe) return null

  const { title, ovenNeeded, tags, photos } = recipe

  return (
    <div css={containerCss} ref={elementRef}>
      <Photos title={title} photos={photos ?? []} panelWidth={panelWidth} />
      <div css={topCss}>
        <RecipeTitle title={recipe.title} />

        <div css={propertiesCss}>
          <RecipePropertyIcons
            isFavorite={favoriteRecipeIds.includes(recipe.id)}
            ovenNeeded={ovenNeeded}
            hasTags={tags?.length ? tags?.length > 0 : false}
            justifyContent="center"
          />
        </div>

        {recipe.tags ? <RecipeTags tags={tags!} /> : null}
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

const CARD_RADIUS = 100

const containerCss = css`
  width: 100%;
`

const topCss = css`
  width: 100%;
  position: relative;
  top: ${IMAGE_CONTAINER_HEIGHT - CARD_RADIUS}px;
  border-radius: ${CARD_RADIUS}px ${CARD_RADIUS}px 0px 0px;
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
