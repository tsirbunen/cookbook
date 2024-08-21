import { client, database } from '../../database/config/config'
import { getGraphQLClient } from './test-graphql-client'
import { TestQueries } from './test-queries'
import { clearDatabase } from '../../database/utils/clear-database.js'
import { Recipe, RecipeInput } from '../../modules/types.generated'
import { recipeTestInput } from './test-data'
import {
  verifyRecipeIngredientsInDatabase,
  verifyRecipeInstructionsInDatabase,
  verifyRecipeLanguageInDatabase,
  verifyRecipeInDatabase,
  verifyTableRowCountsInDatabase,
  verifyRecipeTagsInDatabase,
  verifyPatchedRecipe
} from './test-verifiers'
import { GraphQLClient } from 'graphql-request'

const createOriginalRecipe = async (graphQLClient: GraphQLClient) => {
  const createRecipeQuery = TestQueries.createRecipe

  const createRecipeResponse = (await graphQLClient.request(createRecipeQuery, {
    recipeInput: recipeTestInput
  })) as { createRecipe: Recipe }
  const originalRecipe = createRecipeResponse.createRecipe
  return originalRecipe
}

const patchOriginalRecipe = async (graphQLClient: GraphQLClient, recipeId: number, recipePatch: RecipeInput) => {
  const patchRecipeQuery = TestQueries.patchRecipe
  const patchRecipeResponse = (await graphQLClient.request(patchRecipeQuery, {
    recipeId,
    recipePatch
  })) as { patchRecipe: Recipe }
  return patchRecipeResponse.patchRecipe
}

describe('Handle recipes', () => {
  beforeEach(async () => {
    await clearDatabase(database)
  })

  it('New recipe can be created', async () => {
    const graphQLClient = getGraphQLClient()
    const originalRecipe = await createOriginalRecipe(graphQLClient)
    const newRecipeId = originalRecipe.id
    const languageId = originalRecipe.language.id
    await verifyTableRowCountsInDatabase(recipeTestInput)
    await verifyRecipeLanguageInDatabase(recipeTestInput, languageId)
    await verifyRecipeTagsInDatabase(recipeTestInput, newRecipeId)
    await verifyRecipeInDatabase(recipeTestInput, newRecipeId)
    await verifyRecipeIngredientsInDatabase(recipeTestInput, newRecipeId)
    await verifyRecipeInstructionsInDatabase(recipeTestInput, newRecipeId)
  })

  it('Recipe title can be patched', async () => {
    const graphQLClient = getGraphQLClient()
    const originalRecipe = await createOriginalRecipe(graphQLClient)

    const patch = { title: 'New title' }
    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })
  it('Recipe description can be patched', async () => {
    const graphQLClient = getGraphQLClient()
    const originalRecipe = await createOriginalRecipe(graphQLClient)

    const patch = { description: 'New description' }
    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })

  it('Recipe oven needed can be patched', async () => {
    const graphQLClient = getGraphQLClient()
    const originalRecipe = await createOriginalRecipe(graphQLClient)

    const patch = { ovenNeeded: !recipeTestInput.ovenNeeded }
    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })

  it('Recipe language can be patched', async () => {
    const graphQLClient = getGraphQLClient()
    const originalRecipe = await createOriginalRecipe(graphQLClient)

    const patch = { language: 'New language' }
    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })

  it('Recipe tags can be patched', async () => {
    const graphQLClient = getGraphQLClient()
    const originalRecipe = await createOriginalRecipe(graphQLClient)

    const patch = { tags: ['lentils', 'healthy'] }
    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })

  it('Recipe ingredients can be patched', async () => {
    const graphQLClient = getGraphQLClient()
    const originalRecipe = await createOriginalRecipe(graphQLClient)

    const updatedFirstIngredientGroup = {
      id: originalRecipe.ingredientGroups[0].id,
      title: 'New ingredient group title',
      ingredients: [
        { ...originalRecipe.ingredientGroups[0].ingredients[0] },
        { ...originalRecipe.ingredientGroups[0].ingredients[1] },
        { amount: 0.5, unit: 'tsp', name: 'jeera' }
      ]
    }
    const patch = { ingredientGroups: [updatedFirstIngredientGroup, ...originalRecipe.ingredientGroups.slice(1)] }

    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })

  it('Recipe instructions can be patched', async () => {
    const graphQLClient = getGraphQLClient()
    const originalRecipe = await createOriginalRecipe(graphQLClient)

    const updatedFirstInstructionGroup = {
      id: originalRecipe.instructionGroups[0].id,
      title: 'New instruction group title',
      instructions: [
        { ...originalRecipe.instructionGroups[0].instructions[0] },
        { ...originalRecipe.instructionGroups[0].instructions[1] },
        { content: 'New instruction' }
      ]
    }
    const patch = { instructionGroups: [updatedFirstInstructionGroup, ...originalRecipe.instructionGroups.slice(1)] }
    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })

  afterAll(async () => {
    await client.end()
  })
})
