/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ColorCodes } from '../../theme/theme'
import NavigationDrawer from '../../navigation/navigation-drawer/NavigationDrawer'
import { appTitle } from '../../../app/page'
import { headerZIndex } from '../../constants/z-indexes'

export const toolsElementId = 'toolsElementId'

type MobileHeaderWithOptionalTogglesProps = {
  label: string
  noTools: boolean
  height: number
}

const MobileHeaderWithOptionalToggles = ({ label, height, noTools }: MobileHeaderWithOptionalTogglesProps) => {
  return (
    <div css={outerCss(height)}>
      <div css={drawerCss}>
        <NavigationDrawer />
      </div>
      <div css={innerCss}>
        <div css={titleCss(noTools)}>{`${appTitle} / ${label}`}</div>
        <div id={toolsElementId} />
      </div>
      <div css={drawerCss} />
    </div>
  )
}

export default MobileHeaderWithOptionalToggles

const drawerCss = css`
  width: 35px;
`

const outerCss = (height: number) => css`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: ${headerZIndex};
  height: ${height}px;
  background-color: ${ColorCodes.VERY_DARK};
`

const titleCss = (noTools: boolean) => css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: ${noTools ? 'center' : 'start'};
  margin-left: 10px;
  font-size: 1.5em;
  color: ${ColorCodes.VERY_PALE};
  font-weight: bold;
`

const innerCss = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`
