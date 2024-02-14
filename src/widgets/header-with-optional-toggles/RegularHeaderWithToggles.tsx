/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ColorCodes } from '../../theme/theme'
import { appTitle } from '../../../app/page'
import { navBarWidth } from '../../constants/constants'
import { headerZIndex } from '../../constants/z-indexes'

export const toolsElementId = 'toolsElementId'

type RegularHeaderWithTogglesProps = {
  label: string
  height: number
}

const RegularHeaderWithToggles = ({ label, height }: RegularHeaderWithTogglesProps) => {
  return (
    <div css={outerCss(height)}>
      <div css={middleCss}>
        <div css={innerCss}>
          <div css={titleCss}>{`${appTitle} / ${label}`}</div>
          <div css={toolsCss}>
            <div id={toolsElementId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegularHeaderWithToggles

const outerCss = (height: number) => css`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  padding-left: ${navBarWidth}px;
  z-index: ${headerZIndex};
  height: ${height}px;
  background-color: ${ColorCodes.VERY_DARK};
`

const middleCss = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: space-between;
`

const innerCss = css`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const titleCss = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  font-size: 1.5em;
  width: 100%;
  color: ${ColorCodes.VERY_PALE};
  font-weight: bold;
  padding-left: ${navBarWidth};
`

const toolsCss = css`
  margin-top: 10px;
  margin-right: 10px;
`
