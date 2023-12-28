import * as dotenv from 'dotenv'
dotenv.config()

import type { Config } from 'drizzle-kit'

export default {
  schema: './app/api/graphql/graphql-server/database/schemas/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    port: parseInt(process.env.POSTGRES_PORT!),
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!
  }
} satisfies Config
