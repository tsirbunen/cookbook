/** @jsxImportSource @emotion/react */
'use client'

import { useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { css } from '@emotion/react'
import NavigationBarItem from './NavigationBarItem'
import { navigationMenuItems } from '../router/router'
import { navBarWidth, ViewSizeContext } from '../../contexts/ViewSizeContext'
import { ColorCodes } from '../../theme/theme'
import { headerHeight } from '../../components/header/Header'

type DrawerNavigatorProps = {
  isMobile: boolean
}

/**
 * Permanent vertical navigation bar. Intended to be used when app use mode
 * is other than mobile.
 */
const NavigationBar = ({ isMobile }: DrawerNavigatorProps) => {
  const { windowHeight } = useContext(ViewSizeContext)
  const router = useRouter()
  const pathname = usePathname()

  if (isMobile) return null

  return (
    <div css={outerContainer(windowHeight)}>
      <div css={container}>
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

const outerContainer = (windowHeight: number) => css`
  width: ${navBarWidth}px;
  height: ${windowHeight - headerHeight}px;
  background-color: ${ColorCodes.VERY_PALE};
  border-right-color: ${ColorCodes.DARK};
`

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: ${navBarWidth - 1}px;
  height: 100%;
  background-color: ${ColorCodes.VERY_PALE};
`
