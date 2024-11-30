import { Button } from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { Shades } from '../../constants/shades'

export enum RoundedBordersOnSide {
  LEFT = 'LEFT',
  NONE = 'NONE',
  RIGHT = 'RIGHT',
  BOTH = 'BOTH'
}

export enum CardRadioButtonSelectorVariant {
  DarkWithFill = 'DarkWithFill',
  PaleNoFill = 'PaleNoFill',
  Header = 'Header'
}

type CardRadioButtonProps = {
  label: string
  isSelected: boolean
  selectValue: () => void
  roundBordersOnSide: RoundedBordersOnSide
  icon?: IconType
  noFill?: boolean
  variant: CardRadioButtonSelectorVariant
  isDisabled?: boolean
}

const borderRadius = '6px'
const iconSize = '30px'

const CardRadioButton = ({
  label,
  isSelected,
  selectValue,
  roundBordersOnSide,
  icon,
  variant,
  isDisabled = false
}: CardRadioButtonProps) => {
  const isHeaderVariant = variant === CardRadioButtonSelectorVariant.Header
  let borderRadii = ['0px', '0px', '0px', '0px']
  if (roundBordersOnSide === RoundedBordersOnSide.BOTH || isHeaderVariant) {
    borderRadii = [borderRadius, borderRadius, borderRadius, borderRadius]
  } else if (roundBordersOnSide === RoundedBordersOnSide.LEFT) {
    borderRadii[0] = borderRadius
    borderRadii[3] = borderRadius
  } else if (roundBordersOnSide === RoundedBordersOnSide.RIGHT) {
    borderRadii[1] = borderRadius
    borderRadii[2] = borderRadius
  }

  const size = icon ? 'md' : 'small'
  const IconElement = icon ? icon : null
  const { backgroundColor, color, hover, borderColor, padding } = getVariantStyles(variant, isSelected, isDisabled)
  const marginRight = isHeaderVariant ? '0px' : '-2px'

  return (
    <Button
      onClick={selectValue}
      size={size}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth="1.5px"
      color={color}
      fontWeight="bold"
      padding={padding}
      _hover={hover}
      borderRadius={borderRadii.join(' ')}
      key={label}
      marginRight={marginRight}
      disabled={isDisabled}
    >
      {IconElement ? <IconElement size={iconSize} /> : label}
    </Button>
  )
}

export default CardRadioButton

const getVariantStyles = (variant: CardRadioButtonSelectorVariant, isSelected: boolean, isDisabled: boolean) => {
  const veryPale = Shades.VERY_PALE
  const dark = Shades.DARK
  const medium = Shades.MEDIUM
  const pale = Shades.PALE
  const veryDark = Shades.VERY_DARK

  switch (variant) {
    case CardRadioButtonSelectorVariant.DarkWithFill:
      return {
        backgroundColor: isSelected ? veryDark : 'transparent',
        color: isSelected ? veryPale : medium,
        hover: {
          backgroundColor: dark,
          color: veryPale
        },
        borderColor: veryDark,
        padding: '3px 8px 3px 8px'
      }
    case CardRadioButtonSelectorVariant.PaleNoFill:
      return {
        backgroundColor: isSelected ? veryPale : 'transparent',
        color: isSelected ? veryDark : medium,
        hover: {
          backgroundColor: veryPale,
          color: isSelected ? veryDark : dark
        },
        borderColor: pale,
        padding: '3px 8px 3px 8px'
      }
    case CardRadioButtonSelectorVariant.Header:
      return {
        backgroundColor: veryDark,
        color: isSelected ? veryPale : isDisabled ? dark : medium,
        hover: {
          backgroundColor: isDisabled ? veryDark : medium,
          color: isDisabled ? dark : veryPale
        },
        borderColor: 'transparent',
        padding: '3px'
      }
  }
}
