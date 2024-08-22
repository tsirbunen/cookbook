import * as dotenv from 'dotenv'
dotenv.config()

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { localDatabaseOptions } from '../utils/get-database-local-options.js'
import { clearDatabase } from '../utils/clear-database.js'
import {
  getOrCreateLanguage,
  createRecipe,
  getOrCreateTags,
  createRecipesToTags,
  createIngredientGroups,
  createInstructionGroups,
  createPhotos
} from '../utils/insert-data-to-database.js'
import { lemonyLentilSoup } from './example-data-2.js'
import { belugaBolognese } from './example-data-1.js'
import { maximumDeliciousDal } from './example-data-3.js'

const START_INFO = `\x1b[36mStart inserting example data to database...\x1b[0m`
const COMPLETED_INFO = `\x1b[36mInsert example data completed!\x1b[0m`
const CLEAR_DATABASE_INFO = `\x1b[35mClear existing data from database!\x1b[0m`
const CREATED_RECIPE_INFO = `\x1b[33mCreated recipe with title "{title}"\x1b[0m`

const insertExampleData = async () => {
  console.log(START_INFO)
  console.log(CLEAR_DATABASE_INFO)

  const client = postgres('', { ...localDatabaseOptions, max: 1 })

  const database = drizzle(client)
  await clearDatabase(database)

  const exampleRecipeInputs = [lemonyLentilSoup, belugaBolognese, maximumDeliciousDal]
  for await (const recipeInput of exampleRecipeInputs) {
    const language = await getOrCreateLanguage(database, recipeInput.language)
    const recipe = await createRecipe(database, recipeInput, language.id)
    const tags = await getOrCreateTags(database, recipeInput.tags)
    await createRecipesToTags(database, recipe.id, tags)
    await createIngredientGroups(database, recipeInput.ingredientGroups, recipe.id)
    await createInstructionGroups(database, recipeInput.instructionGroups, recipe.id)
    await createPhotos(database, recipeInput.photoIdentifiers, recipe.id)
    console.log(CREATED_RECIPE_INFO.replace('{title}', recipeInput.title))
  }

  await client.end()
}

insertExampleData().then(() => console.log(COMPLETED_INFO))
