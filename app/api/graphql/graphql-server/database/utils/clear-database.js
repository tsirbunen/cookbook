import { sql } from 'drizzle-orm'

export const clearDatabase = async (database) => {
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
