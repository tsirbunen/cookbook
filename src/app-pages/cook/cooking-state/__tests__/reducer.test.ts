import { expect } from '@jest/globals'
import {
  cookingReducer,
  DispatchCookingEvent,
  DisplayDirection,
  getUpdatedDisplayConfigAfterCountChanged,
  getUpdatedDisplayConfigAfterIndexesChanged
} from '../cooking-reducer'
import { getInitialCookingState } from '../cooking-state'

const applePieRecipe = {
  id: 1,
  name: 'Apple Pie',
  ingredientGroups: [{ ingredients: [{ id: 1 }, { id: 2 }, { id: 3 }] }],
  instructionGroups: [{ instructions: [{ id: 1 }, { id: 2 }] }]
}
const chocolateCakeRecipe = {
  id: 2,
  name: 'Chocolate Cake',
  ingredientGroups: [{ ingredients: [{ id: 5 }, { id: 6 }, { id: 7 }] }],
  instructionGroups: [{ instructions: [{ id: 5 }, { id: 6 }] }]
}
const scrambledEggsRecipe = { id: 3, name: 'Scrambled Eggs' }
const porridgeRecipe = { id: 4, name: 'Porridge' }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getReducedCookingState = (state: any, action: any) => {
  return cookingReducer(state, action)
}

