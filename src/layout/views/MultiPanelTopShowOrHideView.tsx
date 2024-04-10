/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { HEADER_HEIGHT_WITH_TOOLS, NAV_BAR_WIDTH } from '../../constants/layout'
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
  const { windowWidth } = useContext(ViewSizeContext)
  const width = windowWidth.current - NAV_BAR_WIDTH

  return (
    <div css={outerCss(width)} data-testid={testId}>
      {topShowOrHideContent ? (
        <div css={topOuterCss}>
          <div css={topInnerCss}>{topShowOrHideContent}</div>
        </div>
      ) : null}
      <div css={mainCss}>{mainContent}</div>
    </div>
  )
}

export default MultiPanelTopShowOrHideView

const outerCss = (width: number) => css`
  margin-top: ${HEADER_HEIGHT_WITH_TOOLS}px;
  display: flex;
  flex-direction: column;
  width: ${width}px;
`

const mainCss = css`
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  flex: 1;
  .is-scrollLocked {
    overflow: hidden;
  }
`

const topOuterCss = css`
  position: sticky;
  top: ${HEADER_HEIGHT_WITH_TOOLS}px;
  z-index: ${recipesViewingManagementZIndex};
  width: 100%;
`

const topInnerCss = css`
  position: sticky;
  top: ${HEADER_HEIGHT_WITH_TOOLS}px;
  z-index: ${recipesViewingManagementZIndex};
  background-color: ${ColorCodes.VERY_PALE};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.35);
  flex: 1;
  height: 100%;
  padding-right: 15px;
`
