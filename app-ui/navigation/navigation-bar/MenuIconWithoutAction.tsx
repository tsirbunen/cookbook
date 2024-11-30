import { type ChakraProps, Flex } from '@chakra-ui/react'
import { TbMenu2 } from 'react-icons/tb'
import { NAV_BAR_WIDTH } from '../../constants/layout'
import { Shades } from '../../constants/shades'

type MenuIconWithoutActionProps = {
  height: number
}

const MenuIconWithoutAction = ({ height }: MenuIconWithoutActionProps) => {
  return (
    <Flex {...outerCss(height)}>
      <Flex {...innerCss}>
        <TbMenu2 />
      </Flex>
    </Flex>
  )
}

export default MenuIconWithoutAction

const outerCss = (height: number) => {
  return {
    display: 'flex' as ChakraProps['display'],
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'center',
    justifyContent: 'center',
    width: `${NAV_BAR_WIDTH}px`,
    backgroundColor: Shades.VERY_DARK,
    position: 'fixed' as ChakraProps['position'],
    top: 0,
    height: `${height}px`,
    flex: 1
  }
}

const innerCss = {
  display: 'flex' as ChakraProps['display'],
  flex: 1,
  flexDirection: 'row' as ChakraProps['flexDirection'],
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2.2em',
  color: Shades.VERY_PALE,
  height: '100%'
}
