import { type SQL, sql } from 'drizzle-orm'
import { database } from '../../app-datastore/config/config';

type Table =
  | 'recipes'
  | 'photos'
  | 'tags'
  | 'recipes_to_tags'
  | 'languages'
  | 'ingredients'
  | 'ingredient_groups'
  | 'instructions'
  | 'instruction_groups'

export const getTableRowCountInDatabase = async (table: Table, where?: { column: string; id: number }) => {
  const whereCondition = where ? `WHERE ${where.column} = ${where.id}` : ''
  const query: SQL = sql.raw(`SELECT COUNT(*) FROM ${table} ${whereCondition}`)

  const [{ count }] = await database.execute(query)
  return Number.parseInt(count as string)
}

export const getTableRows = async (table: Table, where?: { column: string; id: number }) => {
  const whereCondition = where ? `WHERE ${where.column} = ${where.id}` : ''
  const query: SQL = sql.raw(`SELECT * FROM ${table} ${whereCondition}`)
  return await database.execute(query)
}
