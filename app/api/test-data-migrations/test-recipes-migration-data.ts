import { ingredientGroups, ingredients } from '../graphql/graphql-server/database/database-schemas/ingredients'
import { instructionGroups, instructions } from '../graphql/graphql-server/database/database-schemas/instructions'
import { photos } from '../graphql/graphql-server/database/database-schemas/photos'
import { recipes } from '../graphql/graphql-server/database/database-schemas/recipes'
import { tags, recipesToTags } from '../graphql/graphql-server/database/database-schemas/tags'
import { Language, Recipe } from '../graphql/graphql-server/modules/types.generated'

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
      ovenNeeded: recipe.ovenNeeded,
      languageId: recipe.language ? 2 : 1
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

export const getTestRecipesForCypressGitHubActionsTests = (): Recipe[] => {
  return testRecipesInput.map((recipe) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mainImageUrl, extraImageUrls, language, ...rest } = recipe
    const tags = testRecipesToTagsInput[recipe.id].map((tagId) => {
      return { id: tagId, tag: testTagsInput[tagId - 1] }
    })
    const photos = [{ id: 1, url: recipe.mainImageUrl, isMainPhoto: true, recipeId: recipe.id }]
    if (recipe.id === 1) {
      photos.push({ id: 1, url: recipe.extraImageUrls![0], isMainPhoto: false, recipeId: recipe.id })
    }
    const languageForRecipe: Language = language
      ? { language: testLanguageInput[1].language, id: 2 }
      : { language: testLanguageInput[0].language, id: 1 }
    return { ...rest, tags, photos, language: languageForRecipe }
  })
}

export const getTestLanguagesForCypressGitHubActionsTests = () => {
  return testLanguageInput.map((language, index) => {
    return { ...language, id: index + 1 }
  })
}

export const getTestTagsForCypressGitHubActionsTests = () => {
  return testTagsInput.map((tag, index) => {
    return { tag, id: index + 1 }
  })
}

export const testLanguageInput = [{ language: 'English' }, { language: 'Swedish' }]
const testTagAll = 'test-tag-all'
const testTag1 = 'test-tag-1'
const testTag2 = 'test-tag-2'
export const testTagsInput = [testTagAll, testTag1, testTag2]

