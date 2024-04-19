import { expect } from '@jest/globals'
import { arrangeRecipesInCategories } from '../utils'
import { NO_CATEGORY_TITLE } from '../../constants/text-content'

describe('Recipes service utils', () => {
  describe('arrangeRecipesInCategories', () => {
    it('should correctly categorize recipes', () => {
      const recipes = [
        { id: 1, name: 'Apple Pie', category: 'Dessert' },
        { id: 2, name: 'Chocolate Cake', category: 'Dessert' },
        { id: 3, name: 'Scrambled Eggs', category: 'Breakfast' },
        { id: 4, name: 'Porridge', category: 'Breakfast' },
        { id: 5, name: 'Mystery Dish' }
      ]

      // @ts-expect-error -- The recipes are not valid Recipes but good enough for the test
      const result = arrangeRecipesInCategories(recipes)

      expect(result).toEqual([
        {
          category: 'Dessert',
          recipes: [
            { id: 1, name: 'Apple Pie', category: 'Dessert' },
            { id: 2, name: 'Chocolate Cake', category: 'Dessert' }
          ]
        },
        {
          category: 'Breakfast',
          recipes: [
            { id: 3, name: 'Scrambled Eggs', category: 'Breakfast' },
            { id: 4, name: 'Porridge', category: 'Breakfast' }
          ]
        },
        {
          category: NO_CATEGORY_TITLE,
          recipes: [{ id: 5, name: 'Mystery Dish' }]
        }
      ])
    })

    it('should return an empty array when no recipes are provided', () => {
      const result = arrangeRecipesInCategories([])
      expect(result).toEqual([])
    })

    it('should correctly handle recipes without a category', () => {
      const recipes = [
        { id: 1, name: 'Mystery Dish 1' },
        { id: 2, name: 'Mystery Dish 2' }
      ]

      // @ts-expect-error -- The recipes are not valid Recipes but good enough for the test
      const result = arrangeRecipesInCategories(recipes)

      expect(result).toEqual([
        {
          category: NO_CATEGORY_TITLE,
          recipes: [
            { id: 1, name: 'Mystery Dish 1' },
            { id: 2, name: 'Mystery Dish 2' }
          ]
        }
      ])
    })
  })
})
