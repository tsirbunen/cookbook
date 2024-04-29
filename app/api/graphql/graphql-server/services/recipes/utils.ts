import * as dotenv from 'dotenv'
dotenv.config()

import { eq } from 'drizzle-orm'
import { recipes } from '../../database/database-schemas/recipes'
import { DatabaseType, RecipeSelectDBExpanded, RecipeInsert } from '../../database/inferred-types/inferred-types'
import { Recipe } from '../../modules/types.generated'

const photoUrlBase = process.env.SUPABASE_S3_ENDPOINT

export const getRecipeExpandedById = async (id: number, trx: DatabaseType): Promise<Recipe | undefined> => {
  const recipeRaw = (await trx.query.recipes.findFirst({
    where: eq(recipes.id, id),
    with: getRecipeFullExpansions()
  })) as RecipeSelectDBExpanded | undefined

  if (!recipeRaw) return undefined

  return formatRecipeTagRelationsToTags(recipeRaw)
}

export const getAllRecipesExpanded = async (databaseOrTransaction: DatabaseType): Promise<Recipe[]> => {
  const allRecipesRaw = (await databaseOrTransaction.query.recipes.findMany({
    with: getRecipeFullExpansions()
  })) as RecipeSelectDBExpanded[]

  return allRecipesRaw.map(formatRecipeTagRelationsToTags)
}

export const handleCreateNewRecipe = async (trx: DatabaseType, input: RecipeInsert) => {
  const newRecipe = await trx.insert(recipes).values(input).returning()
  return newRecipe[0].id
}

const getRecipeFullExpansions = () => {
  return {
    photos: true,
    language: true,
    recipesToTags: { with: { tags: true } },
    ingredientGroups: { with: { ingredients: true } },
    instructionGroups: { with: { instructions: true } }
  }
}

export const formatRecipeTagRelationsToTags = (recipeExpanded: RecipeSelectDBExpanded): Recipe => {
  const { recipesToTags, photos, ...rest } = recipeExpanded

  return {
    ...rest,
    photos: photos
      ? photos.map((photo) => {
          return { ...photo, url: `${photoUrlBase}/${photo.url}` }
        })
      : [],

    tags: recipesToTags.map((recipeToTags) => recipeToTags.tags).flat()
  }
}
