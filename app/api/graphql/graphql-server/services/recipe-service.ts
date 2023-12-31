import { database } from '../database/config/config'
import { recipes } from '../database/database-schemas/recipes'

export const getAllRecipes = async () => {
  const allRecipes = await database.select().from(recipes)
  // allRecipes.forEach((recipe) => {
  //   console.log(recipe.id, recipe.title)
  // })
  return allRecipes
}
