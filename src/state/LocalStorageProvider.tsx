'use client'

import { createContext, useEffect, useState } from 'react'

export enum LocalStorageKeys {
  FAVORITE_RECIPE_IDS = 'favoriteRecipeIds',
  SOUNDS_ARE_ENABLED = 'soundsAreEnabled'
}

export type LocalStorage = {
  favoriteRecipeIds: number[]
  soundsAreEnabled: boolean
  toggleValueForKey: (key: LocalStorageKeys, newValue: boolean | string | number) => void
  clearValueForKey: (key: LocalStorageKeys) => void
  clearWholeStorage: () => void
}

export const LocalStorageContext = createContext<LocalStorage>({} as LocalStorage)

/**

 */
const LocalStorageProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<number[]>([])
  const [soundsAreEnabled, setSoundsAreEnabled] = useState<boolean>(false)

  useEffect(() => {
    setFavoriteRecipeIds(getLocalStorageArrayValue(LocalStorageKeys.FAVORITE_RECIPE_IDS) as number[])
    setSoundsAreEnabled(getLocalStorageBooleanValue(LocalStorageKeys.SOUNDS_ARE_ENABLED) as boolean)
  }, [])

  const toggleValueForKey = (key: LocalStorageKeys, newValue: boolean | string | number) => {
    switch (key) {
      case LocalStorageKeys.FAVORITE_RECIPE_IDS:
        const updatedArray = updateLocalStorageArrayValue(key, newValue)
        setFavoriteRecipeIds(updatedArray as number[])
        return
      case LocalStorageKeys.SOUNDS_ARE_ENABLED:
        if (typeof newValue !== 'boolean') throw new Error('Value for "SOUNDS_ARE_ENABLED" must be a boolean!')
        updateLocalStorageBooleanValue(key, newValue)
        setSoundsAreEnabled(newValue)
        return
      default:
        throw new Error(`Local storage key ${key} not implemented!`)
    }
  }

  const updateLocalStorageBooleanValue = (key: LocalStorageKeys, newValue: boolean) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  const updateLocalStorageArrayValue = (key: LocalStorageKeys, newValue: string | number | boolean) => {
    ;[]

    let updatedValue: Array<string | number | boolean>
    const currentValue = getLocalStorageArrayValue(key)
    if (currentValue.length === 0) {
      updatedValue = [newValue]
    } else {
      if (currentValue.includes(newValue)) {
        updatedValue = currentValue.filter((item) => item !== newValue)
      } else {
        updatedValue = [...currentValue, newValue]
      }
    }

    localStorage.setItem(key, JSON.stringify(updatedValue))
    return updatedValue
  }

  const getLocalStorageBooleanValue = (key: LocalStorageKeys): boolean => {
    const value = localStorage.getItem(key)
    if (!value) return false
    return value === 'true'
  }

  const getLocalStorageArrayValue = (key: LocalStorageKeys): Array<string | number | boolean> => {
    const value = localStorage.getItem(key)
    if (!value) return []
    const parsedValue = JSON.parse(value)
    return parsedValue.map((item: string | number | boolean) => {
      if (item === 'true') return true
      if (item === 'false') return false
      return item
    })
  }

  const clearValueForKey = (key: LocalStorageKeys) => {
    localStorage.removeItem(key)
    switch (key) {
      case LocalStorageKeys.FAVORITE_RECIPE_IDS:
        setFavoriteRecipeIds([])
        return
      case LocalStorageKeys.FAVORITE_RECIPE_IDS:
        setSoundsAreEnabled(false)
        return
      default:
        throw new Error(`Local storage key ${key} not implemented!`)
    }
  }

  const clearWholeStorage = () => {
    localStorage.clear()
    setFavoriteRecipeIds([])
    setSoundsAreEnabled(false)
  }

  return (
    <LocalStorageContext.Provider
      value={{
        favoriteRecipeIds,
        soundsAreEnabled,
        toggleValueForKey,
        clearValueForKey,
        clearWholeStorage
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  )
}

export default LocalStorageProvider
