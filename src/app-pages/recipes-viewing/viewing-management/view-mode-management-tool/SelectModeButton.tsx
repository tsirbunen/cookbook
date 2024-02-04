import { Button } from '@chakra-ui/react'
import { ColorCodes } from '../../../../theme/theme'

type SelectButtonProps = {
  label: string
  isSelected: boolean
  selectMode: () => void
  roundBordersOnSide: 'left' | 'right' | 'none'
}

const borderRadius = '6px'

const SelectModeButton = ({ label, isSelected, selectMode, roundBordersOnSide }: SelectButtonProps) => {
  const backgroundColor = isSelected ? ColorCodes.VERY_DARK : ColorCodes.MEDIUM
  const labelColor = isSelected ? ColorCodes.VERY_PALE : ColorCodes.DARK

  const borderRadii = ['0px', '0px', '0px', '0px']
  if (roundBordersOnSide === 'left') {
    borderRadii[0] = borderRadius
    borderRadii[3] = borderRadius
  } else if (roundBordersOnSide === 'right') {
    borderRadii[1] = borderRadius
    borderRadii[2] = borderRadius
  }

  return (
    <Button
      onClick={() => selectMode()}
      size="small"
      backgroundColor={backgroundColor}
      color={labelColor}
      padding={'3px 8px 3px 8px'}
      _hover={{
        backgroundColor: isSelected ? backgroundColor : ColorCodes.DARK,
        color: isSelected ? labelColor : ColorCodes.MEDIUM
      }}
      borderRadius={borderRadii.join(' ')}
    >
      {label}
    </Button>
  )
}

export default SelectModeButton
