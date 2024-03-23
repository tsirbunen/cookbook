/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { recipesViewingManagementZIndex } from '../../constants/z-indexes'
import { ColorCodes } from '../../theme/theme'
import { headerHeightWithTools } from '../../constants/constants'

type SplitViewProps = {
  splitContent: JSX.Element
  mainContent: JSX.Element
  hideSplit: boolean
}

const SplitView = ({ splitContent, mainContent, hideSplit }: SplitViewProps) => {
  return (
    <div css={view}>
      <div css={container}>
        <div css={splitOuter}>
          <div css={splitScrollable(!hideSplit)}>{splitContent}</div>
        </div>

        <div css={preventOverflow}>{mainContent}</div>
      </div>
    </div>
  )
}

export default SplitView

const view = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-x: hidden;
`

const preventOverflow = css`
  width: 100%;
  overflow-x: hidden;
`

const container = css`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 100%;
  overflow: scroll;
  margin-top: ${headerHeightWithTools}px;
  overflow-x: hidden;
`

const splitOuter = css`
  height: 100%;
  position: sticky;
  top: 0px;
  flex-direction: column;
  z-index: ${recipesViewingManagementZIndex};
  flex: 1;
  background-color: ${ColorCodes.VERY_PALE};
  display: flex;
`

const splitScrollable = (showScrollBar: boolean) => css`
  height: 100%;
  overflow: ${showScrollBar ? 'scroll' : undefined};
  overflow-x: hidden;
  box-shadow: 2px 0px 8px -1px rgba(0, 0, 0, 0.24);
`
