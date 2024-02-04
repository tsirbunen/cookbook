/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ColorCodes } from '../../theme/theme'
import { appTitle } from '../../../app/page'
import { navBarWidth } from '../../constants/constants'
import { headerZIndex } from '../../constants/z-indexes'

export const toolsElementId = 'toolsElementId'

type NarrowHeaderWithToolsProps = {
  label: string
  height: number
}

const NarrowHeaderWithTools = ({ label, height }: NarrowHeaderWithToolsProps) => {
  return (
    <div css={outerCss(height)}>
      <div css={innerCss}>
        <div css={titleCss}>{`${appTitle} / ${label}`}</div>
        <div css={toolsCss}>
          <div id={toolsElementId} />
        </div>
      </div>
    </div>
  )
}

export default NarrowHeaderWithTools

const outerCss = (height: number) => css`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: ${headerZIndex};
  height: ${height}px;
  background-color: ${ColorCodes.VERY_DARK};
  margin-left: ${navBarWidth};
`

const innerCss = css`
  display: flex;
  flex-direction: column;
  margin-left: ${navBarWidth}px;
  padding-left: 10px;
`

const titleCss = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 5px;
  font-size: 1.5em;
  color: ${ColorCodes.VERY_PALE};
  font-weight: bold;
  margin-top: 5px;
`

const toolsCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`
