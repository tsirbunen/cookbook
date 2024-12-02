import { type ChakraProps, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FaHand } from 'react-icons/fa6'

type DraggableItemProps = {
  draggableContent: JSX.Element
  currentItemIndex: number
  onItemMoved: (originalIndexOfItemMoving: number, deltaY: number, isConfirm: boolean) => void
  translateY: number
  itemHeight: number
  shouldStop: boolean
  onMoveBgColor: string
  handColor: string
  itemsCount: number
}

const DraggableItem = ({
  draggableContent,
  currentItemIndex,
  itemHeight,
  translateY,
  onItemMoved,
  shouldStop,
  onMoveBgColor,
  handColor,
  itemsCount
}: DraggableItemProps) => {
  const [moveStartPosition, setMoveStartPosition] = React.useState({ x: 0, y: 0 })
  const [moveTranslateYStart, setMoveTranslateYStart] = React.useState(0)
  const [isMoving, setIsMoving] = React.useState(false)

  const ref = React.useRef(null)

  useEffect(() => {
    const element = ref.current as unknown as HTMLDivElement
    if (!element) return

    const deltaY = element.style.transform ? Number.parseInt(element.style.transform?.split(', ')[1].split('px')[0]) : 0
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
    const newTranslateY = deltaY + moveTranslateYStart
    const isAllowed = newTranslateY >= 0 && newTranslateY <= itemHeight * (itemsCount - 1)
    if (!isAllowed) onMoveEnd()

    element.style.zIndex = '1000'
    element.style.transform = `translate(${0}px, ${deltaY + moveTranslateYStart}px)`
    onItemMoved(currentItemIndex, deltaY, false)
  }

  const onMoveEnd = () => {
    if (!isMoving) return

    setIsMoving(false)
    const ele = ref.current as unknown as HTMLDivElement
    if (!ele) return

    ele.style.zIndex = `${currentItemIndex}`
    const deltaY = Number.parseInt(ele.style.transform.split(', ')[1].split('px')[0])
    onItemMoved(currentItemIndex, deltaY - moveTranslateYStart, true)
    setMoveStartPosition({ x: 0, y: 0 })
  }

  return (
    <Flex
      {...draggableCss(itemHeight, isMoving, onMoveBgColor)}
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
    </Flex>
  )
}

export default DraggableItem

const draggableCss = (itemHeight: number, isMoving: boolean, onMoveBgColor: string) => {
  return {
    position: 'absolute' as ChakraProps['position'],
    cursor: 'move',
    userSelect: 'none' as ChakraProps['userSelect'],
    height: `${itemHeight}px`,
    width: '100%',
    display: 'flex',
    flexDirection: 'row' as ChakraProps['flexDirection'],
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: isMoving ? onMoveBgColor : 'transparent',
    borderRadius: '6px',
    paddingRight: '10px'
  }
}
