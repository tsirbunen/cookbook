import React, { Fragment } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { Ingredient } from '../../../../types/graphql-schema-types.generated'
import { ColorCodes } from '../../../../theme/theme'
import { getRoundedIngredientAmount } from './ScalingIngredient'
import { nameCss } from './common-styles'

type RegularIngredientProps = {
  ingredient: Ingredient
  showAsPale: boolean
  multiplier: number
}

const RegularIngredient = ({ ingredient, showAsPale, multiplier }: RegularIngredientProps) => {
  const { amount: originalAmount, unit, name } = ingredient

  const getDisplayAmount = () => {
    if (!originalAmount) return undefined
    if (!multiplier) return originalAmount
    return getRoundedIngredientAmount(originalAmount * multiplier)
  }

  return (
    <Fragment>
      <Flex {...amountAndUnitCss(showAsPale)}>
        <Flex {...nameCss}>
          <Text>
            {getDisplayAmount()} {unit}
          </Text>
        </Flex>
      </Flex>
      <Flex {...nameCss(showAsPale)}>
        <Text>{name}</Text>
      </Flex>
    </Fragment>
  )
}

export default RegularIngredient

const amountAndUnitCss = (isPale: boolean) => {
  return { width: '90px', color: isPale ? ColorCodes.SLIGHTLY_PALE : ColorCodes.DARK, fontWeight: 'bold' }
}
