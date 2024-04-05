/** @jsxImportSource @emotion/react */
'use client'

import { useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { css } from '@emotion/react'
import NavigationBarItem from './NavigationBarItem'
import { navigationMenuItems } from '../router/router'
import { ViewSizeContext } from '../../layout/view-size-service/ViewSizeProvider'
import { ColorCodes } from '../../theme/theme'
import MenuIconWithoutAction from '../../widgets/header-with-optional-toggles/MenuIconWithoutAction'
import { HEADER_HEIGHT_REGULAR, HEADER_HEIGHT_WITH_TOOLS, NAV_BAR_WIDTH } from '../../constants/layout'
import { navigationBarZIndex } from '../../constants/z-indexes'

type DrawerNavigatorProps = {
  isTooSmallWindow: boolean
}

/**
 * Permanent vertical navigation bar on the left. Intended to be used when app use mode
 * is other than mobile.
 */
const NavigationBar = ({ isTooSmallWindow }: DrawerNavigatorProps) => {
  const { windowHeight, isHeaderWithTools, headerHeight } = useContext(ViewSizeContext)
  const router = useRouter()
  const pathname = usePathname()
  const isWithTools = isHeaderWithTools(pathname)
  const height = isWithTools ? headerHeight : HEADER_HEIGHT_REGULAR

  if (isTooSmallWindow) return null

  return (
    <div css={outerContainer(windowHeight)}>
      <div css={container(height)}>
        <MenuIconWithoutAction height={height} />
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
      </div>
    </div>
  )
}

export default NavigationBar

const outerContainer = (windowHeight: number) => {
  const headerHeight = HEADER_HEIGHT_WITH_TOOLS
  return css`
    z-index: ${navigationBarZIndex};
    height: ${windowHeight - headerHeight}px;
    width: ${NAV_BAR_WIDTH}px;
  `
}
const container = (headerHeight: number) => css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  height: 100%;
  background-color: ${ColorCodes.VERY_DARK};
  top: ${headerHeight}px;
  width: ${NAV_BAR_WIDTH}px;
  position: fixed;
`
