import { eq, or } from 'drizzle-orm'
import type { PatchRecipeInput, Recipe, RecipeBody, RecipeExpanded } from '../../handlers/types-and-interfaces/types'
import type { Database } from '../config/config'
import { recipes } from '../database-schemas/recipes'

const photoUrlBase = process.env.SUPABASE_S3_ENDPOINT

export class RecipeStore {
  async create(trx: Database, input: RecipeBody) {
    const newRecipe = await trx.insert(recipes).values(input).returning()
    return newRecipe[0].id
  }

  async getRecipeExpandedById(trx: Database, id: number): Promise<Recipe | undefined> {
    const recipeRaw = (await trx.query.recipes.findFirst({
      where: eq(recipes.id, id),
      with: this.getRecipeFullExpansions()
    })) as RecipeExpanded | undefined

    if (!recipeRaw) return undefined

    return this.formatRecipe(recipeRaw)
  }

  async getAllRecipesExpanded(trx: Database, userId: number | null): Promise<Recipe[]> {
    const whereCondition = userId
      ? or(eq(recipes.isPrivate, false), eq(recipes.authorId, userId))
      : eq(recipes.isPrivate, false)

    const allPublicAndUserRecipesRaw = (await trx.query.recipes.findMany({
      where: whereCondition,
      with: this.getRecipeFullExpansions()
    })) as unknown as RecipeExpanded[]
    // FIXME: How to make the ORM understand the expansions so that we don't need to cast?

    return allPublicAndUserRecipesRaw.map(this.formatRecipe)
  }

  getRecipeFullExpansions() {
    return {
      photos: true,
      language: true,
      recipesToTags: { with: { tags: true } },
      ingredientGroups: { with: { ingredients: true } },
      instructionGroups: { with: { instructions: true } }
    }
  }

  async patchRecipe(
    trx: Database,
    patched: Pick<RecipeBody, 'title' | 'description' | 'ovenNeeded' | 'languageId'>,
    originalRecipe: RecipeExpanded
  ) {
    const patchedRecipe = await trx
      .update(recipes)
      .set(patched)
      .where(eq(recipes.id, originalRecipe.id))
      .returning({ updatedId: recipes.id })

    return patchedRecipe[0].updatedId
  }

  formatRecipe(recipeExpanded: RecipeExpanded): Recipe {
    const { recipesToTags, photos, ...rest } = recipeExpanded

    return {
      ...rest,
      description: rest.description || null,
      photos: photos
        ? photos.map((photo) => {
            return { ...photo, url: `${photoUrlBase}/${photo.url}` }
          })
        : [],
      tags: recipesToTags.flatMap((recipeToTags) => recipeToTags.tags)
    }
  }

  async getRecipeExpandedByIdNoTagFormatting(trx: Database, id: number): Promise<RecipeExpanded | undefined> {
    const recipeRaw = await trx.query.recipes.findFirst({
      where: eq(recipes.id, id),
      with: this.getRecipeFullExpansions()
    })

    return recipeRaw as RecipeExpanded | undefined
  }

  async handlePatchRecipe(
    trx: Database,
    recipePatch: PatchRecipeInput,
    originalRecipe: RecipeExpanded,
    newLanguageId?: number
  ) {
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
}
