/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import { FaHand } from 'react-icons/fa6'

type DraggableItemProps = {
  draggableContent: JSX.Element
  currentItemIndex: number
  // onStartMove: () => void
  onItemMoved: (originalIndexOfItemMoving: number, deltaY: number, isConfirm: boolean) => void
  translateY: number
  itemHeight: number
  shouldStop: boolean
  onMoveBgColor: string
  handColor: string
}

const DraggableItem = ({
  draggableContent,
  currentItemIndex,
  // onStartMove,
  itemHeight,
  translateY,
  onItemMoved,
  shouldStop,
  onMoveBgColor,
  handColor
}: DraggableItemProps) => {
  const [moveStartPosition, setMoveStartPosition] = React.useState({ x: 0, y: 0 })
  const [moveTranslateYStart, setMoveTranslateYStart] = React.useState(0)
  const [isMoving, setIsMoving] = React.useState(false)

  const ref = React.useRef(null)

  useEffect(() => {
    const element = ref.current as unknown as HTMLDivElement
    if (!element) return

    const deltaY = element.style.transform ? parseInt(element.style.transform?.split(', ')[1].split('px')[0]) : 0
    if (deltaY === translateY) return

    moveElementVertically(element, translateY)
  }, [translateY])

  useEffect(() => {
    if (!shouldStop) return
    setIsMoving(false)
    setMoveTranslateYStart(0)

    const element = ref.current as unknown as HTMLDivElement
    if (!element) return
    moveElementVertically(element, translateY)
    element.style.transition = 'transform 0ms'
  }, [shouldStop, translateY])

  const moveElementVertically = (element: HTMLDivElement, deltaY: number) => {
    element.style.transition = 'transform 100ms ease-in-out'
    element.style.transform = `translate(${0}px, ${deltaY}px)`
  }

  const onMouseDown = (event: React.MouseEvent) => {
    onMoveStart(event.clientX, event.clientY)
  }

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0]
    onMoveStart(touch.clientX, touch.clientY)
  }

  const onMoveStart = (deltaX: number, deltaY: number) => {
    setIsMoving(true)
    setMoveTranslateYStart(translateY)
    setMoveStartPosition({ x: deltaX, y: deltaY })
  }

  const onMove = (deltas: { clientX: number; clientY: number }) => {
    const element = ref.current as unknown as HTMLDivElement
    if (!element || !isMoving) return

    const deltaY = deltas.clientY - moveStartPosition.y
    element.style.zIndex = '1000'
    element.style.transform = `translate(${0}px, ${deltaY + moveTranslateYStart}px)`
    onItemMoved(currentItemIndex, deltaY, false)
  }

  const onMoveEnd = () => {
    setIsMoving(false)
    const ele = ref.current as unknown as HTMLDivElement
    if (!ele) return

    ele.style.zIndex = `${currentItemIndex}`
    const deltaY = parseInt(ele.style.transform.split(', ')[1].split('px')[0])
    onItemMoved(currentItemIndex, deltaY - moveTranslateYStart, true)
    setMoveStartPosition({ x: 0, y: 0 })
  }

  return (
    <div
      css={draggableCss(itemHeight, isMoving, onMoveBgColor)}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseMove={(event: React.MouseEvent) => onMove(event)}
      onMouseUp={onMoveEnd}
      onTouchStart={onTouchStart}
      onTouchMove={(event) => onMove(event.touches[0])}
      onTouchEnd={onMoveEnd}
    >
      {draggableContent}
      <FaHand size="25px" color={handColor} />
    </div>
  )
}

export default DraggableItem

const draggableCss = (itemHeight: number, isMoving: boolean, onMoveBgColor: string) => css`
  position: absolute;
  cursor: move;
  user-select: none;
  height: ${itemHeight}px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  background-color: ${isMoving ? onMoveBgColor : 'transparent'};
  border-radius: 6px;
  padding-right: 10px;
`
