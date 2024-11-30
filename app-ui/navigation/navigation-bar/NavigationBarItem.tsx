/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { NAV_BAR_WIDTH } from '../../constants/layout'
import { Shades } from '../../constants/shades'
import type { NavigationMenuItem } from '../router/router'

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
    <div key={menuItem.page} css={tabCss(isSelected)}>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Implement later */}
      <div css={itemContainer} onClick={navigateTo} data-testid={navigationBarDataTestId}>
        <div css={iconContainer}>
          <IconElement fontSize="1.75em" />
        </div>
        <div css={label}>{menuItem.label.toUpperCase()}</div>
      </div>
    </div>
  )
}

export default NavigationBarItem

const selectedColor = Shades.VERY_PALE
const notSelectedColor = Shades.VERY_DARK
export const NAVIGATION_BAR_ITEM_HEIGHT = 70

const tabCss = (isSelected: boolean) => css`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  border-radius: 6px;
  width: ${NAV_BAR_WIDTH - 8}px;
  margin-left: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: ${NAVIGATION_BAR_ITEM_HEIGHT}px;

  background-color: ${isSelected ? selectedColor : notSelectedColor};
  &:hover {
    background-color: ${isSelected ? selectedColor : Shades.MEDIUM};
  }
  color: ${isSelected ? notSelectedColor : selectedColor};
  &:hover {
    color: ${isSelected ? notSelectedColor : notSelectedColor};
  }
`

const itemContainer = css`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  width: ${NAV_BAR_WIDTH - 8}px;
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
