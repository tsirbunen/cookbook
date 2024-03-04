/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { cardsViewMobileWidth } from '../../app-pages/recipes/recipes-display/PhotoCardRecipe'
import { navBarWidth } from '../../constants/constants'
import { recipesViewingManagementZIndex } from '../../constants/z-indexes'
import { ColorCodes } from '../../theme/theme'
import { ViewSizeContext, headerHeightWithTools } from '../view-size-service/ViewSizeProvider'
import { useContext } from 'react'

type RegularTopShowOrHideViewProps = {
  topShowOrHideContent: JSX.Element
  mainContent: JSX.Element
}

const RegularTopShowOrHideView = ({ topShowOrHideContent, mainContent }: RegularTopShowOrHideViewProps) => {
  const { windowWidth, isMobile } = useContext(ViewSizeContext)
  const width = windowWidth.current - navBarWidth

  return (
    <div css={page(isMobile, width)}>
      <div css={container(isMobile, false)}>
        <div css={outerCss}>
          <div css={boxCss}>{topShowOrHideContent}</div>
        </div>
        {mainContent}
      </div>
    </div>
  )
}

export default RegularTopShowOrHideView

const page = (isMobile: boolean, width: number) => {
  return css`
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: ${isMobile ? 'center' : 'start'};
    width: ${isMobile ? cardsViewMobileWidth : width - navBarWidth}px;
    margin-top: ${headerHeightWithTools}px;
  `
}

const container = (isMobile: boolean, isSplitView: boolean) => css`
  display: flex;
  flex: 1;
  flex-direction: ${isSplitView ? 'row' : 'column'};
  justify-content: start;
  align-items: ${isMobile ? 'center' : 'start'};
  width: 100%;
`

const outerCss = css`
  height: 100%;
  position: sticky;
  top: ${headerHeightWithTools}px;
  z-index: ${recipesViewingManagementZIndex};
  flex: 1;
  width: 100%;
`

const boxCss = css`
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
