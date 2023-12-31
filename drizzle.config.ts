import * as dotenv from 'dotenv'
dotenv.config()

import type { Config } from 'drizzle-kit'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  schema: './app/api/graphql/graphql-server/database/database-schemas/*',
  out: './app/api/graphql/graphql-server/database/migrations',
  driver: 'pg',
  dbCredentials: {
    host: isProduction ? process.env.POSTGRES_HOST! : 'localhost',
    port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
    user: process.env.POSTGRES_USER ?? 'postgres',
    password: isProduction ? process.env.POSTGRES_PASSWORD : 'postgres',
    database: process.env.POSTGRES_DB ?? 'postgres'
  }
} satisfies Config
