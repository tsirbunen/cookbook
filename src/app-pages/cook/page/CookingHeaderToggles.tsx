import { useContext } from 'react'
import type { IconType } from 'react-icons'
import { TbColumns1, TbColumns2, TbColumns3, TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import CardRadioButton, {
  CardRadioButtonSelectorVariant,
  RoundedBordersOnSide
} from '../../../widgets/card-radio-button-selector/CardRadioButton'
import CardRadioButtonSelector from '../../../widgets/card-radio-button-selector/CardRadioButtonSelector'
import Toggles from '../../../widgets/toggles/Toggles'
import { DispatchCookingEvent, type DisplayDirection } from '../cooking-state/cooking-reducer'
import { CookingContext } from './CookingProvider'

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

  const hasPrevious = leftRecipeIndex !== undefined && leftRecipeIndex > 0
  const hasNext = hasNextRecipe()

  return (
    <Toggles hasBackground={false}>
      <CardRadioButton
        label={displayPreviousOption.label}
        isSelected={false}
        selectValue={() => moveDisplayRange(displayPreviousOption.value)}
        roundBordersOnSide={RoundedBordersOnSide.BOTH}
        icon={displayPreviousOption.icon}
        variant={CardRadioButtonSelectorVariant.Header}
        isDisabled={!hasPrevious}
      />

      <CardRadioButtonSelector
        options={displayCountOptions}
        currentValue={count >= 3 ? 3 : count}
        selectValue={updateDisplayCount}
        noMargin={true}
        variant={CardRadioButtonSelectorVariant.Header}
      />

      <CardRadioButton
        label={displayNextOption.label}
        isSelected={false}
        selectValue={() => moveDisplayRange(displayNextOption.value)}
        roundBordersOnSide={RoundedBordersOnSide.BOTH}
        icon={displayNextOption.icon}
        variant={CardRadioButtonSelectorVariant.Header}
        isDisabled={!hasNext}
      />
    </Toggles>
  )
}

export default CookingHeaderToggles
