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
import { headerHeightRegular, headerHeightWithTools, navBarWidth } from '../../constants/constants'
import { navigationBarZIndex } from '../../constants/z-indexes'

type DrawerNavigatorProps = {
  isMobile: boolean
}

/**
 * Permanent vertical navigation bar on the left. Intended to be used when app use mode
 * is other than mobile.
 */
const NavigationBar = ({ isMobile }: DrawerNavigatorProps) => {
  const { windowHeight, isHeaderWithTools, headerHeight } = useContext(ViewSizeContext)
  const router = useRouter()
  const pathname = usePathname()
  const isWithTools = isHeaderWithTools(pathname)
  const height = isWithTools ? headerHeight : headerHeightRegular

  if (isMobile) return null

  return (
    <div css={outerContainer(windowHeight, isMobile)}>
      <div css={container(isMobile, height)}>
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

const outerContainer = (windowHeight: number, isMobile: boolean) => {
  const headerHeight = isMobile ? headerHeightRegular : headerHeightWithTools
  return css`
    z-index: ${navigationBarZIndex};
    height: ${windowHeight - headerHeight}px;
    background-color: ${ColorCodes.VERY_DARK};
    border-right-color: ${ColorCodes.VERY_DARK};
    width: ${navBarWidth}px;
  `
}
const container = (isMobile: boolean, headerHeight: number) => css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  background-color: ${ColorCodes.VERY_DARK};
  top: ${headerHeight}px;
  width: ${navBarWidth}px;
  position: fixed;
`
