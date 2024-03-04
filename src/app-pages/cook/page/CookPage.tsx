/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import CookingProvider from './CookingProvider'
import CookingContent from './CookingContent'
import { Page } from '../../../navigation/router/router'
import { ViewSizeContext, headerHeightWithTools } from '../../../layout/view-size-service/ViewSizeProvider'
import { navBarWidth } from '../../../constants/constants'
import { useContext } from 'react'

const CookPage = () => {
  const { windowWidth, isMobile, windowHeight } = useContext(ViewSizeContext)
  const width = isMobile ? windowWidth.current - navBarWidth : windowWidth.current

  return (
    <CookingProvider>
      <div css={container(width, windowHeight - headerHeightWithTools)} data-testid={`${Page.COOK}-page`}>
        <CookingContent />
      </div>
    </CookingProvider>
  )
}

export default CookPage

const container = (width: number, height: number) => css`
  margin-top: ${headerHeightWithTools}px;
  padding-left: ${navBarWidth}px;
  display: flex;
  width: ${width}px;
  height: ${height}px;
`
