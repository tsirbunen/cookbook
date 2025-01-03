import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import LocalStorageProvider, { LocalStorageKeys } from '../LocalStorageProvider'
import LocalStorageTestConsumer, {
  toggleSoundsLabel,
  areEnabled,
  areNotEnabled,
  clearAllLabel,
  addFavoriteLabel,
  removeFavoriteLabel,
  clearSoundsLabel
} from './LocalStorageTestConsumer'
import { LocalStorageMock } from './local-storage-mock'

global.localStorage = new LocalStorageMock()

describe('Local storage provider', () => {
  describe('Enables toggling a value in store', () => {
    it('sounds can be toggled on and off', async () => {
      render(
        <LocalStorageProvider>
          <LocalStorageTestConsumer />
        </LocalStorageProvider>
      )

      const toggleSoundsButton = screen.getByText(toggleSoundsLabel)
      act(() => fireEvent.click(toggleSoundsButton))
      const enabledText = screen.getByText(areEnabled)
      expect(enabledText).toBeDefined()
      let valueInStore = localStorage.getItem(LocalStorageKeys.SOUNDS_ARE_ENABLED)
      expect(valueInStore).toBe('true')
      expect(localStorage.length).toBe(1)

      act(() => fireEvent.click(toggleSoundsButton))
      const disabledText = screen.getByText(areNotEnabled)
      expect(disabledText).toBeDefined()
      valueInStore = localStorage.getItem(LocalStorageKeys.SOUNDS_ARE_ENABLED)
      expect(valueInStore).toBe('false')

      const clearAllButton = screen.getByText(clearAllLabel)
      act(() => fireEvent.click(clearAllButton))
    })

    it('favorite recipes can be added and removed', async () => {
      render(
        <LocalStorageProvider>
          <LocalStorageTestConsumer />
        </LocalStorageProvider>
      )

      const addFavoritesButton = screen.getByText(addFavoriteLabel)
      act(() => fireEvent.click(addFavoritesButton))
      act(() => fireEvent.click(addFavoritesButton))
      act(() => fireEvent.click(addFavoritesButton))
      let valueInStore = localStorage.getItem(LocalStorageKeys.FAVORITE_RECIPE_IDS)
      if (!valueInStore) throw new Error('Value in store is null')
      let valueAsArray = JSON.parse(valueInStore)
      expect(valueAsArray.length).toBe(3)
      expect(valueAsArray[0]).toBe(1)
      expect(valueAsArray[1]).toBe(2)
      expect(valueAsArray[2]).toBe(3)
      expect(localStorage.length).toBe(1)

      const removeFavoritesButton = screen.getByText(removeFavoriteLabel)
      act(() => fireEvent.click(removeFavoritesButton))
      valueInStore = localStorage.getItem(LocalStorageKeys.FAVORITE_RECIPE_IDS)
      if (!valueInStore) throw new Error('Value in store is null')
      valueAsArray = JSON.parse(valueInStore)
      expect(valueAsArray.length).toBe(2)
      expect(valueAsArray[0]).toBe(1)
      expect(valueAsArray[1]).toBe(2)

      const clearAllButton = screen.getByText(clearAllLabel)
      act(() => fireEvent.click(clearAllButton))
    })
  })

  describe('Enables clearing', () => {
    it('the whole store', async () => {
      render(
        <LocalStorageProvider>
          <LocalStorageTestConsumer />
        </LocalStorageProvider>
      )

      const toggleSoundsButton = screen.getByText(toggleSoundsLabel)
      act(() => fireEvent.click(toggleSoundsButton))
      const addFavoritesButton = screen.getByText(addFavoriteLabel)
      act(() => fireEvent.click(addFavoritesButton))
      expect(localStorage.length).toBe(2)

      const clearAllButton = screen.getByText(clearAllLabel)
      act(() => fireEvent.click(clearAllButton))
      expect(localStorage.length).toBe(0)
    })

    it('single key', async () => {
      render(
        <LocalStorageProvider>
          <LocalStorageTestConsumer />
        </LocalStorageProvider>
      )

      const toggleSoundsButton = screen.getByText(toggleSoundsLabel)
      act(() => fireEvent.click(toggleSoundsButton))
      const addFavoritesButton = screen.getByText(addFavoriteLabel)
      act(() => fireEvent.click(addFavoritesButton))
      expect(localStorage.length).toBe(2)

      const clearSoundsButton = screen.getByText(clearSoundsLabel)
      act(() => fireEvent.click(clearSoundsButton))
      expect(localStorage.length).toBe(1)
    })
  })
})
