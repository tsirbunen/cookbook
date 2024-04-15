import { database } from '../database/config/config'
import { recipes, tags } from '../database/database-schemas/recipes'

type DBRecipe = typeof recipes.$inferInsert
type DBTag = typeof tags.$inferInsert
type DBRecipeWithTags = DBRecipe & { recipesToTags: { tags: DBTag[] }[] }
export const getAllRecipes = async () => {
  const allRecipesRaw = await database.query.recipes.findMany({
    with: {
      photos: true,
      language: true,
      recipesToTags: { with: { tags: true } },
      ingredientGroups: { with: { ingredients: true } },
      instructionGroups: { with: { instructions: true } }
    }
  })
  // console.log(allRecipesRaw)

  const allRecipes = allRecipesRaw.map((recipe) => {
    const { recipesToTags, ...rest } = recipe as DBRecipeWithTags
    const tags = recipesToTags.map(({ tags }) => tags)
    return { ...rest, tags }
  })

  return allRecipes
}
