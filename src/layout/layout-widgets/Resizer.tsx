/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

type ResizerProps = {
  onResize: (deltaX: number) => void
}

/**
 * Vertical container component that detects mouse-down events together
 * with following horizontal mouse-move events. When such events are
 * detected, the "onResize" callback of props is executed using the
 * change in horizontal location as the parameter for the callback.
 */
const Resizer = ({ onResize }: ResizerProps) => {
  const [mouseIsDown, setMouseIsDown] = useState(false)

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const deltaX = event.movementX
      if (mouseIsDown) onResize(deltaX)
    }

    if (mouseIsDown) {
      window.addEventListener('mousemove', onMouseMove)
    }

    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [mouseIsDown, onResize])

  useEffect(() => {
    const onMouseUp = () => setMouseIsDown(false)
    window.addEventListener('mouseup', onMouseUp)
    return () => window.removeEventListener('mouseup', onMouseUp)
  }, [])

  const onMouseDown = () => setMouseIsDown(true)

  // return (
  //   <div>
  //     <div css={resizer} onMouseDown={onMouseDown}></div>
  //   </div>
  // )
  return <div css={resizer} onMouseDown={onMouseDown}></div>
}

export default Resizer

const resizeElementWidth = 3

const resizer = css`
  cursor: ew-resize;
  width: ${resizeElementWidth}px;
  height: 100%;
`
