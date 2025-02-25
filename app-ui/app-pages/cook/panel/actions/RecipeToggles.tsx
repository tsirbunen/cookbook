/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useRouter } from 'next/navigation'
import { useContext, useMemo } from 'react'
import { FaBalanceScale } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { IoAlarmOutline } from 'react-icons/io5'
import { TbChefHat, TbColumns, TbStar, TbStarFilled } from 'react-icons/tb'
import { TbRulerMeasure } from 'react-icons/tb'
import { TbWashDrycleanOff } from 'react-icons/tb'
import { cookTogglesZIndex } from '../../../../constants/z-indexes'
import { Page } from '../../../../navigation/page-paths'
import { LocalStorageContext, LocalStorageKeys } from '../../../../state/LocalStorageProvider'
import { ButtonVariant } from '../../../../theme/buttons/buttons-theme'
import type { Recipe } from '../../../../types/graphql-schema-types.generated'
import Toggle, {
  clearAllToggleProperty,
  cookToggleProperty,
  cookingTimerToggleProperty,
  favoriteToggleProperty,
  ingredientScalingToggleProperty,
  metricOnlyToggleProperty,
  modifyToggleProperty,
  multiColumnToggleProperty
} from '../../../../widgets/toggles/Toggle'
import Toggles from '../../../../widgets/toggles/Toggles'
import { CookingContext } from '../../page/CookingProvider'
import CountDown from './CountDown'
import Multiplier from './Multiplier'

type RecipeTogglesProps = {
  recipe: Recipe
  canHaveTwoColumns: boolean
}

const RecipeToggles = ({ recipe, canHaveTwoColumns }: RecipeTogglesProps) => {
  const router = useRouter()
  const { favoriteRecipeIds, toggleValueForKey } = useContext(LocalStorageContext)
  const toggleFavoriteRecipeId = (recipeId: number) => toggleValueForKey(LocalStorageKeys.FAVORITE_RECIPE_IDS, recipeId)

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
    toggleOnlyMetric,
    clearAllRecipeSettings
  } = useContext(CookingContext)

  const isCooking = useMemo(
    () => cookingRecipes.some((someRecipe) => someRecipe.id === recipe.id),
    [cookingRecipes, recipe.id]
  )
  const isMultiColumn = useMemo(
    () => multiColumnRecipes.some((recipeId) => recipeId === recipe.id),
    [multiColumnRecipes, recipe.id]
  )
  const recipeTimer = useMemo(() => timersByRecipeId[recipe.id], [timersByRecipeId, recipe.id])
  const isFavorite = useMemo(() => favoriteRecipeIds.includes(recipe.id), [favoriteRecipeIds, recipe.id])
  const multiplier = useMemo(() => scalingByRecipeId[recipe.id]?.multiplier, [scalingByRecipeId, recipe.id])
  const isScaling = useMemo(() => isScalingRecipeIds.includes(recipe.id), [isScalingRecipeIds, recipe.id])
  const hasOnlyMetric = useMemo(
    () => onlyMetricRecipeIds.some((recipeId) => recipeId === recipe.id),
    [onlyMetricRecipeIds, recipe.id]
  )

  const modifyRecipe = (recipeId: number) => {
    router.push(`/${Page.WIZARD}/${recipeId}`)
  }

  const hasSomethingToClear = isCooking || isScaling || isMultiColumn || hasOnlyMetric || !!recipeTimer || !!multiplier
  const toggleVariant = ButtonVariant.SquareWithIconWithoutFill

  return (
    <div css={containerCss} data-testid={`${recipe.id}-toggles`}>
      <Toggles hasBackground={true}>
        <Toggle
          isToggled={isFavorite}
          toggle={() => toggleFavoriteRecipeId(recipe.id)}
          Icon={isFavorite ? TbStarFilled : TbStar}
          toggleProperty={favoriteToggleProperty}
          count={null}
          variant={toggleVariant}
        />
        {canHaveTwoColumns ? (
          <Toggle
            isToggled={isMultiColumn}
            toggle={() => toggleMultiColumn(recipe.id)}
            Icon={TbColumns}
            toggleProperty={multiColumnToggleProperty}
            count={null}
            variant={toggleVariant}
          />
        ) : null}
        <Toggle
          isToggled={!!recipeTimer}
          // FIXME: Implement setting timer
          toggle={() => console.log('TIMER!')}
          Icon={IoAlarmOutline}
          toggleProperty={cookingTimerToggleProperty}
          count={null}
          variant={toggleVariant}
        >
          {recipeTimer ? <CountDown timer={recipeTimer} /> : undefined}
        </Toggle>

        <Toggle
          isToggled={isScaling || Object.keys(scalingByRecipeId).includes(recipe.id.toString())}
          toggle={() => toggleIsScaling(recipe.id)}
          Icon={FaBalanceScale}
          toggleProperty={ingredientScalingToggleProperty}
          count={null}
          isDisabled={isCooking}
          variant={toggleVariant}
        >
          {multiplier && multiplier !== 1 ? <Multiplier multiplier={multiplier} /> : undefined}
        </Toggle>

        <Toggle
          isToggled={hasOnlyMetric}
          toggle={() => toggleOnlyMetric(recipe.id)}
          Icon={TbRulerMeasure}
          toggleProperty={metricOnlyToggleProperty}
          count={null}
          variant={toggleVariant}
        />

        <Toggle
          isToggled={hasSomethingToClear}
          toggle={() => clearAllRecipeSettings(recipe.id)}
          Icon={TbWashDrycleanOff}
          toggleProperty={clearAllToggleProperty}
          isDisabled={!hasSomethingToClear}
          count={null}
          variant={toggleVariant}
        />

        <Toggle
          isToggled={false}
          toggle={() => modifyRecipe(recipe.id)}
          Icon={FaEdit}
          toggleProperty={modifyToggleProperty}
          isDisabled={false}
          count={null}
          variant={toggleVariant}
        />

        <Toggle
          isToggled={isCooking}
          toggle={() => toggleIsCookingRecipe(recipe.id)}
          Icon={TbChefHat}
          toggleProperty={cookToggleProperty}
          isDisabled={isScaling}
          count={null}
          variant={toggleVariant}
        />
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
  top: 0px;
  z-index: ${cookTogglesZIndex};
`
