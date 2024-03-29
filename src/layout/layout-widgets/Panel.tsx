/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Resizer from './Resizer'

type PanelProps = {
  children: JSX.Element
  width: number
  onResize?: (deltaX: number) => void
}

/**
 * Column container with limited width for child components. Optionally contains
 * a resizer element (in cases where an "onResize" callback is provided in props).
 * Panel has a vertical scroll bar (to enable scrolling this single panel only).
 */
const Panel = ({ children, width, onResize }: PanelProps) => {
  const panelCss = panel(width)

  return (
    <>
      <div css={panelCss}>{children}</div>
      {onResize ? <Resizer onResize={onResize} /> : null}
    </>
  )
}

const panel = (width?: number) =>
  css`
    width: ${width}px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
    overflow-x: hidden;
    align-items: start;
    justify-content: start;
  `

export default Panel
