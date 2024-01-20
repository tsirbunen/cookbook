import { ColorCodes } from '../../../theme/theme'
import { Button, ChakraProps, Flex } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'

type ToggleProps = {
  isToggled: boolean
  toggle: () => void
  Icon: IconType
  count?: number
  isDisabled?: boolean
}

const Toggle = ({ isToggled, toggle, Icon, count, isDisabled }: ToggleProps) => {
  return (
    <Flex {...toggleStyles}>
      <Button {...buttonStyles(isToggled)} onClick={toggle} isDisabled={isDisabled}>
        <Icon fontSize="1.75em" />
      </Button>
      {count ? <Flex {...badgeStyles}>{count}</Flex> : <Flex width={`${badgeSize}px`} />}
    </Flex>
  )
}

const toggleStyles = {
  marginLeft: '0px',
  marginRight: '0px'
}

const buttonStyles = (isExpanded: boolean) => {
  return {
    size: 'xl',
    variant: 'solid',
    borderRadius: '6px',
    padding: '5px',
    bg: isExpanded ? ColorCodes.VERY_DARK : ColorCodes.MEDIUM,
    color: isExpanded ? ColorCodes.VERY_PALE : ColorCodes.PALE,
    _focus: { outline: 'none' },
    _hover: {
      bg: isExpanded ? ColorCodes.VERY_DARK : ColorCodes.MEDIUM,
      color: isExpanded ? ColorCodes.VERY_PALE : ColorCodes.PALE
    }
  }
}
export default Toggle

const badgeSize = 20

const badgeStyles = {
  width: `${badgeSize}px`,
  height: `${badgeSize}px`,
  bg: ColorCodes.DARK,
  borderRadius: `${badgeSize / 2}px`,
  position: 'relative' as ChakraProps['position'],
  right: `${badgeSize / 3}px`,
  top: `-${badgeSize / 4}px`,
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'center',
  color: ColorCodes.VERY_PALE,
  fontWeight: 'bold'
}
