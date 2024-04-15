import { ingredientGroups, ingredients } from '../graphql/graphql-server/database/database-schemas/ingredients'
import { instructionGroups, instructions } from '../graphql/graphql-server/database/database-schemas/instructions'
import { recipes, photos, tags, recipesToTags } from '../graphql/graphql-server/database/database-schemas/recipes'

type NewRecipe = typeof recipes.$inferInsert
type NewPhoto = typeof photos.$inferInsert
type NewTag = typeof tags.$inferInsert
type NewIngredientGroup = typeof ingredientGroups.$inferInsert
type NewIngredient = typeof ingredients.$inferInsert
type NewInstructionGroup = typeof instructionGroups.$inferInsert
type NewInstruction = typeof instructions.$inferInsert
type NewRecipeToTag = typeof recipesToTags.$inferInsert

export const getDatabaseTableTestInputs = () => {
  const recipeInputs: NewRecipe[] = []
  const ingredientInputs: NewIngredient[] = []
  const instructionInputs: NewInstruction[] = []
  const ingredientGroupInputs: NewIngredientGroup[] = []
  const instructionGroupInputs: NewInstructionGroup[] = []
  const photoInputs: NewPhoto[] = []
  const tagInputs: NewTag[] = testTagsInput.map((tag) => ({ tag }))
  const recipesToTagsInputs: NewRecipeToTag[] = []
  for (const [recipeId, tagIds] of Object.entries(testRecipesToTagsInput)) {
    for (const tagId of tagIds) {
      recipesToTagsInputs.push({ recipeId: parseInt(recipeId), tagId })
    }
  }

  for (const recipe of testRecipesInput) {
    recipeInputs.push({
      title: recipe.title,
      description: recipe.description,
      category: recipe.category,
      ovenNeeded: recipe.ovenNeeded,
      languageId: 1
    })

    photoInputs.push({
      url: recipe.mainImageUrl,
      isMainPhoto: true,
      recipeId: recipe.id
    })

    recipe.extraImageUrls?.forEach((url) => {
      photoInputs.push({
        url,
        isMainPhoto: false,
        recipeId: recipe.id
      })
    })

    for (const ingredientGroup of recipe.ingredientGroups) {
      ingredientGroupInputs.push({
        title: ingredientGroup.title,
        recipeId: recipe.id
      })

      for (const ingredient of ingredientGroup.ingredients) {
        ingredientInputs.push({
          amount: ingredient.amount ?? null,
          unit: ingredient.unit ?? null,
          name: ingredient.name,
          previousIngredientId: ingredient.previousIngredientId ?? null,
          ingredientGroupId: ingredient.ingredientGroupId
        })
      }
    }

    for (const instructionGroup of recipe.instructionGroups) {
      instructionGroupInputs.push({
        title: instructionGroup.title,
        recipeId: recipe.id
      })

      for (const instruction of instructionGroup.instructions) {
        instructionInputs.push({
          content: instruction.content,
          previousInstructionId: instruction.previousInstructionId ?? null,
          instructionGroupId: instruction.instructionGroupId
        })
      }
    }
  }

  return {
    recipeInputs,
    ingredientInputs,
    instructionInputs,
    ingredientGroupInputs,
    instructionGroupInputs,
    photoInputs,
    tagInputs,
    recipesToTagsInputs,
    languageInputs: testLanguageInput
  }
}

export const getTestDataForCypressGitHubActionsTests = () => {
  return testRecipesInput.map((recipe) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mainImageUrl, extraImageUrls, ...rest } = recipe
    const tags = testRecipesToTagsInput[recipe.id].map((tagId) => {
      return { id: tagId, tag: testTagsInput[tagId - 1] }
    })
    const photos = [{ url: recipe.mainImageUrl, isMainPhoto: true, recipeId: recipe.id }]
    if (recipe.id === 1) {
      photos.push({ url: recipe.extraImageUrls![0], isMainPhoto: false, recipeId: recipe.id })
    }

    return { ...rest, tags, photos, language: { ...testLanguageInput[0], id: 1 } }
  })
}

export const testLanguageInput = [{ language: 'English' }]
export const testTagsInput = ['test-tag', 'cypress-tag']

export const testRecipesToTagsInput: Record<number, number[]> = {
  1: [1, 2],
  2: [1, 2],
  3: [1],
  4: [1],
  5: [1]
}

