/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { HEADER_HEIGHT_WITH_TOOLS, HEADER_HEIGHT_WITH_TOOLS_DOUBLE_LINE, NAV_BAR_WIDTH } from '../../constants/layout'
import { recipesViewingManagementZIndex } from '../../constants/z-indexes'
import { ColorCodes } from '../../theme/theme'
import { ViewSizeContext } from '../view-size-service/ViewSizeProvider'
import { useContext } from 'react'

type RegularTopShowOrHideViewProps = {
  topShowOrHideContent: JSX.Element
  mainContent: JSX.Element
  isMultiPanel?: boolean
}

const RegularTopShowOrHideView = ({ topShowOrHideContent, mainContent }: RegularTopShowOrHideViewProps) => {
  const { windowWidth, isNarrowHeader } = useContext(ViewSizeContext)
  const width = windowWidth.current - NAV_BAR_WIDTH

  return (
    <div css={view}>
      <div css={page(width, isNarrowHeader)}>
        <div css={container}>
          <div css={topOuter}>
            <div css={topInner}>{topShowOrHideContent}</div>
          </div>
          {mainContent}
        </div>
      </div>
    </div>
  )
}

export default RegularTopShowOrHideView

const view = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow-x: hidden;
`

const page = (width: number, isNarrowHeader: boolean) => {
  return css`
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: 'start';
    width: ${width - NAV_BAR_WIDTH}px;
    margin-top: ${isNarrowHeader ? HEADER_HEIGHT_WITH_TOOLS_DOUBLE_LINE : HEADER_HEIGHT_WITH_TOOLS}px;
  `
}

const container = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
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
