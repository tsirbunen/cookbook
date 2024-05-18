import React, { useMemo } from 'react'
import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { Ingredient } from '../../../../types/graphql-schema-types.generated'
import { ColorCodes } from '../../../../theme/theme'
import InputWithTheme from '../../../../theme/inputs/InputWithTheme'
import { InputVariant } from '../../../../theme/inputs/inputs-theme'
import { SelectedScalingIngredient } from './Ingredients'
import { nameCss } from './common-styles'
import { getScaledIngredientAmount } from './utils'

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
  const amount = getScaledIngredientAmount(id, !!unit, selectedIngredient, presetMultiplier, originalAmount)
  const showInput = isScaling && (amount || amount === '')
  const showText = amount || amount === ''
  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientBaseAmount(id, event.target.value, originalAmount ?? 1)
  }

  const amountElement = useMemo(() => {
    if (showInput) {
      return (
        <InputWithTheme
          value={amount}
          variant={isSelected ? InputVariant.Selected : InputVariant.Pale}
          isDisabled={false}
          onChange={onInputChanged}
          acceptValue={acceptValue}
        />
      )
    }
    if (showText) {
      return <Text>{amount}</Text>
    }
    return null
  }, [amount, isSelected, showInput, showText])

  return (
    <Flex {...outerCss}>
      <Flex {...amountOrUnitCss(false)}>{amountElement}</Flex>

      <Flex {...amountOrUnitCss(showAsPale)}>
        <Text>{unit}</Text>
      </Flex>

      <Flex {...nameCss(showAsPale)}>
        <Text>{name}</Text>
      </Flex>
    </Flex>
  )
}

export default IngredientRow

const outerCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'start' as ChakraProps['alignItems']
}

const amountOrUnitCss = (isPale: boolean) => {
  return {
    marginRight: '10px',
    width: '55px',
    color: isPale ? ColorCodes.SLIGHTLY_PALE : ColorCodes.DARK,
    fontWeight: 'bold'
  }
}