export const testRecipesInput = [
  {
    id: 1,
    title: 'Test recipe 1 title',
    description: 'Test recipe 1 description',
    mainImageUrl: 'https://test-recipe-1-image-url.com',
    extraImageUrls: ['https://test-recipe-1-image-url-2.com'],
    category: 'SNACK',
    ovenNeeded: false,
    ingredientGroups: [
      {
        title: 'Test recipe 1 ingredient group 1 title',
        ingredients: [
          {
            amount: 1,
            unit: 'cup',
            name: 'Test recipe 1 ingredient 1 (id 1) BLUEBERRY',
            previousIngredientId: null,
            ingredientGroupId: 1
          },
          { amount: 2, name: 'Test recipe 1 ingredient 2 (id 2)', previousIngredientId: 1, ingredientGroupId: 1 },
          { unit: 'piece', name: 'Test recipe 1 ingredient 3 (id 3)', previousIngredientId: 2, ingredientGroupId: 1 }
        ]
      },
      {
        title: 'Test recipe 1 ingredient group 2 title',
        ingredients: [
          {
            amount: 3,
            unit: 'cup',
            name: 'Test recipe 1 ingredient 4 (id 4)',
            previousIngredientId: null,
            ingredientGroupId: 2
          },
          { amount: 2, name: 'Test recipe 1 ingredient 5 (id 5)', previousIngredientId: 4, ingredientGroupId: 2 }
        ]
      }
    ],
    instructionGroups: [
      {
        title: 'Test recipe 1 instruction group 1 title',
        instructions: [
          { content: 'Test recipe 1 instruction 1 (id 1)', previousInstructionId: null, instructionGroupId: 1 },
          { content: 'Test recipe 1 instruction 2 (id 2)', previousInstructionId: 1, instructionGroupId: 1 }
        ]
      },
      {
        title: 'Test recipe 1 instruction group 2 title',
        instructions: [
          { content: 'Test recipe 1 instruction 3 (id 3)', previousInstructionId: null, instructionGroupId: 2 },
          { content: 'Test recipe 1 instruction 4 (id 4)', previousInstructionId: 3, instructionGroupId: 2 }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Test recipe 2 title',
    description: 'Test recipe 2 description',
    mainImageUrl: 'https://test-recipe-2-image-url.com',
    category: 'DESSERT',
    ovenNeeded: true,
    ingredientGroups: [
      {
        title: 'Test recipe 2 ingredient group 1 title',
        ingredients: [
          {
            amount: 1,
            unit: 'cup',
            name: 'Test recipe 2 ingredient 1 (id 6)',
            previousIngredientId: null,
            ingredientGroupId: 3
          },
          { amount: 2, name: 'Test recipe 2 ingredient 2 (id 7)', previousIngredientId: 6, ingredientGroupId: 3 }
        ]
      },
      {
        title: 'Test recipe 2 ingredient group 2 title',
        ingredients: [
          {
            amount: 3,
            unit: 'cup',
            name: 'Test recipe 2 ingredient 4 (id 8)',
            previousIngredientId: null,
            ingredientGroupId: 4
          },
          { amount: 2, name: 'Test recipe 2 ingredient 5 (id 9)', previousIngredientId: 8, ingredientGroupId: 4 }
        ]
      }
    ],
    instructionGroups: [
      {
        title: 'Test recipe 2 instruction group 1 title',
        instructions: [
          { content: 'Test recipe 2 instruction 1 (id 5)', previousInstructionId: null, instructionGroupId: 3 },
          { content: 'Test recipe 2 instruction 2 (id 6)', previousInstructionId: 5, instructionGroupId: 3 }
        ]
      },
      {
        title: 'Test recipe 2 instruction group 2 title',
        instructions: [
          { content: 'Test recipe 2 instruction 3 (id 7)', previousInstructionId: null, instructionGroupId: 4 },
          { content: 'Test recipe 2 instruction 4 (id 8)', previousInstructionId: 7, instructionGroupId: 4 }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Test recipe 3 title',
    description: 'Test recipe 3 description',
    mainImageUrl: 'https://test-recipe-3-image-url.com',
    category: 'DINNER',
    ovenNeeded: true,
    ingredientGroups: [
      {
        title: 'Test recipe 3 ingredient group 1 title',
        ingredients: [
          {
            amount: 1,
            unit: 'cup',
            name: 'Test recipe 3 ingredient 1 (id 10)',
            previousIngredientId: null,
            ingredientGroupId: 5
          }
        ]
      }
    ],
    instructionGroups: [
      {
        title: 'Test recipe 3 instruction group 1 title',
        instructions: [
          { content: 'Test recipe 3 instruction 1 (id 10)', previousInstructionId: null, instructionGroupId: 5 }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Test recipe 4 title',
    description: 'Test recipe 4 description',
    mainImageUrl: 'https://test-recipe-4-image-url.com',
    category: 'DINNER',
    ovenNeeded: true,
    ingredientGroups: [
      {
        title: 'Test recipe 4 ingredient group 1 title',
        ingredients: [
          {
            amount: 1,
            unit: 'cup',
            name: 'Test recipe 4 ingredient 1 (id 11)',
            previousIngredientId: null,
            ingredientGroupId: 6
          }
        ]
      }
    ],
    instructionGroups: [
      {
        title: 'Test recipe 4 instruction group 1 title',
        instructions: [
          { content: 'Test recipe 4 instruction 1 (id 11)', previousInstructionId: null, instructionGroupId: 6 }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Test recipe 5 title',
    description: 'Test recipe 5 description',
    mainImageUrl: 'https://test-recipe-5-image-url.com',
    category: 'DINNER',
    ovenNeeded: true,
    ingredientGroups: [
      {
        title: 'Test recipe 5 ingredient group 1 title',
        ingredients: [
          {
            amount: 1,
            unit: 'cup',
            name: 'Test recipe 5 ingredient 1 (id 12)',
            previousIngredientId: null,
            ingredientGroupId: 7
          }
        ]
      }
    ],
    instructionGroups: [
      {
        title: 'Test recipe 5 instruction group 1 title',
        instructions: [
          { content: 'Test recipe 5 instruction 1 (id 12)', previousInstructionId: null, instructionGroupId: 7 }
        ]
      }
    ]
  }
]
