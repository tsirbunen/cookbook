import { Button } from '@chakra-ui/react'
import { ColorCodes } from '../../theme/theme'
import { IconType } from 'react-icons'

export enum RoundedBordersOnSide {
  LEFT = 'LEFT',
  NONE = 'NONE',
  RIGHT = 'RIGHT'
}

type CardRadioButtonProps = {
  label: string
  isSelected: boolean
  selectValue: () => void
  roundBordersOnSide: RoundedBordersOnSide
  icon?: IconType
}

const borderRadius = '6px'
const iconSize = '30px'

const CardRadioButton = ({ label, isSelected, selectValue, roundBordersOnSide, icon }: CardRadioButtonProps) => {
  const backgroundColor = isSelected ? ColorCodes.VERY_DARK : ColorCodes.MEDIUM
  const labelColor = ColorCodes.PALE

  const borderRadii = ['0px', '0px', '0px', '0px']
  if (roundBordersOnSide === RoundedBordersOnSide.LEFT) {
    borderRadii[0] = borderRadius
    borderRadii[3] = borderRadius
  } else if (roundBordersOnSide === RoundedBordersOnSide.RIGHT) {
    borderRadii[1] = borderRadius
    borderRadii[2] = borderRadius
  }

  const size = icon ? 'md' : 'small'
  const IconElement = icon ? icon : null

  return (
    <Button
      onClick={selectValue}
      size={size}
      backgroundColor={backgroundColor}
      color={labelColor}
      padding={'3px 8px 3px 8px'}
      _hover={{
        backgroundColor: isSelected ? backgroundColor : ColorCodes.DARK,
        color: isSelected ? labelColor : ColorCodes.MEDIUM
      }}
      borderRadius={borderRadii.join(' ')}
      key={label}
    >
      {IconElement ? <IconElement size={iconSize} /> : label}
    </Button>
  )
}

export default CardRadioButton
