import { Flex, Text } from '@chakra-ui/react'
import type React from 'react'
import { useMemo } from 'react'
import { Shades } from '../../../../constants/shades'
import { rowItemsStartCss } from '../../../../constants/styling'
import InputWithTheme from '../../../../theme/inputs/InputWithTheme'
import { InputVariant } from '../../../../theme/inputs/inputs-theme'
import type { Ingredient } from '../../../../types/graphql-schema-types.generated'
import type { SelectedScalingIngredient } from './Ingredients'
import { nameCss } from './common-styles'
import { getScaledIngredientAmount } from './utils'

export const ingredientRow = 'ingredient-row'
export const ingredientName = 'ingredient-name'

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

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientBaseAmount(id, event.target.value, originalAmount ?? 1)
  }

  const isSelected = selectedIngredient?.id === id
  const amount = getScaledIngredientAmount(id, !!unit, selectedIngredient, presetMultiplier, originalAmount)
  const showInput = isScaling && (amount || amount === '')
  const showText = amount || amount === ''

  // biome-ignore lint/correctness/useExhaustiveDependencies: Change only if elected dependencies change
  const amountElement = useMemo(() => {
    if (showInput) {
      return (
        <InputWithTheme
          value={amount}
          variant={isSelected ? InputVariant.Selected : InputVariant.Pale}
          isDisabled={false}
          onChange={onInputChanged}
          onBlur={acceptValue}
        />
      )
    }
    if (showText) {
      return <Text>{amount}</Text>
    }
    return null
  }, [amount, isSelected, showInput, showText])

  return (
    <Flex {...rowItemsStartCss} data-testid={ingredientRow}>
      <Flex {...amountOrUnitCss(false)}>{amountElement}</Flex>

      <Flex {...amountOrUnitCss(showAsPale)}>
        <Text>{unit}</Text>
      </Flex>

      <Flex {...nameCss(showAsPale)} data-testid={ingredientName}>
        <Text>{name}</Text>
      </Flex>
    </Flex>
  )
}

export default IngredientRow

const amountOrUnitCss = (isPale: boolean) => {
  return {
    marginRight: '10px',
    width: '55px',
    color: isPale ? Shades.SLIGHTLY_PALE : Shades.DARK,
    fontWeight: 'bold'
  }
}
