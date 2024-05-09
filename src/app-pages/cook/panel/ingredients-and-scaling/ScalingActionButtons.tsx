import React, { useContext } from 'react'
import { ChakraProps, Flex } from '@chakra-ui/react'
import ButtonWithTheme from '../../../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../../../theme/buttons/buttons-theme'
import { SelectedScalingIngredient } from './Ingredients'
import { ScalingData } from '../../../../types/types'
import { CookingContext } from '../../page/CookingProvider'

type ScalingActionButtonsProps = {
  clearScaling: () => void
  presetMultiplier?: number
  scalingIngredient?: SelectedScalingIngredient
  currentScaling?: ScalingData
  recipeId: number
}

const APPLY_SCALING = 'APPLY'
const CLEAR_SCALING = 'CLEAR'

const ScalingActionButtons = ({
  clearScaling,
  presetMultiplier,
  scalingIngredient,
  currentScaling,
  recipeId
}: ScalingActionButtonsProps) => {
  const { scaleRecipe, toggleIsScaling } = useContext(CookingContext)

  const applyScaling = () => {
    const multiplier = presetMultiplier ?? scalingIngredient?.multiplier
    if (!multiplier) return

    scaleRecipe(recipeId, { multiplier, ingredientId: scalingIngredient?.id })
    toggleIsScaling(recipeId)
  }

  const checkIfScalingHasChangesToApply = () => {
    if (!currentScaling) {
      return (presetMultiplier && presetMultiplier !== 1) || scalingIngredient
    }

    if (presetMultiplier) return presetMultiplier !== currentScaling.multiplier
    if (scalingIngredient) return scalingIngredient.multiplier !== currentScaling.multiplier
    return false
  }

  const hasChanges = checkIfScalingHasChangesToApply()

  return (
    <Flex {...buttonsCss}>
      <ButtonWithTheme
        variant={ButtonVariant.MediumSizeDark}
        label={CLEAR_SCALING}
        onClick={clearScaling}
        isDisabled={presetMultiplier === 1}
      />
      <ButtonWithTheme
        variant={ButtonVariant.MediumSizeDark}
        label={APPLY_SCALING}
        isDisabled={!hasChanges}
        onClick={applyScaling}
      />
    </Flex>
  )
}

export default ScalingActionButtons

const buttonsCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  justifyContent: 'center' as ChakraProps['alignItems'],
  marginRight: '5px',
  marginTop: '15px'
}
