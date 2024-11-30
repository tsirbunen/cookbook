import { NAV_BAR_WIDTH } from '../constants/layout'
import { Shades } from '../constants/shades'
import type { NavigationMenuItem } from './page-paths'
import { ChakraProps, Flex } from '@chakra-ui/react'

export const navigationBarDataTestId = 'navigation-bar-item'

type NavigationBarItemProps = {
  menuItem: NavigationMenuItem
  currentPath: string
  navigateTo: () => void
}

const NavigationBarItem = ({ menuItem, currentPath, navigateTo }: NavigationBarItemProps) => {
  const isSelected = currentPath.includes(menuItem.path)
  const IconElement = menuItem.iconElement

  return (
    <Flex key={menuItem.page} {...tabCss(isSelected)}>
      <Flex {...itemBoxCss} onClick={navigateTo} onKeyDown={navigateTo} data-testid={navigationBarDataTestId}>
        <Flex {...iconBoxCss}>
          <IconElement fontSize="1.75em" />
        </Flex>
        <Flex {...labelCss}>{menuItem.label.toUpperCase()}</Flex>
      </Flex>
    </Flex>
  )
}

export default NavigationBarItem

const selectedColor = Shades.VERY_PALE
const notSelectedColor = Shades.VERY_DARK
export const NAVIGATION_BAR_ITEM_HEIGHT = 70



const tabCss = (isSelected: boolean) => {
  return {
    marginBottom: '10px',
    display: 'flex' as ChakraProps['display'],
    flexDirection: 'column' as ChakraProps['flexDirection'],
    justifyContent: 'start',
    alignItems: 'start',
    borderRadius: '6px',
    width: `${NAV_BAR_WIDTH - 8}px`,
    marginLeft: '4px',
    paddingTop: '10px',
    paddingBottom: '10px',
    height: `${NAVIGATION_BAR_ITEM_HEIGHT}px`,
    backgroundColor: isSelected ? selectedColor : notSelectedColor,
    color: isSelected ? notSelectedColor : selectedColor,
    '_hover': { backgroundColor: isSelected ? selectedColor : Shades.MEDIUM,
      color: isSelected ? notSelectedColor : notSelectedColor
    }
  }
}


const itemBoxCss = {
  display: 'flex' as ChakraProps['display'],
  flexDirection: 'column' as ChakraProps['flexDirection'],
  justifyContent: 'center',
  alignItems: 'center',
  width: `${NAV_BAR_WIDTH - 8}px`
}

const labelCss = {
  fontSize: '10px',
  fontWeight: 'bold' as ChakraProps['fontWeight'],
  marginTop: '4px'
}

const iconBoxCss = {
  display: 'flex' as ChakraProps['display'],
  flexDirection: 'column' as ChakraProps['flexDirection'],
  justifyContent: 'center',
  alignItems: 'center'
}