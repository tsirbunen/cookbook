import * as dotenv from 'dotenv'
dotenv.config()

export const localDatabaseOptions = {
  host: Boolean(process.env.IS_GITHUB) ? 'postgres' : 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres'
}
