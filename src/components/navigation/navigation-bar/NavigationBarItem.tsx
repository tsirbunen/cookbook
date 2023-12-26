/** @jsxImportSource @emotion/react */
import { navBarWidth } from '../../../contexts/ViewSizeContext'
import { ColorCodes } from '../../../theme/theme'
import { css } from '@emotion/react'
import { NavigationMenuItem } from '../router/router'

type NavigationBarItemProps = {
  menuItem: NavigationMenuItem
  currentPath: string
  navigateTo: (target: string) => void
}

const NavigationBarItem = ({ menuItem, currentPath, navigateTo }: NavigationBarItemProps) => {
  const isSelected = menuItem.path === currentPath
  const IconElement = menuItem.iconElement

  return (
    <div
      key={menuItem.page}
      css={itemContainer(isSelected)}
      onClick={() => navigateTo(menuItem.path)}
    >
      <div css={iconContainer}>
        <IconElement fontSize="1.75em" />
      </div>
      <div css={label}>{menuItem.label.toUpperCase()}</div>
    </div>
  )
}

export default NavigationBarItem

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
  background-color: ${isSelected ? ColorCodes.DARK : ColorCodes.VERY_PALE};
  &:hover {
    background-color: ${isSelected ? ColorCodes.DARK : ColorCodes.MEDIUM};
  }
  color: ${isSelected ? ColorCodes.VERY_PALE : ColorCodes.DARK};
  &:hover {
    color: ${isSelected ? ColorCodes.VERY_PALE : ColorCodes.VERY_PALE};
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
