/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { TbMenu2 } from 'react-icons/tb'
import { NAV_BAR_WIDTH } from '../../constants/layout'
import { Shades } from '../../constants/shades'

type MenuIconWithoutActionProps = {
  height: number
}

const MenuIconWithoutAction = ({ height }: MenuIconWithoutActionProps) => {
  return (
    <div css={iconOuterContainer(height)}>
      <div css={iconInnerContainer}>
        <TbMenu2 />
      </div>
    </div>
  )
}

export default MenuIconWithoutAction

const iconOuterContainer = (height: number) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${NAV_BAR_WIDTH}px;
  background-color: ${Shades.VERY_DARK};
  position: fixed;
  top: 0px;
  height: ${height}px;
  flex: 1;
`
const iconInnerContainer = css`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 2.2em;
  color: ${Shades.VERY_PALE};
  height: 100%;
`
