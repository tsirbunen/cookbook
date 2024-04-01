'use client'

import { useEffect, useMemo, useState } from 'react'

export enum LocalStorageKeys {
  FAVORITE_RECIPE_IDS = 'favoriteRecipeIds'
}

type UseLocalStorage = {
  favoriteRecipeIds: number[]
  toggleValueForKey: (key: string, value: string | number) => void
  clearValueForKey: (key: string) => void
  clearAll: () => void
}

/**
 * Hook to enable storing user-related data in local storage and later retrieving it.
 * The local storage is used until user accounts are implemented and after that for those users
 * who do not want to create an account.
 */
export const useLocalStorage = (): UseLocalStorage => {
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<number[]>([])
  const storageIsAvailable = useMemo(() => {
    return typeof window !== 'undefined' && !!localStorage
  }, [])

  useEffect(() => {
    if (!storageIsAvailable) return
    setFavoriteRecipeIds(getValue(LocalStorageKeys.FAVORITE_RECIPE_IDS))
  }, [])

  const getValue = (key: string) => {
    const value = localStorage.getItem(key)
    if (!value) return []
    return JSON.parse(value)
  }

  const toggleValueForKey = (key: string, value: string | number) => {
    if (!storageIsAvailable) return

    let updatedValue
    const currentValue = localStorage.getItem(key)
    if (!currentValue) {
      updatedValue = JSON.stringify(value)
    } else {
      updatedValue = JSON.parse(currentValue)
      if (updatedValue.includes(value)) {
        updatedValue = updatedValue.filter((item: string | number) => item !== value)
      } else {
        updatedValue.push(value)
      }
    }

    localStorage.setItem(key, JSON.stringify(updatedValue))
    updateLocalValue(key, updatedValue)
  }

  const clearValueForKey = (key: string) => {
    if (!storageIsAvailable) return

    localStorage.removeItem(key)
    updateLocalValue(key, [])
  }

  const clearAll = () => {
    if (!storageIsAvailable) return

    localStorage.clear()
    updateLocalValue(LocalStorageKeys.FAVORITE_RECIPE_IDS, [])
  }

  const updateLocalValue = (key: string, value: string[] | number[] | null) => {
    switch (key) {
      case LocalStorageKeys.FAVORITE_RECIPE_IDS:
        setFavoriteRecipeIds(value as number[])
        break

      default:
        throw new Error(`Local storage key ${key} not available!`)
    }
  }

  return { favoriteRecipeIds, toggleValueForKey, clearValueForKey, clearAll }
}
