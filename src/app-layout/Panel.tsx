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
 */
const Panel = ({ children, width, onResize }: PanelProps) => {
  const panelCss = width ? panelWithWidth(width) : panel

  return (
    <>
      <div css={panelCss}>
        <div>{children}</div>
      </div>
      {onResize ? <Resizer onResize={onResize} /> : null}
    </>
  )
}

const panelWithWidth = (width: number) => css`
  width: ${width}px;
  display: flex;
  flex-direction: column;
`
const panel = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export default Panel
