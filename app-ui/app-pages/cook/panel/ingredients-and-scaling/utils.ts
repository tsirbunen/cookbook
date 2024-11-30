import type { Maybe } from '../../../../types/graphql-schema-types.generated'
import type { SelectedScalingIngredient } from './Ingredients'

export const getScaledIngredientAmount = (
  id: number,
  hasUnit: boolean,
  selectedIngredient?: SelectedScalingIngredient,
  presetMultiplier?: number,
  originalAmount?: Maybe<number>
): string | undefined => {
  const isSelected = selectedIngredient?.id === id
  if (isSelected) return selectedIngredient.newAmount.toString()

  const multiplier = presetMultiplier ?? selectedIngredient?.multiplier ?? 1

  if (!originalAmount && hasUnit) {
    return getRoundedIngredientAmount(multiplier).toString()
  }

  if (originalAmount) {
    return getRoundedIngredientAmount(originalAmount * multiplier).toString()
  }
}

export const getRoundedIngredientAmount = (amount: number): number => {
  if (amount > 20) return Math.round(amount)

  const ceiled = Math.ceil(amount)
  const floored = Math.floor(amount)
  const middle = Number.parseFloat(((ceiled + floored) / 2).toFixed(2))
  if (amount > 10) {
    const diffCeiled = Math.abs(amount - ceiled)
    const diffFloored = Math.abs(amount - floored)
    const diffMiddle = Math.abs(amount - middle)
    if (diffCeiled < diffFloored && diffCeiled < diffMiddle) return ceiled
    if (diffFloored < diffMiddle) return floored
    return middle
  }

  return Number.parseFloat(amount.toFixed(2))
}
