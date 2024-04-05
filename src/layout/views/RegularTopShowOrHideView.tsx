/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { HEADER_HEIGHT_WITH_TOOLS, NAV_BAR_WIDTH } from '../../constants/layout'
import { recipesViewingManagementZIndex } from '../../constants/z-indexes'
import { ColorCodes } from '../../theme/theme'
import { ViewSizeContext } from '../view-size-service/ViewSizeProvider'
import { useContext } from 'react'

type RegularTopShowOrHideViewProps = {
  topShowOrHideContent: JSX.Element
  mainContent: JSX.Element
  isMultiPanel?: boolean
  showFullHeightTools: boolean
}

const RegularTopShowOrHideView = ({
  topShowOrHideContent,
  mainContent,
  showFullHeightTools
}: RegularTopShowOrHideViewProps) => {
  const { windowWidth } = useContext(ViewSizeContext)
  const width = windowWidth.current - NAV_BAR_WIDTH

  return (
    <div css={viewCss}>
      <div css={pageCss(width)}>
        <div css={containerCss(showFullHeightTools)} id={'GGG'}>
          <div css={topOuterCss}>
            <div css={topInnerCss(showFullHeightTools)}>{topShowOrHideContent}</div>
          </div>
          {mainContent}
        </div>
      </div>
    </div>
  )
}

export default RegularTopShowOrHideView

const viewCss = css`
  height: 100%;
  width: 100%;
  display: flex;
  overflow-x: hidden;
`

const pageCss = (width: number) => {
  return css`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: ${width - NAV_BAR_WIDTH}px;
    margin-top: ${HEADER_HEIGHT_WITH_TOOLS}px;
  `
}

const containerCss = (showFullHeightTools: boolean) => css`
  display: flex;
  flex: ${showFullHeightTools ? 1 : undefined};
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
`

const topOuterCss = css`
  height: 100%;
  position: sticky;
  top: ${HEADER_HEIGHT_WITH_TOOLS}px;
  z-index: ${recipesViewingManagementZIndex};
  flex: 1;
  width: 100%;
`

const topInnerCss = (showFullHeightTools: boolean) => css`
  position: sticky;
  top: ${HEADER_HEIGHT_WITH_TOOLS}px;
  z-index: ${recipesViewingManagementZIndex};
  background-color: ${ColorCodes.VERY_PALE};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.35);
  height: ${showFullHeightTools ? '100%' : undefined};
  padding-right: 15px;
`
