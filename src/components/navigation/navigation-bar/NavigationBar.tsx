/** @jsxImportSource @emotion/react */

import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { navBarWidth, ViewSizeContext } from '../../../contexts/ViewSizeContext'
import { ColorCodes } from '../../../theme/theme'
import { headerHeight } from '../../header/Header'
import NavigationBarItem from './NavigationBarItem'
import { navigationMenuItems } from '../router/router'

type DrawerNavigatorProps = {
  isMobile: boolean
}

/**
 * Permanent vertical navigation bar. Intended to be used when app use mode
 * is other than mobile.
 */
const NavigationBar = ({ isMobile }: DrawerNavigatorProps) => {
  const { windowHeight } = useContext(ViewSizeContext)
  const navigateTo = useNavigate()
  const location = useLocation()

  if (isMobile) return null

  const currentPath = location.pathname

  return (
    <div css={outerContainer(windowHeight)}>
      <div css={container}>
        {navigationMenuItems.map((menuItem) => {
          return (
            <NavigationBarItem
              menuItem={menuItem}
              currentPath={currentPath}
              navigateTo={navigateTo}
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