describe('Cooking state reducer updates', () => {
  it('toggle is cooking on and off for multiple recipes', () => {
    const originalState = getInitialCookingState(3, 3)

    const toggleCookRecipe1 = {
      type: DispatchCookingEvent.TOGGLE_IS_COOKING_RECIPE,
      payload: { recipe: applePieRecipe }
    }

    let reducedState = getReducedCookingState(originalState, toggleCookRecipe1)
    expect(reducedState.cookingRecipes.length).toBe(1)

    const toggleCookRecipe2 = {
      type: DispatchCookingEvent.TOGGLE_IS_COOKING_RECIPE,
      payload: { recipe: chocolateCakeRecipe }
    }
    reducedState = getReducedCookingState(reducedState, toggleCookRecipe2)
    expect(reducedState.cookingRecipes.length).toBe(2)

    reducedState = getReducedCookingState(reducedState, toggleCookRecipe1)
    expect(reducedState.cookingRecipes.length).toBe(1)
  })

  it("change recipe's scaling parameters", () => {
    const originalState = getInitialCookingState(3, 3)

    const scaleRecipe1 = {
      type: DispatchCookingEvent.SCALE_RECIPE,
      payload: { recipeId: scrambledEggsRecipe.id, scalingData: { multiplier: 2 } }
    }

    let reducedState = getReducedCookingState(originalState, scaleRecipe1)
    expect(Object.keys(reducedState.scalingByRecipeId).length).toBe(1)
    expect(Object.keys(reducedState.scalingByRecipeId)[0]).toBe(scrambledEggsRecipe.id.toString())
    expect(Object.values(reducedState.scalingByRecipeId)[0].multiplier).toBe(2)

    const scaleRecipe1Update1 = {
      type: DispatchCookingEvent.SCALE_RECIPE,
      payload: { recipeId: scrambledEggsRecipe.id, scalingData: { multiplier: 1.55 } }
    }

    reducedState = getReducedCookingState(reducedState, scaleRecipe1Update1)
    expect(Object.keys(reducedState.scalingByRecipeId).length).toBe(1)
    expect(Object.keys(reducedState.scalingByRecipeId)[0]).toBe(scrambledEggsRecipe.id.toString())
    expect(Object.values(reducedState.scalingByRecipeId)[0].multiplier).toBe(1.55)

    const scaleRecipe1Update2 = {
      type: DispatchCookingEvent.SCALE_RECIPE,
      payload: { recipeId: scrambledEggsRecipe.id, scalingData: { multiplier: 0.23, ingredientId: 3 } }
    }
    reducedState = getReducedCookingState(reducedState, scaleRecipe1Update2)
    expect(Object.keys(reducedState.scalingByRecipeId).length).toBe(1)
    expect(Object.keys(reducedState.scalingByRecipeId)[0]).toBe(scrambledEggsRecipe.id.toString())
    expect(Object.values(reducedState.scalingByRecipeId)[0].multiplier).toBe(0.23)

    const scaleRecipe2 = {
      type: DispatchCookingEvent.SCALE_RECIPE,
      payload: { recipeId: porridgeRecipe.id, scalingData: { multiplier: 1.3 } }
    }
    reducedState = getReducedCookingState(reducedState, scaleRecipe2)
    expect(Object.keys(reducedState.scalingByRecipeId).length).toBe(2)
    expect(Object.keys(reducedState.scalingByRecipeId)[0]).toBe(scrambledEggsRecipe.id.toString())
    expect(Object.values(reducedState.scalingByRecipeId)[0].multiplier).toBe(0.23)
    expect(Object.keys(reducedState.scalingByRecipeId)[1]).toBe(porridgeRecipe.id.toString())
    expect(Object.values(reducedState.scalingByRecipeId)[1].multiplier).toBe(1.3)
  })

  it('clear all settings for recipes one at a time', () => {
    const originalState = {
      displayConfig: {
        count: 3,
        indexes: { leftRecipeIndex: 0, middleRecipeIndex: 1, rightRecipeIndex: 2 }
      },
      cookingRecipes: [applePieRecipe, chocolateCakeRecipe],
      timersByRecipeId: {},
      ingredientsAdded: [1, 2, 5, 6],
      instructionsDone: [2, 6],
      multiColumnRecipes: [1, 2],
      scalingByRecipeId: { 1: { multiplier: 2 }, 2: { multiplier: 1.5 } },
      onlyMetricRecipeIds: [1, 2],
      isScalingRecipeIds: [2]
    }

    const clearAllForRecipe1 = {
      type: DispatchCookingEvent.CLEAR_ALL_RECIPE_SETTINGS,
      payload: { recipe: applePieRecipe }
    }

    let reducedState = getReducedCookingState(originalState, clearAllForRecipe1)
    expect(reducedState.cookingRecipes.length).toBe(1)
    expect(reducedState.ingredientsAdded.length).toBe(2)
    expect(reducedState.ingredientsAdded[0]).toBe(5)
    expect(reducedState.ingredientsAdded[1]).toBe(6)
    expect(reducedState.instructionsDone.length).toBe(1)
    expect(reducedState.instructionsDone[0]).toBe(6)
    expect(reducedState.multiColumnRecipes.length).toBe(1)
    expect(reducedState.multiColumnRecipes[0]).toBe(2)
    expect(Object.keys(reducedState.scalingByRecipeId).length).toBe(1)
    expect(Object.values(reducedState.scalingByRecipeId)[0].multiplier).toBe(1.5)
    expect(reducedState.isScalingRecipeIds.length).toBe(1)

    const clearAllForRecipe2 = {
      type: DispatchCookingEvent.CLEAR_ALL_RECIPE_SETTINGS,
      payload: { recipe: chocolateCakeRecipe }
    }
    reducedState = getReducedCookingState(reducedState, clearAllForRecipe2)
    expect(reducedState.cookingRecipes.length).toBe(0)
    expect(reducedState.ingredientsAdded.length).toBe(0)
    expect(reducedState.instructionsDone.length).toBe(0)
    expect(reducedState.multiColumnRecipes.length).toBe(0)
    expect(Object.keys(reducedState.scalingByRecipeId).length).toBe(0)
    expect(reducedState.isScalingRecipeIds.length).toBe(0)
  })

  it('display configuration is correctly calculated after count changed', () => {
    const inputAndExpectedOutput = [
      {
        input: {
          currentConfig: { count: 3, indexes: { leftRecipeIndex: 0, middleRecipeIndex: 1, rightRecipeIndex: 2 } },
          payload: { newValue: 2, maxPanelsCount: 3, pickedRecipesCount: 3 }
        },
        expectedOutput: { count: 2, indexes: { leftRecipeIndex: 0, middleRecipeIndex: 1, rightRecipeIndex: undefined } }
      },
      {
        input: {
          currentConfig: { count: 1, indexes: { leftRecipeIndex: 0 } },
          payload: { newValue: 2, maxPanelsCount: 3, pickedRecipesCount: 3 }
        },
        expectedOutput: { count: 2, indexes: { leftRecipeIndex: 0, middleRecipeIndex: 1, rightRecipeIndex: undefined } }
      },
      {
        input: {
          currentConfig: { count: 1, indexes: { leftRecipeIndex: 0 } },
          payload: { newValue: 0, maxPanelsCount: 3, pickedRecipesCount: 3 }
        },
        expectedOutput: {
          count: 0,
          indexes: { leftRecipeIndex: 0, middleRecipeIndex: undefined, rightRecipeIndex: undefined }
        }
      }
    ]

    for (const { input, expectedOutput } of inputAndExpectedOutput) {
      const { currentConfig, payload } = input
      const updatedConfig = getUpdatedDisplayConfigAfterCountChanged(currentConfig, payload)
      expect(updatedConfig).toStrictEqual(expectedOutput)
    }
  })

  it('display configuration is correctly calculated after indexes changed', () => {
    const inputAndExpectedOutput = [
      {
        input: {
          currentConfig: { count: 3, indexes: { leftRecipeIndex: 0, middleRecipeIndex: 1, rightRecipeIndex: 2 } },
          payload: { moveDirection: 'next' as DisplayDirection, pickedRecipesCount: 5 }
        },
        expectedOutput: { count: 3, indexes: { leftRecipeIndex: 1, middleRecipeIndex: 2, rightRecipeIndex: 3 } }
      },
      {
        input: {
          currentConfig: { count: 3, indexes: { leftRecipeIndex: 2, middleRecipeIndex: 3, rightRecipeIndex: 4 } },
          payload: { moveDirection: 'previous' as DisplayDirection, pickedRecipesCount: 6 }
        },
        expectedOutput: { count: 3, indexes: { leftRecipeIndex: 1, middleRecipeIndex: 2, rightRecipeIndex: 3 } }
      },
      {
        input: {
          currentConfig: { count: 2, indexes: { leftRecipeIndex: 1, middleRecipeIndex: 2 } },
          payload: { moveDirection: 'previous' as DisplayDirection, pickedRecipesCount: 5 }
        },
        expectedOutput: { count: 2, indexes: { leftRecipeIndex: 0, middleRecipeIndex: 1, rightRecipeIndex: undefined } }
      },
      {
        input: {
          currentConfig: { count: 2, indexes: { leftRecipeIndex: 0, middleRecipeIndex: 1 } },
          payload: { moveDirection: 'previous' as DisplayDirection, pickedRecipesCount: 5 }
        },
        expectedOutput: { count: 2, indexes: { leftRecipeIndex: 0, middleRecipeIndex: 1 } }
      },
      {
        input: {
          currentConfig: { count: 2, indexes: { leftRecipeIndex: 0, middleRecipeIndex: 1 } },
          payload: { moveDirection: 'next' as DisplayDirection, pickedRecipesCount: 2 }
        },
        expectedOutput: { count: 2, indexes: { leftRecipeIndex: 0, middleRecipeIndex: 1 } }
      }
    ]

    for (const { input, expectedOutput } of inputAndExpectedOutput) {
      const { currentConfig, payload } = input
      const updatedConfig = getUpdatedDisplayConfigAfterIndexesChanged(currentConfig, payload)
      expect(updatedConfig).toStrictEqual(expectedOutput)
    }
  })

  it('change display configuration by changing count', () => {
    const originalState = getInitialCookingState(2, 2)
    originalState.displayConfig = {
      count: 1,
      indexes: { leftRecipeIndex: 0, middleRecipeIndex: undefined, rightRecipeIndex: undefined }
    }

    const changeCountTo2 = {
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_COUNT,
      payload: { newValue: 2, maxPanelsCount: 2, pickedRecipesCount: 2 }
    }

    let reducedState = getReducedCookingState(originalState, changeCountTo2)
    expect(reducedState.displayConfig.count).toBe(2)
    expect(reducedState.displayConfig.indexes.leftRecipeIndex).toBe(0)
    expect(reducedState.displayConfig.indexes.middleRecipeIndex).toBe(1)
    expect(reducedState.displayConfig.indexes.rightRecipeIndex).toBeUndefined()

    const changeCountToNotAllowed3 = {
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_COUNT,
      payload: { newValue: 3, maxPanelsCount: 2, pickedRecipesCount: 2 }
    }
    reducedState = getReducedCookingState(originalState, changeCountToNotAllowed3)
    expect(reducedState.displayConfig.count).toBe(2)
    expect(reducedState.displayConfig.indexes.leftRecipeIndex).toBe(0)
    expect(reducedState.displayConfig.indexes.middleRecipeIndex).toBe(1)
    expect(reducedState.displayConfig.indexes.rightRecipeIndex).toBeUndefined()

    const changeCountTo1 = {
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_COUNT,
      payload: { newValue: 1, maxPanelsCount: 2, pickedRecipesCount: 2 }
    }
    reducedState = getReducedCookingState(originalState, changeCountTo1)
    expect(reducedState.displayConfig.count).toBe(1)
    expect(reducedState.displayConfig.indexes.leftRecipeIndex).toBe(0)
    expect(reducedState.displayConfig.indexes.middleRecipeIndex).toBeUndefined()
    expect(reducedState.displayConfig.indexes.rightRecipeIndex).toBeUndefined()
  })

  it('change display configuration by changing indexes (recipe count 1)', () => {
    const originalState = getInitialCookingState(3, 3)
    originalState.displayConfig = {
      count: 1,
      indexes: { leftRecipeIndex: 0, middleRecipeIndex: undefined, rightRecipeIndex: undefined }
    }

    const moveNext = {
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_INDEXES,
      payload: { moveDirection: 'next' as DisplayDirection, pickedRecipesCount: 3 }
    }

    let reducedState = getReducedCookingState(originalState, moveNext)
    expect(reducedState.displayConfig.count).toBe(1)
    expect(reducedState.displayConfig.indexes.leftRecipeIndex).toBe(1)

    reducedState = getReducedCookingState(reducedState, moveNext)
    expect(reducedState.displayConfig.count).toBe(1)
    expect(reducedState.displayConfig.indexes.leftRecipeIndex).toBe(2)

    const movePrevious = {
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_INDEXES,
      payload: { moveDirection: 'previous' as DisplayDirection, pickedRecipesCount: 3 }
    }

    reducedState = getReducedCookingState(reducedState, movePrevious)
    expect(reducedState.displayConfig.count).toBe(1)
    expect(reducedState.displayConfig.indexes.leftRecipeIndex).toBe(1)
  })

  it('change display configuration by changing indexes (recipe count 3)', () => {
    const originalState = getInitialCookingState(5, 3)
    originalState.displayConfig = {
      count: 3,
      indexes: { leftRecipeIndex: 0, middleRecipeIndex: 1, rightRecipeIndex: 2 }
    }

    const moveNext = {
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_INDEXES,
      payload: { moveDirection: 'next' as DisplayDirection, pickedRecipesCount: 5 }
    }

    let reducedState = getReducedCookingState(originalState, moveNext)
    expect(reducedState.displayConfig.count).toBe(3)
    expect(reducedState.displayConfig.indexes.leftRecipeIndex).toBe(1)
    expect(reducedState.displayConfig.indexes.middleRecipeIndex).toBe(2)
    expect(reducedState.displayConfig.indexes.rightRecipeIndex).toBe(3)

    reducedState = getReducedCookingState(reducedState, moveNext)
    expect(reducedState.displayConfig.indexes.leftRecipeIndex).toBe(2)
    expect(reducedState.displayConfig.indexes.middleRecipeIndex).toBe(3)
    expect(reducedState.displayConfig.indexes.rightRecipeIndex).toBe(4)

    const movePrevious = {
      type: DispatchCookingEvent.UPDATE_DISPLAY_RECIPES_INDEXES,
      payload: { moveDirection: 'previous' as DisplayDirection, pickedRecipesCount: 3 }
    }

    reducedState = getReducedCookingState(reducedState, movePrevious)
    expect(reducedState.displayConfig.indexes.leftRecipeIndex).toBe(1)
    expect(reducedState.displayConfig.indexes.middleRecipeIndex).toBe(2)
    expect(reducedState.displayConfig.indexes.rightRecipeIndex).toBe(3)
  })
})
