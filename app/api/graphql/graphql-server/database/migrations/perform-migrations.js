import * as dotenv from 'dotenv'
dotenv.config()

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const isProduction = process.env.NODE_ENV === 'production'

const options = {
  host: isProduction ? process.env.POSTGRES_HOST : 'localhost',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  user: process.env.POSTGRES_USER ?? 'postgres',
  password: isProduction ? process.env.POSTGRES_PASSWORD : 'postgres',
  database: process.env.POSTGRES_DB ?? 'postgres'
}

const client = postgres('', { ...options, max: 1 })
const database = drizzle(client)

const performMigrations = async () => {
  console.log(`\x1b[36mStart database migrations...\x1b[0m`)
  await migrate(database, { migrationsFolder: 'app/api/graphql/graphql-server/database/migrations' })
  await client.end()
}

performMigrations().then(() => console.log(`\x1b[36mDatabase migrations completed!\x1b[0m`))
