'use client'

import { type ChakraProps, Flex } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'
import { HEADER_HEIGHT, NAV_BAR_WIDTH } from '../constants/layout'
import { Shades } from '../constants/shades'
import { navigationBarZIndex } from '../constants/z-indexes'
import { ViewSizeContext } from '../layout/view-size-service/ViewSizeProvider'
import { navigationMenuItems } from './page-paths'
import NavigationBarItem from './NavigationBarItem'
import { TbMenu2 } from 'react-icons/tb'

type NavigationBarProps = {
  isTooSmallWindow: boolean
}

/**
 * Permanent vertical navigation bar on the left. Intended to be used when app use mode
 * is other than mobile.
 */
const NavigationBar = ({ isTooSmallWindow }: NavigationBarProps) => {
  const { windowHeight } = useContext(ViewSizeContext)
  const router = useRouter()
  const pathname = usePathname()

  if (isTooSmallWindow) return null

  return (
    <Flex {...outerCss(windowHeight)}>
      <Flex {...innerCss(HEADER_HEIGHT)}>

      <Flex {...menuBoxCss(HEADER_HEIGHT)}>
        <Flex {...menuCss}>
          <TbMenu2 />
        </Flex>
      </Flex>
      
        {navigationMenuItems.map((menuItem) => {
          return (
            <NavigationBarItem
              menuItem={menuItem}
              currentPath={pathname ?? ''}
              navigateTo={() => router.push(menuItem.path)}
              key={menuItem.label}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default NavigationBar

const outerCss = (windowHeight: number) => {
  return {
    zIndex: navigationBarZIndex,
    height: `${windowHeight - HEADER_HEIGHT}px`,
    width: `${NAV_BAR_WIDTH}px`
  }
}

const innerCss = (headerHeight: number) => {
  return {
    display: 'flex' as ChakraProps['display'],
    flexDirection: 'column' as ChakraProps['flexDirection'],
    justifyContent: 'start',
    alignItems: 'start',
    height: '100%',
    backgroundColor: Shades.VERY_DARK,
    top: `${headerHeight}px`,
    width: `${NAV_BAR_WIDTH}px`,
    position: 'fixed' as ChakraProps['position']
  }
}

const menuBoxCss = (height: number) => {
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

const menuCss = {
  display: 'flex' as ChakraProps['display'],
  flex: 1,
  flexDirection: 'row' as ChakraProps['flexDirection'],
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2.2em',
  color: Shades.VERY_PALE,
  height: '100%'
}
