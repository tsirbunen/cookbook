/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { NavigationMenuItem } from '../router/router'
import { navBarWidth } from '../../app-layout/ViewSizeProvider'
import { ColorCodes } from '../../theme/theme'

export const navigationBarDataCy = 'navigation-bar-item'

type NavigationBarItemProps = {
  menuItem: NavigationMenuItem
  currentPath: string
  navigateTo: () => void
}

const NavigationBarItem = ({ menuItem, currentPath, navigateTo }: NavigationBarItemProps) => {
  const isSelected = menuItem.path === currentPath
  const IconElement = menuItem.iconElement

  return (
    <div key={menuItem.page} css={itemContainer(isSelected)} onClick={navigateTo} data-cy={navigationBarDataCy}>
      <div css={iconContainer}>
        <IconElement fontSize="1.75em" />
      </div>
      <div css={label}>{menuItem.label.toUpperCase()}</div>
    </div>
  )
}

export default NavigationBarItem

const darkColor = ColorCodes.VERY_DARK
const paleColor = ColorCodes.VERY_PALE

const itemContainer = (isSelected: boolean) => css`
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: ${navBarWidth - 8}px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${isSelected ? darkColor : paleColor};
  &:hover {
    background-color: ${isSelected ? darkColor : ColorCodes.MEDIUM};
  }
  color: ${isSelected ? paleColor : darkColor};
  &:hover {
    color: ${isSelected ? paleColor : paleColor};
  }
`

const label = css`
  font-size: 10px;
  font-weight: bold;
  margin-top: 4px;
`

const iconContainer = css`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
