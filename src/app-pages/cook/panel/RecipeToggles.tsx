/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Toggles from '../../../widgets/toggles/Toggles'
import { useContext, useMemo } from 'react'
import Toggle, { cookToggleProperty, cookingTimerToggleProperty } from '../../../widgets/toggles/Toggle'
import { TbChefHat } from 'react-icons/tb'
import { IoAlarmOutline } from 'react-icons/io5'
import { cookTogglesZIndex } from '../../../constants/z-indexes'
import { ColorCodes } from '../../../theme/theme'
import { CookingContext } from '../page/CookingProvider'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { TimerData } from '../../../types/types'
import { differenceInSeconds } from 'date-fns'

type RecipeTogglesProps = {
  recipe: Recipe
}

const RecipeToggles = ({ recipe }: RecipeTogglesProps) => {
  const { cookingRecipes, timersByRecipeId, toggleIsCookingRecipe } = useContext(CookingContext)

  const isCooking = useMemo(() => {
    return cookingRecipes.some((cookingRecipeData) => cookingRecipeData.recipe.id === recipe.id)
  }, [cookingRecipes])

  const recipeTimer = useMemo(() => {
    return timersByRecipeId[recipe.id]
  }, [timersByRecipeId])

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