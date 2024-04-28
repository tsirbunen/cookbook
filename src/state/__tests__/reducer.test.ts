import { expect } from '@jest/globals'
import { reducer, Dispatch } from '../reducer'

const applePieRecipe = { id: 1, name: 'Apple Pie', category: 'Dessert' }
const chocolateCakeRecipe = { id: 2, name: 'Chocolate Cake', category: 'Dessert' }
const scrambledEggsRecipe = { id: 3, name: 'Scrambled Eggs', category: 'Breakfast' }
const porridgeRecipe = { id: 4, name: 'Porridge', category: 'Breakfast' }

describe('App state reducer', () => {
  describe('Update picked recipes correctly updates picked recipes state', () => {
    it('when more recipes are picked', () => {
      const originalState = {
        pickedRecipeIdsByCategory: { Dessert: [applePieRecipe.id] },
        pickedRecipes: [applePieRecipe],
        recipes: [
          {
            category: 'Dessert',
            recipes: [applePieRecipe, chocolateCakeRecipe]
          },
          {
            category: 'Breakfast',
            recipes: [scrambledEggsRecipe, porridgeRecipe]
          }
        ]
      }

      const payloadOne = { type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeId: 3, category: 'Breakfast' } }
      // @ts-expect-error -- The state is not a valid AppState but good enough for the test
      const stateWithOneNew = reducer(originalState, payloadOne)

      expect(stateWithOneNew.pickedRecipeIdsByCategory['Dessert'].length).toBe(1)
      expect(stateWithOneNew.pickedRecipeIdsByCategory['Dessert'][0]).toBe(applePieRecipe.id)
      expect(stateWithOneNew.pickedRecipeIdsByCategory['Breakfast'].length).toBe(1)
      expect(stateWithOneNew.pickedRecipeIdsByCategory['Breakfast'][0]).toBe(scrambledEggsRecipe.id)

      const payloadTwo = { type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeId: 4, category: 'Breakfast' } }
      // @ts-expect-error -- The state is not a valid AppState but good enough for the test
      const stateWithTwoNew = reducer(stateWithOneNew, payloadTwo)
      expect(stateWithTwoNew.pickedRecipeIdsByCategory['Dessert'].length).toBe(1)
      expect(stateWithTwoNew.pickedRecipeIdsByCategory['Dessert'][0]).toBe(applePieRecipe.id)
      expect(stateWithTwoNew.pickedRecipeIdsByCategory['Breakfast'].length).toBe(2)
      expect(stateWithTwoNew.pickedRecipeIdsByCategory['Breakfast'][0]).toBe(scrambledEggsRecipe.id)
      expect(stateWithTwoNew.pickedRecipeIdsByCategory['Breakfast'][1]).toBe(porridgeRecipe.id)
    })

    it('when recipes are removed from picked recipes', () => {
      const originalState = {
        pickedRecipeIdsByCategory: {
          Dessert: [applePieRecipe.id, chocolateCakeRecipe.id],
          Breakfast: [scrambledEggsRecipe.id]
        },
        pickedRecipes: [applePieRecipe, chocolateCakeRecipe, scrambledEggsRecipe],
        recipes: [
          {
            category: 'Dessert',
            recipes: [applePieRecipe, chocolateCakeRecipe]
          },
          {
            category: 'Breakfast',
            recipes: [scrambledEggsRecipe, porridgeRecipe]
          }
        ]
      }

      const payloadOne = { type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeId: 2, category: 'Dessert' } }
      // @ts-expect-error -- The state is not a valid AppState but good enough for the test
      const stateWithOneRemoved = reducer(originalState, payloadOne)

      expect(stateWithOneRemoved.pickedRecipeIdsByCategory['Dessert'].length).toBe(1)
      expect(stateWithOneRemoved.pickedRecipeIdsByCategory['Dessert'][0]).toBe(applePieRecipe.id)
      expect(stateWithOneRemoved.pickedRecipeIdsByCategory['Breakfast'].length).toBe(1)
      expect(stateWithOneRemoved.pickedRecipeIdsByCategory['Breakfast'][0]).toBe(scrambledEggsRecipe.id)

      const payloadTwo = { type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeId: 1, category: 'Dessert' } }
      // @ts-expect-error -- The state is not a valid AppState but good enough for the test
      const stateWithTwoRemoved = reducer(stateWithOneRemoved, payloadTwo)
      expect(stateWithTwoRemoved.pickedRecipeIdsByCategory['Dessert'].length).toBe(0)
      expect(stateWithTwoRemoved.pickedRecipeIdsByCategory['Breakfast'].length).toBe(1)
      expect(stateWithTwoRemoved.pickedRecipeIdsByCategory['Breakfast'][0]).toBe(scrambledEggsRecipe.id)
    })
  })
})
