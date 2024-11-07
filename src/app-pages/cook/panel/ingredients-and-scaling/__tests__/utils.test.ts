import { expect } from '@jest/globals'
import { getRoundedIngredientAmount, getScaledIngredientAmount } from '../utils'

describe('Scale recipe utils', () => {
  describe('ingredient amount is properly rounded to correct number of digits', () => {
    it('large values are turned into values with no decimals', () => {
      const largeValuesWithExpectedOutputs = [
        { input: 20.5, expectedOutput: 21 },
        { input: 21.3, expectedOutput: 21 },
        { input: 21.5, expectedOutput: 22 },
        { input: 21.7, expectedOutput: 22 },
        { input: 22.6, expectedOutput: 23 },
        { input: 101, expectedOutput: 101 }
      ]

      for (const { input, expectedOutput } of largeValuesWithExpectedOutputs) {
        expect(getRoundedIngredientAmount(input)).toBe(expectedOutput)
      }
    })

    it('medium values are rounded to closest smaller or larger integer or their middle', () => {
      const mediumValuesWithExpectedOutputs = [
        { input: 10.5, expectedOutput: 10.5 },
        { input: 11.6, expectedOutput: 11.5 },
        { input: 11.8, expectedOutput: 12 },
        { input: 11.2, expectedOutput: 11 },
        { input: 11.3, expectedOutput: 11.5 },
        { input: 11.7, expectedOutput: 11.5 }
      ]

      for (const { input, expectedOutput } of mediumValuesWithExpectedOutputs) {
        expect(getRoundedIngredientAmount(input)).toBe(expectedOutput)
      }
    })

    it('small values have max two decimals that do not contain insignificant zeros', () => {
      const smallValuesWithExpectedOutputs = [
        { input: 1, expectedOutput: 1 },
        { input: 1.2, expectedOutput: 1.2 },
        { input: 1.2, expectedOutput: 1.2 },
        { input: 1.666, expectedOutput: 1.67 },
        { input: 2.008, expectedOutput: 2.01 },
        { input: 1.999, expectedOutput: 2 }
      ]

      for (const { input, expectedOutput } of smallValuesWithExpectedOutputs) {
        expect(getRoundedIngredientAmount(input)).toBe(expectedOutput)
      }
    })
  })

  describe('original ingredient amount is properly converted if multiplier has value', () => {
    it('if recipe is being scaled, ingredient amount is returned as is (base scaling)', () => {
      const basicInput = {
        id: 1,
        hasUnit: true,
        presetMultiplier: undefined,
        originalAmount: 50
      }

      const inputsWithExpectedOutputs = [
        {
          input: { ...basicInput, ingredient: { id: 1, newAmount: '500', multiplier: 500 / 50 } },
          expectedOutput: '500'
        },
        {
          input: { ...basicInput, ingredient: { id: 1, newAmount: '5', multiplier: 5 / 50 } },
          expectedOutput: '5'
        },
        {
          input: { ...basicInput, ingredient: { id: 1, newAmount: '333', multiplier: 333 / 50 } },
          expectedOutput: '333'
        }
      ]

      for (const { input, expectedOutput } of inputsWithExpectedOutputs) {
        const { id, hasUnit, ingredient, presetMultiplier, originalAmount } = input
        expect(getScaledIngredientAmount(id, hasUnit, ingredient, presetMultiplier, originalAmount)).toBe(
          expectedOutput
        )
      }
    })

    // it('without multiplier and recipe not being scaled, undefined is returned', () => {
    //   const inputsWithExpectedOutputs = [
    //     {
    //       input: { id: 1, hasUnit: true, presetMultiplier: undefined, originalAmount: 50, ingredient: undefined },
    //       expectedOutput: undefined
    //     }
    //   ]

    //   for (const { input, expectedOutput } of inputsWithExpectedOutputs) {
    //     const { id, hasUnit, ingredient, presetMultiplier, originalAmount } = input
    //     expect(getScaledIngredientAmount(id, hasUnit, ingredient, presetMultiplier, originalAmount)).toBe(
    //       expectedOutput
    //     )
    //   }
    // })

    it('if ingredient has no original amount but has unit, the multiplier is returned', () => {
      const basicInput = {
        id: 1,
        hasUnit: true,
        originalAmount: undefined
      }
      const inputsWithExpectedOutputs = [
        {
          input: { ...basicInput, ingredient: undefined, presetMultiplier: 2.3 },
          expectedOutput: '2.3'
        },
        {
          input: { ...basicInput, ingredient: undefined, presetMultiplier: 33 },
          expectedOutput: '33'
        }
      ]

      for (const { input, expectedOutput } of inputsWithExpectedOutputs) {
        const { id, hasUnit, ingredient, presetMultiplier, originalAmount } = input
        expect(getScaledIngredientAmount(id, hasUnit, ingredient, presetMultiplier, originalAmount)).toBe(
          expectedOutput
        )
      }
    })

    it('if recipe is not being scaled and multiplier is set, ingredient amount is returned as multiplied', () => {
      const basicInput = {
        id: 2,
        hasUnit: true,
        presetMultiplier: undefined,
        ingredient: undefined,
        originalAmount: 2
      }

      const inputsWithExpectedOutputs = [
        {
          input: { ...basicInput, ingredient: { id: basicInput.id + 1, newAmount: '3', multiplier: 3 } },
          expectedOutput: `${basicInput.originalAmount * 3}`
        },
        {
          input: { ...basicInput, ingredient: { id: basicInput.id + 1, newAmount: '0.5', multiplier: 0.2 } },
          expectedOutput: '0.4'
        },
        {
          input: { ...basicInput, presetMultiplier: 1.5 },
          expectedOutput: '3'
        }
      ]

      for (const { input, expectedOutput } of inputsWithExpectedOutputs) {
        const { id, hasUnit, ingredient, presetMultiplier, originalAmount } = input
        expect(getScaledIngredientAmount(id, hasUnit, ingredient, presetMultiplier, originalAmount)).toBe(
          expectedOutput
        )
      }
    })
  })
})
