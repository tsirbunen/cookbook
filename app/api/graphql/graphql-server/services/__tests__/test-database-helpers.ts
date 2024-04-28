import { database } from '../../database/config/config'
import { SQL, sql } from 'drizzle-orm'
import { RecipeInsert } from '../../database/inferred-types/inferred-types'

export const clearDatabase = async () => {
  await database.execute(sql`UPDATE ingredients SET previous_id = NULL`)
  await database.execute(sql`UPDATE instructions SET previous_id = NULL`)

  await database.execute(sql`DELETE FROM recipes_to_tags`)
  await database.execute(sql`DELETE FROM tags`)
  await database.execute(sql`DELETE FROM photos`)
  await database.execute(sql`DELETE FROM ingredients`)
  await database.execute(sql`DELETE FROM ingredient_groups`)
  await database.execute(sql`DELETE FROM instructions`)
  await database.execute(sql`DELETE FROM instruction_groups`)
  await database.execute(sql`DELETE FROM recipes`)
  await database.execute(sql`DELETE FROM languages`)
}

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
  return parseInt(count as string)
}

export const getTableRows = async (table: Table, where?: { column: string; id: number }) => {
  const whereCondition = where ? `WHERE ${where.column} = ${where.id}` : ''
  const query: SQL = sql.raw(`SELECT * FROM ${table} ${whereCondition}`)
  return await database.execute(query)
}

export const insertLanguagesToDB = async (languages: string[]) => {
  const newLanguages = []
  for await (const language of languages) {
    const query: SQL = sql`INSERT INTO languages (language) VALUES (${language}) RETURNING *`
    const [newLanguage] = await database.execute(query)
    newLanguages.push(newLanguage)
  }
  return newLanguages
}

export const insertTagsToDB = async (tags: string[]) => {
  const newTags = []
  for await (const tag of tags) {
    const query: SQL = sql`INSERT INTO tags (tag) VALUES (${tag}) RETURNING *`
    const [newTag] = await database.execute(query)
    newTags.push(newTag)
  }
  return newTags
}

export const insertRecipeToDB = async (recipe: RecipeInsert) => {
  const { title, ovenNeeded, languageId } = recipe

  const query: SQL = sql`INSERT INTO recipes (title, oven_needed, language_id) 
  VALUES (${title}, ${ovenNeeded}, ${languageId}) RETURNING *`
  const [newRecipe] = await database.execute(query)
  return newRecipe
}
