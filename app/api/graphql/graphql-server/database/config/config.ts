import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const options = {
  host: process.env.POSTGRES_HOST!,
  port: parseInt(process.env.POSTGRES_PORT!),
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DB!
}

const connectionString = process.env.DATABASE_CONNECTION_STRING!
const client = postgres(connectionString, options)
const database = drizzle(client)

export { database }
