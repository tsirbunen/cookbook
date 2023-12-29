import * as dotenv from 'dotenv'
dotenv.config()
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

console.log(process.env.NODE_ENV)
const isProduction = process.env.NODE_ENV === 'production'

const options = {
  host: isProduction ? process.env.POSTGRES_HOST : 'localhost',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  user: process.env.POSTGRES_USER ?? 'postgres',
  password: isProduction ? process.env.POSTGRES_PASSWORD : 'postgres',
  database: process.env.POSTGRES_DB ?? 'postgres'
}
console.log(options)

const client = postgres('', { ...options, max: 1 })
const database = drizzle(client)

const performMigrations = async () => {
  console.log('Start migrations...')
  await migrate(database, { migrationsFolder: 'app/api/graphql/graphql-server/database/migrations' })
  await client.end()
}

performMigrations().then(() => console.log('Migrations complete!'))
