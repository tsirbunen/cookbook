import * as dotenv from 'dotenv'
dotenv.config()

import { eq } from 'drizzle-orm'
import { recipes } from '../../database/database-schemas/recipes'
import { DatabaseType, RecipeSelectDBExpanded, RecipeInsert } from '../../database/inferred-types/inferred-types'
import { Recipe, RecipeInput, Tag } from '../../modules/types.generated'

export type RecipePatchData = {
  title?: string
  description?: string
  ovenNeeded?: boolean
  languageId?: number
}

const photoUrlBase = process.env.SUPABASE_S3_ENDPOINT

export const getRecipeExpandedById = async (id: number, trx: DatabaseType): Promise<Recipe | undefined> => {
  const recipeRaw = (await trx.query.recipes.findFirst({
    where: eq(recipes.id, id),
    with: getRecipeFullExpansions()
  })) as RecipeSelectDBExpanded | undefined

  if (!recipeRaw) return undefined

  return formatRecipe(recipeRaw)
}

export const getAllRecipesExpanded = async (databaseOrTransaction: DatabaseType): Promise<Recipe[]> => {
  const allRecipesRaw = (await databaseOrTransaction.query.recipes.findMany({
    with: getRecipeFullExpansions()
  })) as RecipeSelectDBExpanded[]

  return allRecipesRaw.map(formatRecipe)
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

const formatRecipe = (recipeExpanded: RecipeSelectDBExpanded): Recipe => {
  const { recipesToTags, photos, ...rest } = recipeExpanded

  return {
    ...rest,
    photos: formatPhotos(photos),
    tags: formatRecipesToTagsRelationsToTags(recipesToTags)
  }
}

const formatPhotos = (photos: RecipeSelectDBExpanded['photos']) => {
  return photos
    ? photos.map((photo) => {
        return { ...photo, url: `${photoUrlBase}/${photo.url}` }
      })
    : []
}

const formatRecipesToTagsRelationsToTags = (recipesToTags: RecipeSelectDBExpanded['recipesToTags']): Tag[] => {
  return recipesToTags.map((recipeToTags) => recipeToTags.tags).flat()
}

export const getRecipeExpandedByIdNoTagFormatting = async (
  id: number,
  trx: DatabaseType
): Promise<RecipeSelectDBExpanded | undefined> => {
  const recipeRaw = await trx.query.recipes.findFirst({
    where: eq(recipes.id, id),
    with: getRecipeFullExpansions()
  })

  return recipeRaw as RecipeSelectDBExpanded | undefined
}

export const handlePatchRecipe = async (
  trx: DatabaseType,
  recipePatch: RecipeInput,
  originalRecipe: RecipeSelectDBExpanded,
  newLanguageId?: number
) => {
  const { title, description, ovenNeeded } = recipePatch

  const originalPatched = {
    title: originalRecipe.title,
    description: originalRecipe.description,
    ovenNeeded: originalRecipe.ovenNeeded,
    languageId: originalRecipe.language.id
  }

  if (title && title !== originalRecipe.title) originalPatched.title = title

  if (description && description !== originalPatched.description) {
    originalPatched.description = description
  }

  if (ovenNeeded !== undefined && ovenNeeded !== null && ovenNeeded !== originalPatched.ovenNeeded) {
    originalPatched.ovenNeeded = ovenNeeded
  }

  if (newLanguageId && newLanguageId !== originalPatched.languageId) {
    originalPatched.languageId = newLanguageId
  }

  const patchedRecipe = await trx
    .update(recipes)
    .set(originalPatched)
    .where(eq(recipes.id, originalRecipe.id))
    .returning({ updatedId: recipes.id })

  return patchedRecipe[0].updatedId
}
