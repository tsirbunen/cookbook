import * as dotenv from 'dotenv'
dotenv.config()

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as recipeSchema from '../database-schemas/recipes'
import * as ingredientSchema from '../database-schemas/ingredients'
import * as instructionSchema from '../database-schemas/instructions'
import * as languageSchema from '../database-schemas/languages'
import * as tagSchema from '../database-schemas/tags'
import * as photosSchema from '../database-schemas/photos'

const isProduction = process.env.NODE_ENV === 'production'
let client: postgres.Sql

if (isProduction) {
  console.log('ENV IS PRODUCTION!')
  const connectionString = process.env.DATABASE_CONNECTION_STRING
  if (!connectionString) throw new Error('DATABASE_CONNECTION_STRING is missing!')

  client = postgres(connectionString)
} else {
  // const isGithubTest = !!process.env.IS_GITHUB
  // console.log('ENV IS NOT PRODUCTION!', isGithubTest ? 'IS GITHUB TEST' : 'IS LOCAL')
  const options = {
    host: Boolean(process.env.IS_GITHUB) ? 'postgres' : 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
  }

  client = postgres('', { ...options, max: 1 })
}

const database = drizzle(client, {
  schema: {
    ...recipeSchema,
    ...ingredientSchema,
    ...instructionSchema,
    ...languageSchema,
    ...tagSchema,
    ...photosSchema
  }
})

export { database, client }
