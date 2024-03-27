/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { HEADER_HEIGHT_WITH_TOOLS, HEADER_HEIGHT_WITH_TOOLS_DOUBLE_LINE, NAV_BAR_WIDTH } from '../../constants/layout'
import { recipesViewingManagementZIndex } from '../../constants/z-indexes'
import { ColorCodes } from '../../theme/theme'
import { ViewSizeContext } from '../view-size-service/ViewSizeProvider'
import { useContext } from 'react'

type MultiPanelTopShowOrHideViewProps = {
  topShowOrHideContent: JSX.Element | null
  mainContent: JSX.Element
  testId: string
}

const MultiPanelTopShowOrHideView = ({
  topShowOrHideContent,
  mainContent,
  testId
}: MultiPanelTopShowOrHideViewProps) => {
  const { windowWidth, isNarrowHeader } = useContext(ViewSizeContext)
  const width = windowWidth.current - NAV_BAR_WIDTH

  return (
    <div css={outer(width, isNarrowHeader)} data-testid={testId}>
      {topShowOrHideContent ? (
        <div css={topOuter}>
          <div css={topInner}>{topShowOrHideContent}</div>
        </div>
      ) : null}
      <div css={main}>{mainContent}</div>
    </div>
  )
}

export default MultiPanelTopShowOrHideView

const outer = (width: number, isNarrowHeader: boolean) => css`
  margin-top: ${isNarrowHeader ? HEADER_HEIGHT_WITH_TOOLS_DOUBLE_LINE : HEADER_HEIGHT_WITH_TOOLS}px;
  display: flex;
  flex-direction: column;
  width: ${width}px;
`

const main = css`
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  flex: 1;
`

const topOuter = css`
  height: 100%;
  position: sticky;
  top: ${HEADER_HEIGHT_WITH_TOOLS}px;
  z-index: ${recipesViewingManagementZIndex};
  flex: 1;
  width: 100%;
`

const topInner = css`
  position: sticky;
  top: ${HEADER_HEIGHT_WITH_TOOLS}px;
  z-index: ${recipesViewingManagementZIndex};
  background-color: ${ColorCodes.VERY_PALE};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.24);
  flex: 1;
  height: 100%;
  padding-right: 15px;
`
