import type { GraphQLClient } from 'graphql-request'
import { client, database } from '../../database/config/config'
import type { AccountDBSelect } from '../../database/inferred-types/inferred-types'
import { clearDatabase } from '../../database/utils/clear-database.js'
import { createEmailAccount } from '../../database/utils/insert-data-to-database'
import type { PatchRecipeInput, Recipe } from '../../modules/types.generated'
import { getHashedPassword } from '../accounts/password-utils'
import { createJWT } from '../accounts/token-utils'
import { emailAccountTestData, recipeTestInput } from './test-data'
import { getGraphQLClient } from './test-graphql-client'
import { TestMutations } from './test-mutations'
import {
  verifyPatchedRecipe,
  verifyRecipeInDatabase,
  verifyRecipeIngredientsInDatabase,
  verifyRecipeInstructionsInDatabase,
  verifyRecipeLanguageInDatabase,
  verifyRecipeTagsInDatabase,
  verifyTableRowCountsInDatabase
} from './verifiers'

const createAuthorAccount = async () => {
  const passwordHash = await getHashedPassword(emailAccountTestData.password)
  const account = await createEmailAccount(database, { ...emailAccountTestData, passwordHash })
  return account as AccountDBSelect
}

const getToken = (account: AccountDBSelect) => {
  return createJWT(account)
}

const createOriginalRecipe = async (graphQLClient: GraphQLClient, authorId: number) => {
  const createRecipeQuery = TestMutations.createRecipe

  const createRecipeResponse = (await graphQLClient.request(createRecipeQuery, {
    createRecipeInput: { ...recipeTestInput, authorId }
  })) as { createRecipe: Recipe }

  const originalRecipe = createRecipeResponse.createRecipe
  return originalRecipe
}

const patchOriginalRecipe = async (graphQLClient: GraphQLClient, recipeId: number, recipePatch: PatchRecipeInput) => {
  const patchRecipeQuery = TestMutations.patchRecipe
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
    const account = await createAuthorAccount()
    const token = getToken(account)
    const graphQLClient = getGraphQLClient(token)
    const originalRecipe = await createOriginalRecipe(graphQLClient, account.id)
    const recipeInput = { ...recipeTestInput, authorId: account.id }

    const newRecipeId = originalRecipe.id
    const languageId = originalRecipe.language.id
    await verifyTableRowCountsInDatabase(recipeInput)
    await verifyRecipeLanguageInDatabase(recipeInput, languageId)
    await verifyRecipeTagsInDatabase(recipeInput, newRecipeId)
    await verifyRecipeInDatabase(recipeInput, newRecipeId)
    await verifyRecipeIngredientsInDatabase(recipeInput, newRecipeId)
    await verifyRecipeInstructionsInDatabase(recipeInput, newRecipeId)
  })

  it('Recipe title can be patched', async () => {
    const account = await createAuthorAccount()
    const token = getToken(account)
    const graphQLClient = getGraphQLClient(token)
    const originalRecipe = await createOriginalRecipe(graphQLClient, account.id)

    const patch = { title: 'New title', authorId: account.id }
    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })
  it('Recipe description can be patched', async () => {
    const account = await createAuthorAccount()
    const token = getToken(account)
    const graphQLClient = getGraphQLClient(token)
    const originalRecipe = await createOriginalRecipe(graphQLClient, account.id)

    const patch = { description: 'New description', authorId: account.id }
    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })

  it('Recipe oven needed can be patched', async () => {
    const account = await createAuthorAccount()
    const token = getToken(account)
    const graphQLClient = getGraphQLClient(token)
    const originalRecipe = await createOriginalRecipe(graphQLClient, account.id)

    const patch = { ovenNeeded: !recipeTestInput.ovenNeeded, authorId: account.id }
    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })

  it('Recipe language can be patched', async () => {
    const account = await createAuthorAccount()
    const token = getToken(account)
    const graphQLClient = getGraphQLClient(token)
    const originalRecipe = await createOriginalRecipe(graphQLClient, account.id)

    const patch = { language: 'New language', authorId: account.id }
    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })

  it('Recipe tags can be patched', async () => {
    const account = await createAuthorAccount()
    const token = getToken(account)
    const graphQLClient = getGraphQLClient(token)
    const originalRecipe = await createOriginalRecipe(graphQLClient, account.id)

    const patch = { tags: ['lentils', 'healthy'], authorId: account.id }
    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })

  it('Recipe ingredients can be patched', async () => {
    const account = await createAuthorAccount()
    const token = getToken(account)
    const graphQLClient = getGraphQLClient(token)
    const originalRecipe = await createOriginalRecipe(graphQLClient, account.id)

    const updatedFirstIngredientGroup = {
      id: originalRecipe.ingredientGroups[0].id,
      title: 'New ingredient group title',
      ingredients: [
        { ...originalRecipe.ingredientGroups[0].ingredients[0] },
        { ...originalRecipe.ingredientGroups[0].ingredients[1] },
        { amount: 0.5, unit: 'tsp', name: 'jeera' }
      ]
    }
    const patch = {
      ingredientGroups: [updatedFirstIngredientGroup, ...originalRecipe.ingredientGroups.slice(1)],
      authorId: account.id
    }

    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })

  it('Recipe instructions can be patched', async () => {
    const account = await createAuthorAccount()
    const token = getToken(account)
    const graphQLClient = getGraphQLClient(token)
    const originalRecipe = await createOriginalRecipe(graphQLClient, account.id)

    const updatedFirstInstructionGroup = {
      id: originalRecipe.instructionGroups[0].id,
      title: 'New instruction group title',
      instructions: [
        { ...originalRecipe.instructionGroups[0].instructions[0] },
        { ...originalRecipe.instructionGroups[0].instructions[1] },
        { content: 'New instruction' }
      ]
    }
    const patch = {
      instructionGroups: [updatedFirstInstructionGroup, ...originalRecipe.instructionGroups.slice(1)],
      authorId: account.id
    }
    const patchedRecipe = await patchOriginalRecipe(graphQLClient, originalRecipe.id, patch)
    verifyPatchedRecipe(patchedRecipe, originalRecipe, patch)
  })

  afterAll(async () => {
    await client.end()
  })
})
