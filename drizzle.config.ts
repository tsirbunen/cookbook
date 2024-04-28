import * as dotenv from 'dotenv'
dotenv.config()

import type { Config } from 'drizzle-kit'

const isProduction = process.env.NODE_ENV === 'production'

let config
if (isProduction) {
  config = {
    schema: './app/api/graphql/graphql-server/database/database-schemas/*',
    out: './app/api/graphql/graphql-server/database/migrations',
    driver: 'pg',
    verbose: true,
    dbCredentials: {
      connectionString: process.env.DATABASE_CONNECTION_STRING ?? ''
    }
  } satisfies Config
} else {
  config = {
    schema: './app/api/graphql/graphql-server/database/database-schemas/*',
    out: './app/api/graphql/graphql-server/database/migrations',
    driver: 'pg',
    verbose: true,
    dbCredentials: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres'
    }
  }
}

export default config
