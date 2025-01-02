/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useContext, useMemo } from 'react'
import { Shades } from '../../../../constants/shades'
import { useWidthChangedObserver } from '../../../../hooks/useWidthChangedObserver'
import { LocalStorageContext } from '../../../../state/LocalStorageProvider'
import type { Recipe } from '../../../../types/graphql-schema-types.generated'
import RecipePropertyIcons from '../../../../widgets/property-icon/RecipePropertyIcons'
import { CookingContext } from '../../page/CookingProvider'
import RecipeToggles from '../actions/RecipeToggles'
import Ingredients from '../ingredients-and-scaling/Ingredients'
import Instructions from '../instructions/Instructions'
import Description from './Description'
import Photos, { IMAGE_CONTAINER_HEIGHT } from './Photos'
import RecipeTags from './RecipeTags'
import RecipeTitle from './RecipeTitle'

type RecipePanelProps = {
  recipe?: Recipe
}

const CookRecipePanel = ({ recipe }: RecipePanelProps) => {
  const { elementRef, canHaveTwoColumns, panelWidth } = useWidthChangedObserver()
  const { multiColumnRecipes } = useContext(CookingContext)
  const { favoriteRecipeIds } = useContext(LocalStorageContext)

  // biome-ignore lint/correctness/useExhaustiveDependencies: This is on purpose
  const columnsCountToDisplay = useMemo(() => {
    const multiColumnIsSelected = recipe ? multiColumnRecipes.some((id) => id === recipe.id) : false
    return canHaveTwoColumns && multiColumnIsSelected ? 2 : 1
  }, [canHaveTwoColumns, multiColumnRecipes])

  if (!recipe) return null

  const { id, title, description, ovenNeeded, tags, photos } = recipe

  return (
    <div css={containerCss} ref={elementRef} data-testid={`recipe-${id}-panel`}>
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

        {tags?.length ? <RecipeTags tags={tags} /> : null}
        {description ? <Description description={description} /> : null}

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
  background-color: ${Shades.BACKGROUND};
`

const propertiesCss = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
`