export const testRecipesToTagsInput: Record<number, number[]> = {
  1: [1, 2, 3],
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
    ovenNeeded: false,
    ingredientGroups: [
      {
        id: 1,
        title: 'Test recipe 1 ingredient group 1 title',
        ingredients: [
          {
            id: 1,
            amount: 1,
            unit: 'cup',
            name: 'Test recipe 1 ingredient 1 (id 1) BLUEBERRY',
            previousId: null,
            groupId: 1
          },
          { id: 2, amount: 2, name: 'Test recipe 1 ingredient 2 (id 2)', previousId: 1, groupId: 1 },
          { id: 3, unit: 'piece', name: 'Test recipe 1 ingredient 3 (id 3)', previousId: 2, groupId: 1 }
        ]
      },
      {
        id: 2,
        title: 'Test recipe 1 ingredient group 2 title',
        ingredients: [
          { id: 4, amount: 3, unit: 'cup', name: 'Test recipe 1 ingredient 4 (id 4)', previousId: null, groupId: 2 },
          { id: 5, amount: 2, name: 'Test recipe 1 ingredient 5 (id 5)', previousId: 4, groupId: 2 }
        ]
      }
    ],
    instructionGroups: [
      {
        id: 1,
        title: 'Test recipe 1 instruction group 1 title',
        instructions: [
          { id: 1, content: 'Test recipe 1 instruction 1 (id 1)', previousId: null, groupId: 1 },
          { id: 2, content: 'Test recipe 1 instruction 2 (id 2)', previousId: 1, groupId: 1 }
        ]
      },
      {
        id: 2,
        title: 'Test recipe 1 instruction group 2 title',
        instructions: [
          { id: 3, content: 'Test recipe 1 instruction 3 (id 3)', previousId: null, groupId: 2 },
          { id: 4, content: 'Test recipe 1 instruction 4 (id 4)', previousId: 3, groupId: 2 }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Test recipe 2 title',
    description: 'Test recipe 2 description',
    mainImageUrl: 'https://test-recipe-2-image-url.com',
    ovenNeeded: true,
    language: 'Swedish',
    ingredientGroups: [
      {
        id: 3,
        title: 'Test recipe 2 ingredient group 1 title',
        ingredients: [
          {
            id: 6,
            amount: 1,
            unit: 'cup',
            name: 'Test recipe 2 ingredient 1 (id 6)',
            previousId: null,
            groupId: 3
          },
          { id: 7, amount: 2, name: 'Test recipe 2 ingredient 2 (id 7)', previousId: 6, groupId: 3 }
        ]
      },
      {
        id: 4,
        title: 'Test recipe 2 ingredient group 2 title',
        ingredients: [
          { id: 8, amount: 3, unit: 'cup', name: 'Test recipe 2 ingredient 4 (id 8)', previousId: null, groupId: 4 },
          { id: 9, amount: 2, name: 'Test recipe 2 ingredient 5 (id 9)', previousId: 8, groupId: 4 }
        ]
      }
    ],
    instructionGroups: [
      {
        id: 3,
        title: 'Test recipe 2 instruction group 1 title',
        instructions: [
          { id: 5, content: 'Test recipe 2 instruction 1 (id 5)', previousId: null, groupId: 3 },
          { id: 6, content: 'Test recipe 2 instruction 2 (id 6)', previousId: 5, groupId: 3 }
        ]
      },
      {
        id: 4,
        title: 'Test recipe 2 instruction group 2 title',
        instructions: [
          { id: 7, content: 'Test recipe 2 instruction 3 (id 7)', previousId: null, groupId: 4 },
          { id: 8, content: 'Test recipe 2 instruction 4 (id 8)', previousId: 7, groupId: 4 }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Test recipe 3 title',
    description: 'Test recipe 3 description',
    mainImageUrl: 'https://test-recipe-3-image-url.com',
    ovenNeeded: true,
    ingredientGroups: [
      {
        id: 5,
        title: 'Test recipe 3 ingredient group 1 title',
        ingredients: [
          { id: 10, amount: 1, unit: 'cup', name: 'Test recipe 3 ingredient 1 (id 10)', previousId: null, groupId: 5 }
        ]
      }
    ],
    instructionGroups: [
      {
        id: 5,
        title: 'Test recipe 3 instruction group 1 title',
        instructions: [{ id: 9, content: 'Test recipe 3 instruction 1 (id 10)', previousId: null, groupId: 5 }]
      }
    ]
  },
  {
    id: 4,
    title: 'Test recipe 4 title',
    description: 'Test recipe 4 description',
    mainImageUrl: 'https://test-recipe-4-image-url.com',
    ovenNeeded: true,
    ingredientGroups: [
      {
        id: 6,
        title: 'Test recipe 4 ingredient group 1 title',
        ingredients: [
          { id: 11, amount: 1, unit: 'cup', name: 'Test recipe 4 ingredient 1 (id 11)', previousId: null, groupId: 6 }
        ]
      }
    ],
    instructionGroups: [
      {
        id: 6,
        title: 'Test recipe 4 instruction group 1 title',
        instructions: [{ id: 10, content: 'Test recipe 4 instruction 1 (id 11)', previousId: null, groupId: 6 }]
      }
    ]
  },
  {
    id: 5,
    title: 'Test recipe 5 title',
    description: 'Test recipe 5 description',
    mainImageUrl: 'https://test-recipe-5-image-url.com',
    ovenNeeded: true,
    ingredientGroups: [
      {
        id: 7,
        title: 'Test recipe 5 ingredient group 1 title',
        ingredients: [
          { id: 12, amount: 1, unit: 'cup', name: 'Test recipe 5 ingredient 1 (id 12)', previousId: null, groupId: 7 }
        ]
      }
    ],
    instructionGroups: [
      {
        id: 7,
        title: 'Test recipe 5 instruction group 1 title',
        instructions: [{ id: 11, content: 'Test recipe 5 instruction 1 (id 12)', previousId: null, groupId: 7 }]
      }
    ]
  }
]
