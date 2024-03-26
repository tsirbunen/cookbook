import { ReactElement } from 'react'
import { RELEVANT_OVERLAP_THRESHOLD } from './DraggableItemsList'
import { range } from 'lodash'

export const getVisualIndexDeltas = (
  indexOfItem: number,
  deltaY: number,
  itemsCount: number,
  listItemHeight: number
) => {
  const updatedVisualIndexDeltas = Array(itemsCount).fill(0)

  const direction = deltaY > 0 ? 1 : -1
  let change = Math.abs(deltaY)
  for (let i = indexOfItem + direction; i >= 0 && i < itemsCount; i += direction) {
    const hasWholeItemInBetween = change - listItemHeight > 0
    if (hasWholeItemInBetween) {
      updatedVisualIndexDeltas[i] = direction * -1
      change -= listItemHeight
      continue
    }

    const hasRelevantOverlapWithNeighbor = change / listItemHeight >= RELEVANT_OVERLAP_THRESHOLD
    if (hasRelevantOverlapWithNeighbor) {
      updatedVisualIndexDeltas[i] = direction * -1
      change = 0
      break
    }
  }

  change = Math.abs(deltaY)
  let movingItemIndexDelta = 0
  const wholeItemsInBetween = Math.floor(change / listItemHeight)
  if (wholeItemsInBetween > 0) movingItemIndexDelta = wholeItemsInBetween * direction
  change -= wholeItemsInBetween * listItemHeight

  const hasRelevantOverlapWithNeighbor = change / listItemHeight >= RELEVANT_OVERLAP_THRESHOLD
  if (hasRelevantOverlapWithNeighbor) movingItemIndexDelta += direction
  updatedVisualIndexDeltas[indexOfItem] = movingItemIndexDelta

  return updatedVisualIndexDeltas
}

export const getUpdatedVisualIndexOrder = (visualIndexChanges: number[], currentVisualIndexOrder: number[]) => {
  const updatedVisualIndexOrder = []
  for (let i = 0; i < visualIndexChanges.length; i++) {
    const change = visualIndexChanges[i]
    const item = currentVisualIndexOrder[i]
    updatedVisualIndexOrder[i + change] = item
  }

  return updatedVisualIndexOrder
}

export const getUpdatedTranslateYs = (itemsCount: number, visualIndexOrder: number[], itemHeight: number) => {
  const updatedTranslateYs = Array(itemsCount).fill(0)
  for (let i = 0; i < visualIndexOrder.length; i++) {
    const item = visualIndexOrder[i]
    updatedTranslateYs[item] = i * itemHeight
  }

  return updatedTranslateYs
}

export const getUpdatedKeyOrder = (updatedVisualIndexOrder: number[], originalKeyOrder: string[]) => {
  return updatedVisualIndexOrder.map((itemOriginalIndex) => {
    return originalKeyOrder[itemOriginalIndex]
  })
}

export const getInitialTranslateYs = (items: ReactElement[], listItemHeight: number) => {
  return range(0, items.length * listItemHeight, listItemHeight)
}
