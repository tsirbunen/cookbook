/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApolloError } from '@apollo/client'
import { useState } from 'react'

type UseRecipeApi = {
  queryError: ApolloError | undefined
  queryLoading: boolean
  allRecipes: any
}

export const useRecipeApi = (): UseRecipeApi => {
  const [allRecipes] = useState([
    cypressTestRecipe1,
    cypressTestRecipe2,
    cypressTestRecipe3,
    cypressTestRecipe4,
    cypressTestRecipe5
  ] as any)
  return {
    queryError: undefined,
    queryLoading: false,
    allRecipes
  }
}

const testRecipeBase = {
  id: 1,
  title: 'CYPRESS TITLE 1',
  description: 'cypress decription 1',
  mainImageUrl: 'cypress-image-url-1',
  extraImageUrls: [],
  tags: ['cypress'],
  isFavorite: true,
  category: 'SNACK',
  ovenNeeded: false,
  ingredientGroups: [
    {
      id: 1,
      title: null,
      ingredients: [
        {
          id: 1,
          amount: 1,
          unit: 'cup',
          name: 'cypress',
          previousIngredientId: null
        }
      ]
    }
  ],
  instructionGroups: [
    {
      id: 1,
      title: null,
      instructions: [
        {
          id: 1,
          content:
            "The night before, soak the dried chickpeas in water. Make sure the water covers the chickpeas by 2 to 3 inches, as they'll triple in size.",
          previousInstructionId: null,
          ingredientReferenceIds: [1]
        }
      ]
    }
  ]
}

const cypressTestRecipe1 = {
  ...testRecipeBase,
  ingredientGroups: [
    {
      id: 1,
      title: null,
      ingredients: [
        {
          id: 1,
          amount: 1,
          unit: 'cup',
          name: 'cypress',
          previousIngredientId: null
        },
        { id: 2, amount: 0.5, unit: 'cup', name: 'blueberry', previousIngredientId: 1 }
      ]
    }
  ]
}

const cypressTestRecipe2 = {
  ...testRecipeBase,
  id: 2,
  title: 'CYPRESS TITLE 2',
  description: 'cypress decription 2',
  mainImageUrl: 'cypress-image-url-2',
  category: 'BRUNCH',
  ovenNeeded: true,
  isFavorite: false
}

const cypressTestRecipe3 = {
  ...testRecipeBase,
  id: 3,
  title: 'CYPRESS TITLE 3',
  description: 'cypress decription 3',
  mainImageUrl: 'cypress-image-url-3',
  category: 'DINNER',
  ovenNeeded: true,
  isFavorite: false
}

const cypressTestRecipe4 = {
  ...testRecipeBase,
  id: 4,
  title: 'CYPRESS TITLE 4',
  description: 'cypress decription 4',
  mainImageUrl: 'cypress-image-url-4',
  category: 'DINNER',
  ovenNeeded: true,
  isFavorite: false
}

const cypressTestRecipe5 = {
  ...testRecipeBase,
  id: 5,
  title: 'CYPRESS TITLE 5',
  description: 'cypress decription 5',
  mainImageUrl: 'cypress-image-url-5',
  category: 'DINNER',
  ovenNeeded: true,
  isFavorite: false
}
