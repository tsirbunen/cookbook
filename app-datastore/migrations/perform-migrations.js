import * as dotenv from 'dotenv'
dotenv.config()

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const performMigrations = async () => {
  console.log(`\x1b[36mStart database migrations...\x1b[0m`)

  const isProduction = process.env.NODE_ENV === 'production'
  let client
  if (isProduction) {
    const connectionString = process.env.DATABASE_CONNECTION_STRING
    if (!connectionString) throw new Error('DATABASE_CONNECTION_STRING is missing!')

    client = postgres(connectionString)
  } else {
    const options = {
      host: Boolean(process.env.IS_GITHUB) ? 'postgres' : 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres'
    }

    client = postgres('', { ...options, max: 1 })
  }

  const database = drizzle(client)

  await migrate(database, { migrationsFolder: 'app-datastore/migrations' })
  await client.end()
}

performMigrations().then(() => console.log(`\x1b[36mDatabase migrations completed!\x1b[0m`))
