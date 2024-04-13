import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema1 from '../database-schemas/recipes'
import * as schema2 from '../database-schemas/ingredients'
import * as schema3 from '../database-schemas/instructions'

let options

const nodeEnv = process.env.NODE_ENV

if (!nodeEnv || nodeEnv === 'test' || nodeEnv === 'development') {
  options = {
    host: 'localhost',
    port: parseInt('5432'),
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
  }
} else {
  options = {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
    user: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'postgres',
    database: process.env.POSTGRES_DB ?? 'postgres'
  }
}

const connectionString = process.env.DATABASE_CONNECTION_STRING ?? ''
const client = postgres(connectionString, options)
const database = drizzle(client, { schema: { ...schema1, ...schema2, ...schema3 } })

export { options, database }
