import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const options = {
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  user: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'postgres',
  database: process.env.POSTGRES_DB ?? 'postgres'
}

const connectionString = process.env.DATABASE_CONNECTION_STRING ?? ''
const client = postgres(connectionString, options)
const database = drizzle(client)

export { options, database }
