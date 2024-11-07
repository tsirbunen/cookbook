import * as dotenv from 'dotenv'
dotenv.config()

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as accountsSchema from '../database-schemas/accounts'
import * as ingredientSchema from '../database-schemas/ingredients'
import * as instructionSchema from '../database-schemas/instructions'
import * as languageSchema from '../database-schemas/languages'
import * as photosSchema from '../database-schemas/photos'
import * as recipeSchema from '../database-schemas/recipes'
import * as tagSchema from '../database-schemas/tags'
import { localDatabaseOptions } from '../utils/get-database-local-options.js'

const isProduction = process.env.NODE_ENV === 'production'
let client: postgres.Sql

if (isProduction) {
  const connectionString = process.env.DATABASE_CONNECTION_STRING
  if (!connectionString) throw new Error('DATABASE_CONNECTION_STRING is missing!')

  client = postgres(connectionString)
} else {
  client = postgres('', { ...localDatabaseOptions, max: 1 })
}

const database = drizzle(client, {
  schema: {
    ...recipeSchema,
    ...ingredientSchema,
    ...instructionSchema,
    ...languageSchema,
    ...tagSchema,
    ...photosSchema,
    ...accountsSchema
  }
})

export { database, client }
