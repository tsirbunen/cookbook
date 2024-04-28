import { ingredientGroups, ingredients } from '../graphql/graphql-server/database/database-schemas/ingredients'
import { instructionGroups, instructions } from '../graphql/graphql-server/database/database-schemas/instructions'
import { photos } from '../graphql/graphql-server/database/database-schemas/photos'
import { recipes } from '../graphql/graphql-server/database/database-schemas/recipes'
import { tags, recipesToTags } from '../graphql/graphql-server/database/database-schemas/tags'

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
          previousId: ingredient.previousId ?? null,
          groupId: ingredient.groupId
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
          previousId: instruction.previousId ?? null,
          groupId: instruction.groupId
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
            previousId: null,
            groupId: 1
          },
          { amount: 2, name: 'Test recipe 1 ingredient 2 (id 2)', previousId: 1, groupId: 1 },
          { unit: 'piece', name: 'Test recipe 1 ingredient 3 (id 3)', previousId: 2, groupId: 1 }
        ]
      },
      {
        title: 'Test recipe 1 ingredient group 2 title',
        ingredients: [
          {
            amount: 3,
            unit: 'cup',
            name: 'Test recipe 1 ingredient 4 (id 4)',
            previousId: null,
            groupId: 2
          },
          { amount: 2, name: 'Test recipe 1 ingredient 5 (id 5)', previousId: 4, groupId: 2 }
        ]
      }
    ],
    instructionGroups: [
      {
        title: 'Test recipe 1 instruction group 1 title',
        instructions: [
          { content: 'Test recipe 1 instruction 1 (id 1)', previousId: null, groupId: 1 },
          { content: 'Test recipe 1 instruction 2 (id 2)', previousId: 1, groupId: 1 }
        ]
      },
      {
        title: 'Test recipe 1 instruction group 2 title',
        instructions: [
          { content: 'Test recipe 1 instruction 3 (id 3)', previousId: null, groupId: 2 },
          { content: 'Test recipe 1 instruction 4 (id 4)', previousId: 3, groupId: 2 }
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
            previousId: null,
            groupId: 3
          },
          { amount: 2, name: 'Test recipe 2 ingredient 2 (id 7)', previousId: 6, groupId: 3 }
        ]
      },
      {
        title: 'Test recipe 2 ingredient group 2 title',
        ingredients: [
          {
            amount: 3,
            unit: 'cup',
            name: 'Test recipe 2 ingredient 4 (id 8)',
            previousId: null,
            groupId: 4
          },
          { amount: 2, name: 'Test recipe 2 ingredient 5 (id 9)', previousId: 8, groupId: 4 }
        ]
      }
    ],
    instructionGroups: [
      {
        title: 'Test recipe 2 instruction group 1 title',
        instructions: [
          { content: 'Test recipe 2 instruction 1 (id 5)', previousId: null, groupId: 3 },
          { content: 'Test recipe 2 instruction 2 (id 6)', previousId: 5, groupId: 3 }
        ]
      },
      {
        title: 'Test recipe 2 instruction group 2 title',
        instructions: [
          { content: 'Test recipe 2 instruction 3 (id 7)', previousId: null, groupId: 4 },
          { content: 'Test recipe 2 instruction 4 (id 8)', previousId: 7, groupId: 4 }
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
            previousId: null,
            groupId: 5
          }
        ]
      }
    ],
    instructionGroups: [
      {
        title: 'Test recipe 3 instruction group 1 title',
        instructions: [{ content: 'Test recipe 3 instruction 1 (id 10)', previousId: null, groupId: 5 }]
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
            previousId: null,
            groupId: 6
          }
        ]
      }
    ],
    instructionGroups: [
      {
        title: 'Test recipe 4 instruction group 1 title',
        instructions: [{ content: 'Test recipe 4 instruction 1 (id 11)', previousId: null, groupId: 6 }]
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
            previousId: null,
            groupId: 7
          }
        ]
      }
    ],
    instructionGroups: [
      {
        title: 'Test recipe 5 instruction group 1 title',
        instructions: [{ content: 'Test recipe 5 instruction 1 (id 12)', previousId: null, groupId: 7 }]
      }
    ]
  }
]
