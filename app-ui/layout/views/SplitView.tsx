/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { HEADER_HEIGHT } from '../../constants/layout'
import { Shades } from '../../constants/shades'
import { recipesViewingManagementZIndex } from '../../constants/z-indexes'

type SplitViewProps = {
  splitContent: JSX.Element
  mainContent: JSX.Element | null
  hideSplit: boolean
  testId?: string
}

const SplitView = ({ splitContent, mainContent, hideSplit, testId }: SplitViewProps) => {
  if (!mainContent) return null

  return (
    <div css={view} data-testid={testId}>
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
  margin-top: ${HEADER_HEIGHT}px;
  overflow-x: hidden;
`

const splitOuter = css`
  height: 100%;
  position: sticky;
  top: 0px;
  flex-direction: column;
  z-index: ${recipesViewingManagementZIndex};
  flex: 1;
  background-color: ${Shades.VERY_DARK};
  display: flex;
`

const splitScrollable = (showScrollBar: boolean) => css`
  height: 100%;
  overflow: ${showScrollBar ? 'scroll' : undefined};
  overflow-x: hidden;
  box-shadow: 2px 0px 10px 1px rgba(0, 0, 0, 0.35);
  padding-right: ${showScrollBar ? 15 : 0}px;
  width: ${showScrollBar ? '100%' : '0px'};
`
