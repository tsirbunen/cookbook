/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import React from 'react'

// https://phuoc.ng/collection/react-drag-drop/make-a-given-element-draggable/
// https://phuoc.ng/collection/react-drag-drop/make-an-element-draggable-on-touchscreen-devices/
// https://phuoc.ng/collection/react-drag-drop/create-a-custom-draggable-hook/

const DraggableContent = ({ children }: { children: JSX.Element }) => {
  const [{ dx, dy }, setOffset] = React.useState({ dx: 0, dy: 0 })
  const [startPos, setStartPos] = React.useState({ x: 0, y: 0 })
  const [isMouseDown, setMouseDown] = React.useState(false)
  // const eleRef = React.useRef<React.MutableRefObject<HTMLDivElement>>(null)
  const eleRef = React.useRef(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDown(true)
    setStartPos({
      x: e.clientX - dx,
      y: e.clientY - dy
    })
  }

  // https://phuoc.ng/collection/react-drag-drop/make-a-given-element-draggable/
  const handleMouseMove = (e: React.MouseEvent) => {
    const ele = eleRef.current as unknown as HTMLDivElement
    if (!ele || !isMouseDown) {
      return
    }

    // How far the mouse has been moved
    const dx = 0 //e.clientX - startPos.x
    const dy = e.clientY - startPos.y

    // Set the position of element
    ele.style.transform = `translate(${dx}px, ${dy}px)`

    // Reassign the position of mouse
    setOffset({ dx, dy })
  }

  const handleMouseUp = () => {
    setMouseDown(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]

    const startPos = {
      x: touch.clientX - dx,
      y: touch.clientY - dy
    }

    const handleTouchMove = (e: TouchEvent) => {
      const ele = eleRef.current as unknown as HTMLDivElement
      if (!ele) {
        return
      }
      const touch = e.touches[0]
      const dx = 0 //touch.clientX - startPos.x
      const dy = touch.clientY - startPos.y

      ele.style.transform = `translate(${dx}px, ${dy}px)`
      setOffset({ dx, dy })
    }

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }

    document.addEventListener('touchmove', handleTouchMove as EventListener)
    document.addEventListener('touchend', handleTouchEnd)
  }

  return (
    <div css={containerCss}>
      <div
        css={draggableCss}
        ref={eleRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
      >
        {children}
      </div>
    </div>
  )
}

export default DraggableContent

const containerCss = css`
  position: relative;
`

const draggableCss = css`
  /* position: absolute; */
  cursor: move;
  user-select: none;
`
