/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { ColorCodes } from '../../theme/theme'

type ResizerProps = {
  onResize: (deltaX: number) => void
}

/**
 * Vertical container component that detects mouse-down events together
 * with following horizontal mouse-move events. Also detects touch events.
 * When such events are detected, the "onResize" callback of props is executed
 * using the change in horizontal location as the parameter for the callback.
 */
const Resizer = ({ onResize }: ResizerProps) => {
  const [mouseIsDown, setMouseIsDown] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [touchStart, setTouchStart] = useState(0)

  useEffect(() => {
    if (mouseIsDown) {
      const onMouseMove = (event: MouseEvent) => {
        const deltaX = event.movementX
        if (mouseIsDown) onResize(deltaX)
      }

      window.addEventListener('mousemove', onMouseMove)
      return () => {
        window.removeEventListener('mousemove', onMouseMove)
      }
    } else if (isTouch) {
      const onTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0]
        const deltaX = (touch.clientX - touchStart) / 10
        if (isTouch) onResize(deltaX)
      }

      if (isTouch) window.addEventListener('touchmove', onTouchMove)

      return () => {
        window.removeEventListener('touchmove', onTouchMove)
      }
    }
  }, [mouseIsDown, isTouch, onResize])

  useEffect(() => {
    const onMouseUp = () => setMouseIsDown(false)
    window.addEventListener('mouseup', onMouseUp)

    const onTouchEnd = () => {
      setIsTouch(false)
      setTouchStart(0)
    }
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  const onMouseDown = () => setMouseIsDown(true)

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0]
    setTouchStart(touch.clientX)
    setIsTouch(true)
  }

  return <div css={resizer} onMouseDown={onMouseDown} onTouchStart={onTouchStart}></div>
}

export default Resizer

const resizeElementWidth = 5

const resizer = css`
  cursor: ew-resize;
  width: ${resizeElementWidth}px;
  height: 100%;
  background-color: ${ColorCodes.VERY_DARK};
`
