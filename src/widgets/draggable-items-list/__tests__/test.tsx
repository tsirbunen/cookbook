import { expect } from '@jest/globals'
import { ListUpdater } from '../list-updater'
import {
  getInitialTranslateYs,
  getUpdatedKeyOrder,
  getUpdatedTranslateYs,
  getUpdatedVisualIndexOrder,
  getVisualIndexDeltas
} from '../utils'

const title1 = 'title-1'
const title2 = 'title-2'
const title3 = 'title-3'
const title1Div = <div key={title1}>{title1}</div>
const title2Div = <div key={title2}>{title2}</div>
const title3Div = <div key={title3}>{title3}</div>
const listItemHeight = 40

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const compareArrays = (receivedArray: any[], expectedArray: any[]) => {
  return receivedArray.every((receivedElement, i) => {
    const expected = expectedArray[i]
    return receivedElement === expected || receivedElement.key === expected
  })
}

describe('ListUpdater correctly calculates updated values', () => {
  it('when item order has not changed and new item is added', () => {
    const currentVisualIndexOrder = [0, 1]
    const draggableItemsInOrder = [title1Div, title2Div]
    const itemsListData = {
      current: [title1Div, title2Div, title3Div],
      previous: [title1Div, title2Div]
    }
    const translateYs = [0, listItemHeight]
    const originalKeyOrder = [title1, title2]
    const keyOrder = [title1, title2]

    const listUpdater = new ListUpdater(
      itemsListData,
      currentVisualIndexOrder,
      translateYs,
      draggableItemsInOrder,
      originalKeyOrder,
      keyOrder,
      listItemHeight
    )

    const didCalculate = listUpdater.calculatedUpdatedValues()
    expect(didCalculate).toBe(true)

    const {
      updatedDraggableItemsInOrder,
      updatedTranslateYs,
      updatedCurrentIndexOrder,
      updatedKeyOrder,
      updatedOriginalKeyOrder
    } = listUpdater.getUpdatedValues()

    expect(compareArrays(updatedCurrentIndexOrder, [0, 1, 2])).toBe(true)
    expect(compareArrays(updatedKeyOrder, [title1, title2, title3])).toBe(true)
    expect(compareArrays(updatedTranslateYs, [0, listItemHeight, 2 * listItemHeight])).toBe(true)
    expect(compareArrays(updatedOriginalKeyOrder, [title1, title2, title3])).toBe(true)
    expect(compareArrays(updatedDraggableItemsInOrder, [title1, title2, title3])).toBe(true)
  })

  it('when item order has changed and new item is added', () => {
    const currentVisualIndexOrder = [1, 0]
    const draggableItemsInOrder = [title1Div, title2Div]
    const itemsListData = {
      current: [title2Div, title1Div, title3Div],
      previous: [title2Div, title1Div]
    }
    const translateYs = [listItemHeight, 0]
    const originalKeyOrder = [title1, title2]
    const keyOrder = [title2, title1]

    const listUpdater = new ListUpdater(
      itemsListData,
      currentVisualIndexOrder,
      translateYs,
      draggableItemsInOrder,
      originalKeyOrder,
      keyOrder,
      listItemHeight
    )

    const didCalculate = listUpdater.calculatedUpdatedValues()
    expect(didCalculate).toBe(true)

    const {
      updatedDraggableItemsInOrder,
      updatedTranslateYs,
      updatedCurrentIndexOrder,
      updatedKeyOrder,
      updatedOriginalKeyOrder
    } = listUpdater.getUpdatedValues()

    expect(compareArrays(updatedCurrentIndexOrder, [1, 0, 2])).toBe(true)
    expect(compareArrays(updatedKeyOrder, [title2, title1, title3])).toBe(true)
    expect(compareArrays(updatedTranslateYs, [listItemHeight, 0, 2 * listItemHeight])).toBe(true)
    expect(compareArrays(updatedOriginalKeyOrder, [title1, title2, title3])).toBe(true)
    expect(compareArrays(updatedDraggableItemsInOrder, [title1, title2, title3])).toBe(true)
  })

  it('when item order has changed and one item is deleted', () => {
    const currentVisualIndexOrder = [1, 2, 0]
    const draggableItemsInOrder = [title1Div, title2Div, title3Div]
    const itemsListData = {
      current: [title3Div, title1Div],
      previous: [title2Div, title3Div, title1Div]
    }
    const translateYs = [listItemHeight * 2, 0, listItemHeight]
    const originalKeyOrder = [title1, title2, title3]
    const keyOrder = [title2, title3, title1]

    const listUpdater = new ListUpdater(
      itemsListData,
      currentVisualIndexOrder,
      translateYs,
      draggableItemsInOrder,
      originalKeyOrder,
      keyOrder,
      listItemHeight
    )

    const didCalculate = listUpdater.calculatedUpdatedValues()
    expect(didCalculate).toBe(true)

    const {
      updatedDraggableItemsInOrder,
      updatedTranslateYs,
      updatedCurrentIndexOrder,
      updatedKeyOrder,
      updatedOriginalKeyOrder
    } = listUpdater.getUpdatedValues()

    expect(compareArrays(updatedCurrentIndexOrder, [1, 0])).toBe(true)
    expect(compareArrays(updatedKeyOrder, [title3, title1])).toBe(true)
    expect(compareArrays(updatedTranslateYs, [listItemHeight, 0])).toBe(true)
    expect(compareArrays(updatedOriginalKeyOrder, [title1, title3])).toBe(true)
    expect(compareArrays(updatedDraggableItemsInOrder, [title1, title3])).toBe(true)
  })
})

describe('Utility functions', () => {
  it('initial translate Y values are correct', () => {
    const items = [title1Div, title2Div, title3Div]
    const initialTranslateYs = getInitialTranslateYs(items, listItemHeight)
    expect(compareArrays(initialTranslateYs, [0, listItemHeight, 2 * listItemHeight])).toBe(true)
  })

  it('key order is correct', () => {
    const originalKeyOrder = [title1, title2, title3]
    const updatedVisualIndexOrder = [0, 2, 1]
    const updatedKeyOrder = getUpdatedKeyOrder(updatedVisualIndexOrder, originalKeyOrder)
    expect(compareArrays(updatedKeyOrder, [title1, title3, title2])).toBe(true)
  })

  it('translate Ys are correct', () => {
    const itemsCount = 3
    const visualIndexOrder = [2, 0, 1]
    const updatedTranslateYs = getUpdatedTranslateYs(itemsCount, visualIndexOrder, listItemHeight)
    expect(compareArrays(updatedTranslateYs, [listItemHeight, 2 * listItemHeight, 0])).toBe(true)
  })

  it('visual index order is correct', () => {
    const visualIndexChanges = [0, 1, -1]
    const currentVisualIndexOrder = [2, 0, 1]
    const updatedTranslateYs = getUpdatedVisualIndexOrder(visualIndexChanges, currentVisualIndexOrder)
    expect(compareArrays(updatedTranslateYs, [2, 1, 0])).toBe(true)
  })

  it('visual index deltas are correct', () => {
    const indexOfItem = 0
    const deltaY = 74
    const itemsCount = 3
    const updatedTranslateYs = getVisualIndexDeltas(indexOfItem, deltaY, itemsCount, listItemHeight)
    expect(compareArrays(updatedTranslateYs, [2, -1, -1])).toBe(true)
  })
})
