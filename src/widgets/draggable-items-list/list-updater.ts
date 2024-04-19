import { ReactElement } from 'react'
import { ItemListData } from './DraggableItemsList'

export class ListUpdater {
  updatedCurrentIndexOrder: number[]
  updatedTranslateYs: number[]
  updatedDraggableItemsInOrder: ReactElement[]
  updatedOriginalKeyOrder: string[]

  newCurrentKeys: string[] = []
  keysToDelete: string[] = []
  removeAtIndexes: number[] = []
  deletedItemKeys: string[] = []
  addedItemsList: ReactElement[] = []
  updatedKeyOrder: string[] = []

  constructor(
    private itemsList: ItemListData,
    currentVisualIndexOrder: number[],
    private translateYs: number[],
    draggableItemsInOrder: ReactElement[],
    originalKeyOrder: string[],
    private keyOrder: string[],
    private listItemHeight: number
  ) {
    this.itemsList = itemsList
    this.keyOrder = keyOrder
    this.listItemHeight = listItemHeight
    this.translateYs = translateYs

    this.updatedCurrentIndexOrder = [...currentVisualIndexOrder]
    this.updatedTranslateYs = [...translateYs]
    this.updatedDraggableItemsInOrder = [...draggableItemsInOrder]
    this.updatedOriginalKeyOrder = [...originalKeyOrder]
  }

  calculatedUpdatedValues() {
    this.findDeletedAndNewCurrentKeys()
    this.findDeletedItemKeys()
    this.findAddedItems()

    if (this.noItemsAddedOrRemoved()) return false

    this.removeDeletedItems()
    this.appendAddedItems()
    this.updateKeysOrder()
    return true
  }

  findDeletedAndNewCurrentKeys() {
    const newCurrentKeys = this.itemsList.current.map((i) => i.key)
    this.newCurrentKeys = newCurrentKeys as string[]
    const oldKeys = this.itemsList.previous.map((i) => i.key)
    const keysToDelete = oldKeys.filter((key) => !newCurrentKeys.includes(key))
    this.keysToDelete = keysToDelete as string[]
  }

  findDeletedItemKeys() {
    this.deletedItemKeys = this.keyOrder?.filter((key, index) => {
      const shouldDeleteItem = !this.newCurrentKeys?.includes(key)
      if (shouldDeleteItem) this.removeAtIndexes.push(index)
      return shouldDeleteItem
    })
  }

  findAddedItems() {
    this.addedItemsList = this.itemsList.current.filter((item) => !this.keyOrder?.includes(item.key as string))
  }

  noItemsAddedOrRemoved() {
    return !this.deletedItemKeys?.length && !this.addedItemsList?.length
  }

  removeDeletedItems() {
    this.updatedDraggableItemsInOrder = this.updatedDraggableItemsInOrder.filter((item) => {
      return !this.keysToDelete.includes(item.key as string)
    })

    for (let i = 0; i < this.removeAtIndexes.length; i++) {
      const removeAt = this.removeAtIndexes[i]
      const itemToRemove = this.updatedCurrentIndexOrder[removeAt]
      for (let j = 0; j < this.updatedCurrentIndexOrder.length; j++) {
        const item = this.updatedCurrentIndexOrder[j]
        if (item === -1 || item < itemToRemove) continue
        else if (item === itemToRemove) this.updatedCurrentIndexOrder[j] = -1
        else this.updatedCurrentIndexOrder[j] = item - 1
      }

      const translateToRemove = this.translateYs[itemToRemove]
      for (let j = 0; j < this.updatedCurrentIndexOrder.length; j++) {
        const t = this.translateYs[j]
        if (t === -1 || t < translateToRemove) continue
        else if (t === translateToRemove) this.updatedTranslateYs[j] = -1
        else this.updatedTranslateYs[j] = t - this.listItemHeight
      }
    }

    this.updatedCurrentIndexOrder = this.updatedCurrentIndexOrder.filter((i) => i !== -1)
    this.updatedTranslateYs = this.updatedTranslateYs.filter((i) => i !== -1)

    this.updatedOriginalKeyOrder = this.updatedOriginalKeyOrder.filter((key) => {
      return !this.deletedItemKeys?.includes(key)
    })
  }

  appendAddedItems() {
    const newLength = this.updatedDraggableItemsInOrder.length
    this.updatedDraggableItemsInOrder.push(...this.addedItemsList.map((i) => i))
    let newIndex = newLength
    for (let i = 0; i < this.addedItemsList.length; i++) {
      this.updatedTranslateYs.push(newIndex * this.listItemHeight)
      this.updatedCurrentIndexOrder.push(newIndex)
      newIndex++
    }

    this.addedItemsList.forEach((item) => {
      this.updatedOriginalKeyOrder.push(item.key as string)
    })
  }

  updateKeysOrder() {
    this.updatedKeyOrder = this.updatedCurrentIndexOrder.map((itemOriginalIndex) => {
      return this.updatedOriginalKeyOrder[itemOriginalIndex]
    })
  }

  getUpdatedValues() {
    return {
      updatedCurrentIndexOrder: this.updatedCurrentIndexOrder,
      updatedTranslateYs: this.updatedTranslateYs,
      updatedDraggableItemsInOrder: this.updatedDraggableItemsInOrder,
      updatedOriginalKeyOrder: this.updatedOriginalKeyOrder,
      updatedKeyOrder: this.updatedKeyOrder
    }
  }
}
