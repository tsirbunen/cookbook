import { type ChakraProps, Flex } from '@chakra-ui/react'
import { range } from 'lodash'
import { type ReactElement, useEffect, useState } from 'react'
import DraggableItem from './DraggableItem'
import { ListUpdater } from './list-updater'
import {
  getInitialTranslateYs,
  getUpdatedKeyOrder,
  getUpdatedTranslateYs,
  getUpdatedVisualIndexOrder,
  getVisualIndexDeltas
} from './utils'

export type ItemListData = { current: ReactElement[]; previous: ReactElement[] }

type DraggableItemsListProps = {
  onConfirmNewOrder: (newOrderOfKeys: string[]) => void
  itemHeight: number
  items: ReactElement[]
  onMoveBgColor: string
  handColor: string
}

const DraggableItemsList = ({
  itemHeight,
  onConfirmNewOrder,
  items,
  onMoveBgColor,
  handColor
}: DraggableItemsListProps) => {
  const [originalKeyOrder, setOriginalKeyOrder] = useState(items?.map((i) => i.key) as string[])
  const [itemsList, setItemsList] = useState<ItemListData>({ current: items, previous: items })
  // Current visual index order of items tells which original index is at which current visual index.
  // For example, [1, 0] means that at the current visual index of 0 there is the item with
  // the original index of 1 and at the current visual index of 1 there is the item with the
  // original index of 0.
  const [currentVisualIndexOrder, setCurrentVisualIndexOrder] = useState(range(items.length))
  // TranslateYs are the translate y values of items at their original indexes.
  const [translateYs, setTranslateYs] = useState(getInitialTranslateYs(items, itemHeight))
  const [shouldStop, setShouldStop] = useState(true)
  const [keyOrder, setKeyOrder] = useState(items?.map((i) => i.key) as string[])
  const [draggableItemsInOrder, setDraggableItemsInOrder] = useState(items.map((i) => i))

  useEffect(() => {
    setItemsList((previous) => {
      return { current: items, previous: previous.current }
    })
  }, [items])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only run if itemsList changes
  useEffect(() => {
    const listUpdater = new ListUpdater(
      itemsList,
      currentVisualIndexOrder,
      translateYs,
      draggableItemsInOrder,
      originalKeyOrder,
      keyOrder,
      itemHeight
    )

    const didCalculate = listUpdater.calculatedUpdatedValues()
    if (!didCalculate) return

    const {
      updatedDraggableItemsInOrder,
      updatedTranslateYs,
      updatedCurrentIndexOrder,
      updatedKeyOrder,
      updatedOriginalKeyOrder
    } = listUpdater.getUpdatedValues()

    setDraggableItemsInOrder(updatedDraggableItemsInOrder)
    setTranslateYs(updatedTranslateYs)
    setCurrentVisualIndexOrder(updatedCurrentIndexOrder)
    setKeyOrder(updatedKeyOrder)
    setOriginalKeyOrder(updatedOriginalKeyOrder)
  }, [itemsList])

  const onItemMoved = (originalIndexOfItemMoving: number, deltaY: number, isConfirm: boolean) => {
    if (isConfirm) setShouldStop(true)
    else if (shouldStop) setShouldStop(false)

    const currentVisualIndex = currentVisualIndexOrder.indexOf(originalIndexOfItemMoving)
    const visualIndexChanges = getVisualIndexDeltas(currentVisualIndex, deltaY, items.length, itemHeight)
    const updatedVisualIndexOrder = getUpdatedVisualIndexOrder(visualIndexChanges, currentVisualIndexOrder)
    const updatedTranslateYs = getUpdatedTranslateYs(items.length, updatedVisualIndexOrder, itemHeight)

    setTranslateYs(updatedTranslateYs)
    if (!isConfirm) return

    const updatedKeysOrder = getUpdatedKeyOrder(updatedVisualIndexOrder, originalKeyOrder)
    setCurrentVisualIndexOrder(updatedVisualIndexOrder)
    setKeyOrder(updatedKeysOrder)
    onConfirmNewOrder(updatedKeysOrder)
  }

  return (
    <Flex {...containerCss(items.length, itemHeight)}>
      {draggableItemsInOrder.map((item, index) => {
        const translateY = translateYs[index]

        return (
          <DraggableItem
            key={`draggable-list-item-${item.key}-${index}`}
            currentItemIndex={index}
            translateY={translateY}
            itemHeight={itemHeight}
            onItemMoved={onItemMoved}
            shouldStop={shouldStop}
            onMoveBgColor={onMoveBgColor}
            handColor={handColor}
            draggableContent={item}
            itemsCount={items.length}
          />
        )
      })}
    </Flex>
  )
}

export default DraggableItemsList

const containerCss = (itemsCount: number, listItemHeight: number) => {
  return {
    position: 'relative' as ChakraProps['position'],
    height: `${itemsCount * listItemHeight}px`,
    width: '100%'
  }
}
