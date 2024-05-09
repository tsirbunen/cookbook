import React from 'react'
import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { Ingredient, Maybe } from '../../../../types/graphql-schema-types.generated'
import { ColorCodes } from '../../../../theme/theme'
import InputWithTheme from '../../../../theme/inputs/InputWithTheme'
import { InputVariant } from '../../../../theme/inputs/inputs-theme'
import { SelectedScalingIngredient } from './Ingredients'
import { nameCss } from './common-styles'

type ScalingIngredientProps = {
  ingredient: Ingredient
  presetMultiplier: number | undefined
  setIngredientBaseAmount: (ingredientId: number, newAmount: string, originalAmount: number) => void
  selectedIngredient: SelectedScalingIngredient | undefined
}

const ScalingIngredient = ({
  ingredient,
  setIngredientBaseAmount,
  selectedIngredient,
  presetMultiplier
}: ScalingIngredientProps) => {
  const { id, amount: originalAmount, unit, name } = ingredient
  const isSelected = selectedIngredient?.id === id
  const amount = getAmount(id, selectedIngredient, presetMultiplier, originalAmount)

  return (
    <Flex {...unitAndAmountBoxCss}>
      <Flex {...amountCss(false)}>
        {amount || amount === '' ? (
          <InputWithTheme
            value={amount}
            variant={isSelected ? InputVariant.Selected : InputVariant.Pale}
            isDisabled={false}
            onChange={(event) => setIngredientBaseAmount(id, event.target.value, originalAmount ?? 1)}
          ></InputWithTheme>
        ) : null}
      </Flex>
      <Flex {...unitCss(false)}>
        <Text>{unit}</Text>
      </Flex>
      <Flex {...nameCss(false)}>
        <Text>{name}</Text>
      </Flex>
    </Flex>
  )
}

export default ScalingIngredient

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

const unitAndAmountBoxCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center' as ChakraProps['alignItems']
}

const amountCss = (isPale: boolean) => {
  return {
    width: '80px',
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
