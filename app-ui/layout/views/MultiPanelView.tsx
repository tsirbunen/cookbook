/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useContext } from 'react'
import { HEADER_HEIGHT, NAV_BAR_WIDTH } from '../../constants/layout'
import { Shades } from '../../constants/shades'
import { ViewSizeContext } from '../view-size-service/ViewSizeProvider'

type MultiPanelViewProps = {
  content: JSX.Element
  testId: string
}

const MultiPanelView = ({ content, testId }: MultiPanelViewProps) => {
  const { windowWidth } = useContext(ViewSizeContext)
  const width = windowWidth.current - NAV_BAR_WIDTH

  return (
    <div css={outerCss(width)} data-testid={testId}>
      <div css={mainCss}>{content}</div>
    </div>
  )
}

export default MultiPanelView

const outerCss = (width: number) => css`
  margin-top: ${HEADER_HEIGHT}px;
  display: flex;
  flex-direction: column;
  width: ${width}px;
  background-color: ${Shades.VERY_DARK};
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
