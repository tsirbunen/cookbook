import { CookingRecipeData, TimerData } from '../../../types/types'

export type DisplayIndexes = { leftRecipeIndex?: number; middleRecipeIndex?: number; rightRecipeIndex?: number }
export type DisplayConfig = {
  count: number
  indexes: DisplayIndexes
}

export type CookingState = {
  displayConfig: DisplayConfig
  cookingRecipes: CookingRecipeData[]
  timersByRecipeId: Record<number, TimerData>
  ingredientsAdded: number[]
  instructionsDone: number[]
}

const getInitialDisplayIndexes = (pickedRecipesCount: number, maxPanelsCount: number) => {
  const leftRecipeIndex = 0
  const middleRecipeIndex = pickedRecipesCount >= 1 && maxPanelsCount > 1 ? 1 : undefined
  const rightRecipeIndex = pickedRecipesCount >= 2 && maxPanelsCount > 2 ? 2 : undefined
  return { leftRecipeIndex, middleRecipeIndex, rightRecipeIndex }
}

const getInitialDisplayCount = (pickedRecipesCount: number, maxPanelsCount: number) => {
  return Math.min(pickedRecipesCount, maxPanelsCount, 3)
}

export const getInitialCookingState = (pickedRecipesCount: number, maxPanelsCount: number): CookingState => {
  return {
    displayConfig: {
      count: getInitialDisplayCount(pickedRecipesCount, maxPanelsCount),
      indexes: getInitialDisplayIndexes(pickedRecipesCount, maxPanelsCount)
    },
    cookingRecipes: [],
    timersByRecipeId: {},
    ingredientsAdded: [],
    instructionsDone: []
  }
}
