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
    setFavoriteRecipeIds(getLocalStorageValue(LocalStorageKeys.FAVORITE_RECIPE_IDS) as number[])
  }, [])

  const getLocalStorageValue = (key: string): Array<string | number> => {
    const value = localStorage.getItem(key)
    if (!value) return []
    return JSON.parse(value)
  }

  const toggleValueForKey = (key: string, value: string | number) => {
    if (!storageIsAvailable) return

    let updatedValue: Array<string | number>
    const currentValue = getLocalStorageValue(key)
    if (currentValue.length === 0) {
      updatedValue = [value]
    } else {
      if (currentValue.includes(value)) {
        updatedValue = currentValue.filter((item) => item !== value)
      } else {
        updatedValue = [...currentValue, value]
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

  const updateLocalValue = (key: string, value: Array<string | number> | null) => {
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
