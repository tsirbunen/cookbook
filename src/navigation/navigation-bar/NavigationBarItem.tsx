/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { NavigationMenuItem } from '../router/router'
import { ColorCodes } from '../../theme/theme'
import { NAV_BAR_WIDTH } from '../../constants/layout'

export const navigationBarDataTestId = 'navigation-bar-item'

type NavigationBarItemProps = {
  menuItem: NavigationMenuItem
  currentPath: string
  navigateTo: () => void
}

const NavigationBarItem = ({ menuItem, currentPath, navigateTo }: NavigationBarItemProps) => {
  const isSelected = menuItem.path === currentPath
  const IconElement = menuItem.iconElement

  return (
    <div key={menuItem.page} css={itemContainer(isSelected)} onClick={navigateTo} data-testid={navigationBarDataTestId}>
      <div css={iconContainer}>
        <IconElement fontSize="1.75em" />
      </div>
      <div css={label}>{menuItem.label.toUpperCase()}</div>
    </div>
  )
}

export default NavigationBarItem

const selectedColor = ColorCodes.VERY_PALE
const notSelectedColor = ColorCodes.VERY_DARK

const itemContainer = (isSelected: boolean) => css`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: ${NAV_BAR_WIDTH - 8}px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${isSelected ? selectedColor : notSelectedColor};
  &:hover {
    background-color: ${isSelected ? selectedColor : ColorCodes.MEDIUM};
  }
  color: ${isSelected ? notSelectedColor : selectedColor};
  &:hover {
    color: ${isSelected ? notSelectedColor : notSelectedColor};
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
