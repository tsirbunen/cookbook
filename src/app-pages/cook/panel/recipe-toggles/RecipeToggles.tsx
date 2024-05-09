/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Toggles from '../../../../widgets/toggles/Toggles'
import { useContext, useMemo } from 'react'
import Toggle, {
  cookToggleProperty,
  cookingTimerToggleProperty,
  ingredientScalingToggleProperty,
  multiColumnToggleProperty
} from '../../../../widgets/toggles/Toggle'
import { TbChefHat, TbColumns, TbStar, TbStarFilled } from 'react-icons/tb'
import { IoAlarmOutline } from 'react-icons/io5'
import { FaBalanceScale } from 'react-icons/fa'
import { TbRulerMeasure } from 'react-icons/tb'
import { cookTogglesZIndex } from '../../../../constants/z-indexes'
import { CookingContext } from '../../page/CookingProvider'
import { Recipe } from '../../../../types/graphql-schema-types.generated'
import { RecipesViewingContext } from '../../../search/page/SearchRecipesProvider'
import CountDown from './CountDown'
import Multiplier from './Multiplier'

type RecipeTogglesProps = {
  recipe: Recipe
  canHaveTwoColumns: boolean
}

const RecipeToggles = ({ recipe, canHaveTwoColumns }: RecipeTogglesProps) => {
  const { favoriteRecipeIds, toggleFavoriteRecipeId } = useContext(RecipesViewingContext)

  const {
    cookingRecipes,
    timersByRecipeId,
    toggleIsCookingRecipe,
    multiColumnRecipes,
    toggleMultiColumn,
    scalingByRecipeId,
    toggleIsScaling,
    onlyMetricRecipeIds,
    isScalingRecipeIds,
    toggleOnlyMetric
  } = useContext(CookingContext)

  const isCooking = useMemo(() => {
    return cookingRecipes.some((cookingRecipeData) => cookingRecipeData.recipe.id === recipe.id)
  }, [cookingRecipes])

  const isMultiColumn = useMemo(() => {
    return multiColumnRecipes.some((recipeId) => recipeId === recipe.id)
  }, [multiColumnRecipes])

  const recipeTimer = useMemo(() => {
    return timersByRecipeId[recipe.id]
  }, [timersByRecipeId])

  const isFavorite = useMemo(() => {
    return favoriteRecipeIds.includes(recipe.id)
  }, [favoriteRecipeIds])

  const multiplier = useMemo(() => {
    return scalingByRecipeId[recipe.id]?.multiplier
  }, [scalingByRecipeId])

  const isScaling = useMemo(() => {
    return isScalingRecipeIds.includes(recipe.id)
  }, [isScalingRecipeIds])

  const hasOnlyMetric = useMemo(() => {
    return onlyMetricRecipeIds.some((recipeId) => recipeId === recipe.id)
  }, [onlyMetricRecipeIds])

  return (
    <div css={containerCss}>
      <Toggles hasBackground={false}>
        <Toggle
          isToggled={isCooking}
          toggle={() => toggleIsCookingRecipe(recipe)}
          Icon={TbChefHat}
          toggleProperty={cookToggleProperty}
          isDisabled={isScaling}
          count={null}
        />

        <Toggle
          isToggled={isFavorite}
          toggle={() => toggleFavoriteRecipeId(recipe.id)}
          Icon={isFavorite ? TbStarFilled : TbStar}
          toggleProperty={cookToggleProperty}
          count={null}
        />
        {canHaveTwoColumns ? (
          <Toggle
            isToggled={isMultiColumn}
            toggle={() => toggleMultiColumn(recipe.id)}
            Icon={TbColumns}
            toggleProperty={multiColumnToggleProperty}
            count={null}
          />
        ) : null}

        <Toggle
          isToggled={isScaling}
          toggle={() => toggleIsScaling(recipe.id)}
          Icon={FaBalanceScale}
          toggleProperty={ingredientScalingToggleProperty}
          count={null}
          isDisabled={isCooking}
        >
          {multiplier && multiplier !== 1 ? <Multiplier multiplier={multiplier} /> : undefined}
        </Toggle>

        <Toggle
          isToggled={hasOnlyMetric}
          toggle={() => toggleOnlyMetric(recipe.id)}
          Icon={TbRulerMeasure}
          toggleProperty={ingredientScalingToggleProperty}
          count={null}
        />
        <Toggle
          isToggled={!!recipeTimer}
          toggle={() => console.log()}
          Icon={IoAlarmOutline}
          toggleProperty={cookingTimerToggleProperty}
          count={null}
        >
          {recipeTimer ? <CountDown timer={recipeTimer} /> : undefined}
        </Toggle>
      </Toggles>
    </div>
  )
}

export default RecipeToggles

const containerCss = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 10px;
  position: sticky;
  top: 5px;
  z-index: ${cookTogglesZIndex};
`
