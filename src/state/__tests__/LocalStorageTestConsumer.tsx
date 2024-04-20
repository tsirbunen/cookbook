import { useState, useContext } from 'react'
import { LocalStorageContext, LocalStorageKeys } from '../LocalStorageProvider'

export const areEnabled = 'are enabled'
export const areNotEnabled = 'are not enabled'
export const toggleSoundsLabel = 'Toggle sounds'
export const addFavoriteLabel = 'Add favorite'
export const removeFavoriteLabel = 'Remove favorite'
export const clearAllLabel = 'Clear all'
export const clearSoundsLabel = 'Clear sounds'

const LocalStorageTestConsumer = () => {
  const [soundsAreOn, setSoundsAreOn] = useState<boolean>(false)
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<number[]>([])
  const { toggleValueForKey, soundsAreEnabled, clearWholeStorage, clearValueForKey } = useContext(LocalStorageContext)

  return (
    <div>
      {soundsAreEnabled ? areEnabled : areNotEnabled}
      <button
        onClick={() => {
          toggleValueForKey(LocalStorageKeys.SOUNDS_ARE_ENABLED, !soundsAreOn)
          setSoundsAreOn(!soundsAreOn)
        }}
      >
        {toggleSoundsLabel}
      </button>
      <button
        onClick={() => {
          const count = favoriteRecipeIds.length
          const newValue = count + 1
          toggleValueForKey(LocalStorageKeys.FAVORITE_RECIPE_IDS, newValue)
          setFavoriteRecipeIds([...favoriteRecipeIds, newValue])
        }}
      >
        {addFavoriteLabel}
      </button>
      <button
        onClick={() => {
          const count = favoriteRecipeIds.length
          const newValue = count
          toggleValueForKey(LocalStorageKeys.FAVORITE_RECIPE_IDS, newValue)
          setFavoriteRecipeIds((previous) => previous.filter((id) => id !== newValue))
        }}
      >
        {removeFavoriteLabel}
      </button>

      <button
        onClick={() => {
          clearWholeStorage()
          setSoundsAreOn(false)
          setFavoriteRecipeIds([])
        }}
      >
        {clearAllLabel}
      </button>

      <button
        onClick={() => {
          clearValueForKey(LocalStorageKeys.SOUNDS_ARE_ENABLED)
          setSoundsAreOn(false)
        }}
      >
        {clearSoundsLabel}
      </button>
    </div>
  )
}

export default LocalStorageTestConsumer
