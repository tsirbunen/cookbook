/** @jsxImportSource @emotion/react */
'use client'

import { useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { css } from '@emotion/react'
import NavigationBarItem from './NavigationBarItem'
import { navigationMenuItems } from '../router/router'
import { ViewSizeContext } from '../../layout/view-size-service/ViewSizeProvider'
import { ColorCodes } from '../../theme/theme'
import MenuIconWithoutAction from './MenuIconWithoutAction'
import { HEADER_HEIGHT, NAV_BAR_WIDTH } from '../../constants/layout'
import { navigationBarZIndex } from '../../constants/z-indexes'

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
    <div css={outerContainer(windowHeight)}>
      <div css={container(HEADER_HEIGHT)}>
        <MenuIconWithoutAction height={HEADER_HEIGHT} />
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
  const headerHeight = HEADER_HEIGHT
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
