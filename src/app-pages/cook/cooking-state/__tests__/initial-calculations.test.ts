import { expect } from '@jest/globals'
import { getInitialRecipeDisplayCount, getInitialRecipeDisplayIndexes } from '../cooking-state'

describe('Cooking state reducer initial calculations', () => {
  describe('Initially displayed recipes count calculation', () => {
    it('should return 0 when there are no picked recipes', () => {
      const result = getInitialRecipeDisplayCount(0, 3)
      expect(result).toBe(0)
    })

    it('should return the number of picked recipes when it is less than max count allowed', () => {
      const result = getInitialRecipeDisplayCount(2, 3)
      expect(result).toBe(2)
    })

    it('should return max count allowed if there are more recipes picked than can be shown at a time', () => {
      const result = getInitialRecipeDisplayCount(4, 2)
      expect(result).toBe(2)
    })

    it('should return the max count allowed if that count is picked', () => {
      const result = getInitialRecipeDisplayCount(5, 4)
      expect(result).toBe(3)
    })
  })

  describe('Initially displayed recipes indexes', () => {
    it('recipe indexes are correctly calculated for various picked and allowed count pairs', () => {
      const inputsWithExpectedOutputs = [
        { input: [1, 1], expectedOutput: [0, undefined, undefined] },
        { input: [2, 1], expectedOutput: [0, undefined, undefined] },
        { input: [1, 3], expectedOutput: [0, undefined, undefined] },
        { input: [2, 3], expectedOutput: [0, 1, undefined] },
        { input: [3, 5], expectedOutput: [0, 1, 2] }
      ]

      for (const { input, expectedOutput } of inputsWithExpectedOutputs) {
        const result = getInitialRecipeDisplayIndexes(input[0], input[1])
        expect(result.leftRecipeIndex).toEqual(expectedOutput[0])
        expect(result.middleRecipeIndex).toEqual(expectedOutput[1])
        expect(result.rightRecipeIndex).toEqual(expectedOutput[2])
      }
    })
  })
})
