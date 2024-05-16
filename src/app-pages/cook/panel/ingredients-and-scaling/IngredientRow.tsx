import React from 'react'
import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { Ingredient, Maybe } from '../../../../types/graphql-schema-types.generated'
import { ColorCodes } from '../../../../theme/theme'
import InputWithTheme from '../../../../theme/inputs/InputWithTheme'
import { InputVariant } from '../../../../theme/inputs/inputs-theme'
import { SelectedScalingIngredient } from './Ingredients'
import { nameCss } from './common-styles'

type IngredientRowProps = {
  ingredient: Ingredient
  presetMultiplier: number | undefined
  setIngredientBaseAmount: (ingredientId: number, newAmount: string, originalAmount: number) => void
  selectedIngredient: SelectedScalingIngredient | undefined
  isScaling: boolean
  showAsPale: boolean
  acceptValue?: () => void
}

const IngredientRow = ({
  ingredient,
  setIngredientBaseAmount,
  selectedIngredient,
  presetMultiplier,
  isScaling,
  showAsPale,
  acceptValue
}: IngredientRowProps) => {
  const { id, amount: originalAmount, unit, name } = ingredient
  const isSelected = selectedIngredient?.id === id
  const amount = getAmount(id, selectedIngredient, presetMultiplier, originalAmount)

  return (
    <Flex {...outerCss}>
      <Flex {...amountCss(false)}>
        {isScaling && (amount || amount === '') ? (
          <InputWithTheme
            value={amount}
            variant={isSelected ? InputVariant.Selected : InputVariant.Pale}
            isDisabled={false}
            onChange={(event) => setIngredientBaseAmount(id, event.target.value, originalAmount ?? 1)}
            acceptValue={acceptValue}
          ></InputWithTheme>
        ) : amount || amount === '' ? (
          <Text>{amount}</Text>
        ) : null}
      </Flex>
      <Flex {...unitCss(showAsPale)}>
        <Text>{unit}</Text>
      </Flex>
      <Flex {...nameCss(showAsPale)}>
        <Text>{name}</Text>
      </Flex>
    </Flex>
  )
}

export default IngredientRow

const getAmount = (
  id: number,
  selectedIngredient?: SelectedScalingIngredient,
  presetMultiplier?: number,
  originalAmount?: Maybe<number>
) => {
  const isSelected = selectedIngredient?.id === id
  if (isSelected) return selectedIngredient.newAmount.toString()

  const multiplier = presetMultiplier ?? selectedIngredient?.multiplier
  if (originalAmount && multiplier) {
    return getRoundedIngredientAmount(originalAmount * multiplier).toString()
  }
}

export const getRoundedIngredientAmount = (amount: number): number => {
  if (amount > 20) return Math.round(amount)

  const ceiled = Math.ceil(amount)
  const floored = Math.floor(amount)
  const middle = parseFloat(((ceiled + floored) / 2).toFixed(2))
  if (amount > 10) {
    const diffCeiled = Math.abs(amount - ceiled)
    const diffFloored = Math.abs(amount - floored)
    const diffMiddle = Math.abs(amount - middle)
    if (diffCeiled < diffFloored && diffCeiled < diffMiddle) return ceiled
    if (diffFloored < diffMiddle) return floored
    return middle
  }

  return parseFloat(amount.toFixed(2))
}

const outerCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'start' as ChakraProps['alignItems']
}

const amountCss = (isPale: boolean) => {
  return {
    width: '60px',
    marginRight: '10px',
    color: isPale ? ColorCodes.SLIGHTLY_PALE : ColorCodes.DARK,
    fontWeight: 'bold'
  }
}

const unitCss = (isPale: boolean) => {
  return {
    width: '55px',
    marginRight: '10px',
    color: isPale ? ColorCodes.SLIGHTLY_PALE : ColorCodes.DARK,
    fontWeight: 'bold'
  }
}
