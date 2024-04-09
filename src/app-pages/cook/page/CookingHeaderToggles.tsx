/** @jsxImportSource @emotion/react */

import { useContext } from 'react'
import { css } from '@emotion/react'
import CardRadioButtonSelector from '../../../widgets/card-radio-button-selector/CardRadioButtonSelector'
import { TbColumns1, TbColumns2, TbColumns3, TbPlayerTrackPrev, TbPlayerTrackNext, TbCheckbox } from 'react-icons/tb'
import Toggles from '../../../widgets/toggles/Toggles'
import { CookingContext } from './CookingProvider'
import Toggle, { pickedRecipesToggleProperty } from '../../../widgets/toggles/Toggle'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import { IconType } from 'react-icons'
import { DispatchCookingEvent, DisplayDirection } from '../cooking-state/cooking-reducer'
import { RecipesViewingContext } from '../../search/page/SearchRecipesProvider'

const displayCountOptionsAll = [
  { label: '1', value: 1, icon: TbColumns1 },
  { label: '2', value: 2, icon: TbColumns2 },
  { label: '3', value: 3, icon: TbColumns3 }
]

type DisplayOptionType = { label: string; value: DisplayDirection; icon: IconType }
const displayPreviousOption: DisplayOptionType = { label: 'previous', value: 'previous', icon: TbPlayerTrackPrev }
const displayNextOption: DisplayOptionType = { label: 'next', value: 'next', icon: TbPlayerTrackNext }

const CookingHeaderToggles = () => {
  const { maxPanelsCount } = useContext(ViewSizeContext)
  const { displayConfig, pickedRecipesCount, dispatchCookingEvent } = useContext(CookingContext)
  const { showPickedRecipes, toggleShowPickedRecipes } = useContext(RecipesViewingContext)
  const { count, indexes } = displayConfig

  const { leftRecipeIndex, middleRecipeIndex, rightRecipeIndex } = indexes

  const getToggleDisplayRecipesCountOptions = () => {
    const maxCount = Math.min(maxPanelsCount, pickedRecipesCount, 3)
    if (maxCount <= 1) return []
    if (maxCount === 2) return displayCountOptionsAll.slice(0, 2)
    return displayCountOptionsAll
  }

  const hasNextRecipe = () => {
    const currentIndexes = [leftRecipeIndex, middleRecipeIndex, rightRecipeIndex]
    const index = currentIndexes[count - 1]
    return index !== undefined && index < pickedRecipesCount - 1
  }

  const getToggleMoveDisplayRangeOptions = () => {
    const toggles: DisplayOptionType[] = []

    const showPreviousToggle = leftRecipeIndex !== undefined && leftRecipeIndex > 0
    if (showPreviousToggle) toggles.push(displayPreviousOption)

    const showNextToggle = hasNextRecipe()
    if (showNextToggle) toggles.push(displayNextOption)

    return toggles
  }

  const moveDisplayRange = (value: DisplayDirection) => {
    dispatchCookingEvent({
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_INDEXES,
      payload: { moveDirection: value, pickedRecipesCount }
    })
  }

  const updateDisplayCount = (newValue: number) => {
    dispatchCookingEvent({
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_COUNT,
      payload: { newValue, maxPanelsCount, pickedRecipesCount }
    })
  }

  const displayCountOptions = getToggleDisplayRecipesCountOptions()
  const showToggleDisplayRecipesCount = displayCountOptions.length > 1

  const displayPreviousNextOptions = getToggleMoveDisplayRangeOptions()
  const showToggleDisplayPreviousNext = displayPreviousNextOptions.length > 0

  return (
    <Toggles hasBackground={true}>
      <Toggle
        isToggled={showPickedRecipes}
        toggle={toggleShowPickedRecipes}
        Icon={TbCheckbox}
        count={pickedRecipesCount}
        toggleProperty={pickedRecipesToggleProperty}
      />

      {showToggleDisplayRecipesCount ? (
        <div css={selectorLeft}>
          <CardRadioButtonSelector
            options={displayCountOptions}
            currentValue={count >= 3 ? 3 : count}
            selectValue={updateDisplayCount}
            noMargin={true}
          />
        </div>
      ) : null}

      {showToggleDisplayPreviousNext ? (
        <div css={selectorRight}>
          <CardRadioButtonSelector
            options={displayPreviousNextOptions}
            currentValue={undefined}
            selectValue={moveDisplayRange}
            noMargin={true}
          />
        </div>
      ) : null}
    </Toggles>
  )
}

export default CookingHeaderToggles

const spacing = 5

const selectorLeft = css`
  margin-right: ${spacing}px;
`

const selectorRight = css`
  margin-left: ${spacing}px;
`
