import * as dotenv from 'dotenv'
dotenv.config()

import type { DataStore } from '../../database/data-stores/data-store'
import { IngredientGroupHandler } from '../ingredients/handler'
import { InstructionGroupHandler } from '../instructions/handler'
import { TagHandler } from '../tags/handler'
import type { CreateRecipeInput, PatchRecipeInput, Recipe, RecipeExpanded } from '../types-and-interfaces/types'

export class RecipeHandler {
  dataStore: DataStore
  tagHandler: TagHandler
  ingredientGroupHandler: IngredientGroupHandler
  instructionsHandler: InstructionGroupHandler

  constructor(db: DataStore) {
    this.dataStore = db
    this.tagHandler = new TagHandler(db)
    this.ingredientGroupHandler = new IngredientGroupHandler(db)
    this.instructionsHandler = new InstructionGroupHandler(db)
  }

  async getAllPublicAndUsersOwnRecipes(userId: number | null): Promise<Recipe[]> {
    return await this.dataStore.withinTransaction(async () => {
      return await this.dataStore.getAllRecipesExpanded(userId)
    })
  }

  public async createNewRecipe(input: CreateRecipeInput) {
    const actions = async () => {
      const { title, description, ovenNeeded, ingredientGroups, instructionGroups, isPrivate, authorId } = input
      const languageId = await this.dataStore.upsertLanguage(input.language)
      const newRecipeId = await this.dataStore.createRecipe({
        title,
        description,
        ovenNeeded,
        isPrivate,
        authorId,
        languageId
      })
      await this.tagHandler.findOrCreateTagsAndSetRelations(newRecipeId, input.tags)
      if (input.photoIdentifiers) {
        await this.dataStore.handlePhotoIdentifiers(input.photoIdentifiers, newRecipeId)
      } else if (input.photoFiles) {
        // FIXME: Create this! And check that only identifiers or files are passed, not both
      }
      await this.ingredientGroupHandler.handleUpsertIngredientGroupsAndIngredients(newRecipeId, ingredientGroups ?? [])
      await this.instructionsHandler.createGroupsWithInstructions(newRecipeId, instructionGroups)
      return await this.dataStore.getRecipeExpandedById(newRecipeId)
    }

    return await this.dataStore.withinTransaction(actions)
  }

  async patchExistingRecipe(recipeId: number, recipePatch: PatchRecipeInput) {
    const actions = async () => {
      const { tags, language, title, description, ovenNeeded, ingredientGroups, instructionGroups } = recipePatch

      const original = await this.dataStore.getRecipeExpandedByIdNoTagFormatting(recipeId)
      if (!original) throw new Error('Recipe not found')

      const newLanguageId = language ? await this.dataStore.upsertLanguage(language) : original.language.id

      const recipeHasChanges = title || description || language || (ovenNeeded !== undefined && ovenNeeded !== null)
      if (recipeHasChanges) await this.handlePatchRecipe(recipePatch, original, newLanguageId)

      if (tags?.length) await this.tagHandler.handlePatchAndPurgeRecipeTags(tags, original)

      // FIXME: Handle patch of photos

      if (ingredientGroups?.length) {
        await this.ingredientGroupHandler.handleUpsertIngredientGroupsAndIngredients(
          recipeId,
          ingredientGroups,
          original.ingredientGroups
        )
      }

      if (instructionGroups?.length) {
        await this.instructionsHandler.patchInstructionGroups(instructionGroups, original.instructionGroups)
      }

      return await this.dataStore.getRecipeExpandedById(recipeId)
    }

    return await this.dataStore.withinTransaction(actions)
  }

  async handlePatchRecipe(recipePatch: PatchRecipeInput, originalRecipe: RecipeExpanded, newLanguageId?: number) {
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

    return await this.dataStore.patchRecipe(originalPatched, originalRecipe)
  }
}
