import { client } from '../../database/config/config'
import { getGraphQLClient } from './test-graphql-client'
import { TestQueries } from './test-queries'
import { clearDatabase } from './test-database-helpers'
import { Recipe } from '../../modules/types.generated'
import { recipeTestInput } from './test-data'
import {
  verifyRecipeIngredientsInDatabase,
  verifyRecipeInstructionsInDatabase,
  verifyRecipeLanguageInDatabase,
  verifyRecipeInDatabase,
  verifyTableRowCountsInDatabase,
  verifyRecipeTagsInDatabase
} from './test-verifiers'

describe('Handle recipes', () => {
  beforeEach(async () => {
    await clearDatabase()
  })

  it('New recipe can be created', async () => {
    const graphQLClient = getGraphQLClient()
    const query = TestQueries.createRecipe

    const response = (await graphQLClient.request(query, {
      recipeInput: recipeTestInput
    })) as { createRecipe: Recipe }

    const newRecipeId = response.createRecipe.id
    const languageId = response.createRecipe.language.id
    await verifyTableRowCountsInDatabase(recipeTestInput)
    await verifyRecipeLanguageInDatabase(recipeTestInput, languageId)
    await verifyRecipeTagsInDatabase(recipeTestInput, newRecipeId)
    await verifyRecipeInDatabase(recipeTestInput, newRecipeId)
    await verifyRecipeIngredientsInDatabase(recipeTestInput, newRecipeId)
    await verifyRecipeInstructionsInDatabase(recipeTestInput, newRecipeId)
  })

  afterAll(async () => {
    await client.end()
  })
})
