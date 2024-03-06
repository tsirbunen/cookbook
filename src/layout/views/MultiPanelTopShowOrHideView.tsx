/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { navBarWidth } from '../../constants/constants'
import { recipesViewingManagementZIndex } from '../../constants/z-indexes'
import { ColorCodes } from '../../theme/theme'
import {
  ViewSizeContext,
  headerHeightWithTools,
  headerHeightWithToolsDoubleLine
} from '../view-size-service/ViewSizeProvider'
import { useContext } from 'react'

type MultiPanelTopShowOrHideViewProps = {
  topShowOrHideContent: JSX.Element
  mainContent: JSX.Element
}

const MultiPanelTopShowOrHideView = ({ topShowOrHideContent, mainContent }: MultiPanelTopShowOrHideViewProps) => {
  const { windowWidth, isMobile, isNarrowHeader } = useContext(ViewSizeContext)
  const width = isMobile ? windowWidth.current : windowWidth.current - navBarWidth

  return (
    <div css={outer(width, isMobile, isNarrowHeader)}>
      <div css={topOuter}>
        <div css={topInner}>{topShowOrHideContent}</div>
      </div>
      <div css={main}>{mainContent}</div>
    </div>
  )
}

export default MultiPanelTopShowOrHideView

const outer = (width: number, isMobile: boolean, isNarrowHeader: boolean) => css`
  margin-top: ${isMobile || isNarrowHeader ? headerHeightWithToolsDoubleLine : headerHeightWithTools}px;
  display: flex;
  flex-direction: column;
  width: ${width}px;
`

const main = css`
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
`

const topOuter = css`
  height: 100%;
  position: sticky;
  top: ${headerHeightWithTools}px;
  z-index: ${recipesViewingManagementZIndex};
  flex: 1;
  width: 100%;
`

const topInner = css`
  position: sticky;
  top: ${headerHeightWithTools}px;
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
