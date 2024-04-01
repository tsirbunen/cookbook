/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Toggles from '../../../widgets/toggles/Toggles'
import { useContext, useMemo } from 'react'
import Toggle, {
  cookToggleProperty,
  cookingTimerToggleProperty,
  multiColumnToggleProperty
} from '../../../widgets/toggles/Toggle'
import { TbChefHat, TbColumns, TbStar, TbStarFilled } from 'react-icons/tb'
import { IoAlarmOutline } from 'react-icons/io5'
import { cookTogglesZIndex } from '../../../constants/z-indexes'
import { ColorCodes } from '../../../theme/theme'
import { CookingContext } from '../page/CookingProvider'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { TimerData } from '../../../types/types'
import { differenceInSeconds } from 'date-fns'
import { RecipesViewingContext } from '../../recipes/page/RecipesViewingProvider'

type RecipeTogglesProps = {
  recipe: Recipe
  canHaveTwoColumns: boolean
}

const RecipeToggles = ({ recipe, canHaveTwoColumns }: RecipeTogglesProps) => {
  const { favoriteRecipeIds, toggleFavoriteRecipeId } = useContext(RecipesViewingContext)
  console.log('toggles', { favoriteRecipeIds })

  const { cookingRecipes, timersByRecipeId, toggleIsCookingRecipe, multiColumnRecipes, toggleMultiColumn } =
    useContext(CookingContext)

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

  return (
    <div css={containerCss}>
      <Toggles>
        <Toggle
          isToggled={isCooking}
          toggle={() => toggleIsCookingRecipe(recipe)}
          Icon={TbChefHat}
          toggleProperty={cookToggleProperty}
        />
        <Toggle
          isToggled={isFavorite}
          toggle={() => toggleFavoriteRecipeId(recipe.id)}
          Icon={isFavorite ? TbStarFilled : TbStar}
          toggleProperty={cookToggleProperty}
        />
        {canHaveTwoColumns ? (
          <Toggle
            isToggled={isMultiColumn}
            toggle={() => toggleMultiColumn(recipe.id)}
            Icon={TbColumns}
            toggleProperty={multiColumnToggleProperty}
          />
        ) : null}

        <Toggle
          isToggled={!!recipeTimer}
          toggle={() => console.log()}
          Icon={IoAlarmOutline}
          toggleProperty={cookingTimerToggleProperty}
          count={null}
        />
        {recipeTimer ? <CountDown timer={recipeTimer} /> : null}
      </Toggles>
    </div>
  )
}

export default RecipeToggles

const getPaddedNumber = (number: number) => number.toString().padStart(2, '0')

const CountDown = ({ timer }: { timer: TimerData }) => {
  let seconds = differenceInSeconds(new Date(), timer.startedAt)
  const hours = seconds / 3600
  seconds -= hours * 3600
  const minutes = seconds / 60
  seconds -= minutes * 60
  const timeLeft = `${getPaddedNumber(hours)}:${getPaddedNumber(minutes)}:${getPaddedNumber(seconds)}`

  return (
    <div css={timeBoxCss}>
      <div css={timeCss}>{timeLeft}</div>
    </div>
  )
}

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

const timeBoxCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-left: 5px;
  border-radius: 4px;
`
const timeCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${ColorCodes.MEDIUM};
  color: ${ColorCodes.VERY_DARK};
  padding: 0px 5px 0px 5px;
  border-radius: 4px;
  font-weight: bold;
`
