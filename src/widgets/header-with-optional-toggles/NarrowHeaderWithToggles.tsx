/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ColorCodes } from '../../theme/theme'
import { NAV_BAR_WIDTH } from '../../constants/layout'
import { headerZIndex } from '../../constants/z-indexes'
import { toolsElementId } from './HeaderWithOptionalToggles'
import { APP_TITLE } from '../../constants/widgets'

type NarrowHeaderWithTogglesProps = {
  label: string
  height: number
}

const NarrowHeaderWithToggles = ({ label, height }: NarrowHeaderWithTogglesProps) => {
  return (
    <div css={outerCss(height)}>
      <div css={innerCss}>
        <div css={titleCss}>{`${APP_TITLE} / ${label}`}</div>
        <div css={toolsCss}>
          <div id={toolsElementId} />
        </div>
      </div>
    </div>
  )
}

export default NarrowHeaderWithToggles

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
  margin-left: ${NAV_BAR_WIDTH};
`

const innerCss = css`
  display: flex;
  flex-direction: column;
  margin-left: ${NAV_BAR_WIDTH}px;
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
