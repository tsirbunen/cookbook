/** @jsxImportSource @emotion/react */

import { TbMenu2 } from 'react-icons/tb'
import { ColorCodes } from '../../theme/theme'
import { css } from '@emotion/react'
import { navBarWidth } from '../../contexts/ViewSizeContext'

const MenuIconWithoutAction = () => {
  return (
    <div css={iconOuterContainer}>
      <div css={iconInnerContainer}>
        <TbMenu2 />
      </div>
    </div>
  )
}

export default MenuIconWithoutAction

const iconOuterContainer = css`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: ${navBarWidth}px;
  background-color: ${ColorCodes.VERY_PALE};
`
const iconInnerContainer = css`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  font-size: 2.2em;
  color: ${ColorCodes.DARK};
`
