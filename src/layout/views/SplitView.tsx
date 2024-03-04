/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { recipesViewingManagementZIndex } from '../../constants/z-indexes'
import { ColorCodes } from '../../theme/theme'
import { headerHeightWithTools } from '../view-size-service/ViewSizeProvider'

type SplitViewProps = {
  splitContent: JSX.Element
  mainContent: JSX.Element
}

const SplitView = ({ splitContent, mainContent }: SplitViewProps) => {
  return (
    <div css={containerWithScrollableRightPanelCss}>
      <div css={leftPanelContainerCss}>
        <div css={leftPanelScrollableCss}>{splitContent}</div>
      </div>

      <div css={preventOverflowCss}>{mainContent}</div>
    </div>
  )
}

export default SplitView

const preventOverflowCss = css`
  width: 100%;
  overflow-x: hidden;
`

const containerWithScrollableRightPanelCss = css`
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

const leftPanelContainerCss = css`
  height: 100%;
  position: sticky;
  top: 0px;
  flex-direction: column;
  z-index: ${recipesViewingManagementZIndex};
  flex: 1;
  background-color: ${ColorCodes.VERY_PALE};
  display: flex;
`

const leftPanelScrollableCss = css`
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  box-shadow: 2px 0px 8px -1px rgba(0, 0, 0, 0.24);
`
