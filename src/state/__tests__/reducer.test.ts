import { expect } from '@jest/globals'
import { reducer, Dispatch } from '../reducer'

const applePieRecipe = { id: 1, name: 'Apple Pie' }
const chocolateCakeRecipe = { id: 2, name: 'Chocolate Cake' }
const scrambledEggsRecipe = { id: 3, name: 'Scrambled Eggs' }
const porridgeRecipe = { id: 4, name: 'Porridge' }

describe('App state reducer', () => {
  describe('"Update picked recipes" correctly updates picked recipes state', () => {
    it('when more recipes are picked', () => {
      const originalState = {
        pickedRecipeIds: [applePieRecipe.id],
        pickedRecipes: [applePieRecipe],
        recipes: [applePieRecipe, chocolateCakeRecipe, scrambledEggsRecipe, porridgeRecipe]
      }

      const actionOne = { type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeIds: [3] } }
      // @ts-expect-error -- The state is not a valid AppState but good enough for the test
      const stateWithOneNew = reducer(originalState, actionOne)

      expect(stateWithOneNew.pickedRecipeIds.length).toBe(2)
      expect(stateWithOneNew.pickedRecipeIds[0]).toBe(applePieRecipe.id)
      expect(stateWithOneNew.pickedRecipeIds[1]).toBe(scrambledEggsRecipe.id)

      const actionTwo = { type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeIds: [4] } }
      // @ts-expect-error -- The state is not a valid AppState but good enough for the test
      const stateWithTwoNew = reducer(stateWithOneNew, actionTwo)
      expect(stateWithTwoNew.pickedRecipeIds.length).toBe(3)
      expect(stateWithTwoNew.pickedRecipeIds[0]).toBe(applePieRecipe.id)
      expect(stateWithTwoNew.pickedRecipeIds[1]).toBe(scrambledEggsRecipe.id)
      expect(stateWithTwoNew.pickedRecipeIds[2]).toBe(porridgeRecipe.id)
    })

    it('when recipes are removed from picked recipes', () => {
      const originalState = {
        pickedRecipeIds: [applePieRecipe.id, chocolateCakeRecipe.id, scrambledEggsRecipe.id],
        pickedRecipes: [applePieRecipe, chocolateCakeRecipe, scrambledEggsRecipe],
        recipes: [applePieRecipe, chocolateCakeRecipe, scrambledEggsRecipe, porridgeRecipe]
      }

      const actionOne = { type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeIds: [2] } }
      // @ts-expect-error -- The state is not a valid AppState but good enough for the test
      const stateWithOneRemoved = reducer(originalState, actionOne)

      expect(stateWithOneRemoved.pickedRecipeIds.length).toBe(2)
      expect(stateWithOneRemoved.pickedRecipeIds[0]).toBe(applePieRecipe.id)
      expect(stateWithOneRemoved.pickedRecipeIds[1]).toBe(scrambledEggsRecipe.id)

      const actionTwo = { type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeIds: [1] } }
      // @ts-expect-error -- The state is not a valid AppState but good enough for the test
      const stateWithTwoRemoved = reducer(stateWithOneRemoved, actionTwo)
      expect(stateWithTwoRemoved.pickedRecipeIds.length).toBe(1)
      expect(stateWithTwoRemoved.pickedRecipeIds[0]).toBe(scrambledEggsRecipe.id)
    })
  })
})
