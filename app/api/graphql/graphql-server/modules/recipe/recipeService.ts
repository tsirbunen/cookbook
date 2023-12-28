import { database } from '../../database/config/config'
import { recipes } from '../../database/schemas/recipes'

export const getAllRecipes = async () => {
  const allRecipes = await database.select().from(recipes)
  return allRecipes
}
