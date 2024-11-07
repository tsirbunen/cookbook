import * as dotenv from 'dotenv'
dotenv.config()

import { database } from '../../database/config/config'
import type { CreateRecipeInput, PatchRecipeInput, Recipe } from '../../modules/types.generated'
import { handleCreateOrPatchIngredientGroupsAndTheirIngredients } from '../ingredients/utils'
import { handleCreateOrPatchInstructionGroupsAndTheirInstructions } from '../instructions/utils'
import { handleFindCreateOrPatchAndPurgeLanguage } from '../languages/utils'
import { handlePhotoIdentifiers } from '../photos/service'
import { handleFindExistingOrCreateNewTagsWithRelations, handlePatchAndPurgeRecipeTags } from '../tags/utils'
import {
  getAllRecipesExpanded,
  getRecipeExpandedById,
  getRecipeExpandedByIdNoTagFormatting,
  handleCreateNewRecipe,
  handlePatchRecipe
} from './utils'

export const getAllPublicAndUsersOwnRecipes = async (userId: number | null): Promise<Recipe[]> => {
  return await getAllRecipesExpanded(database, userId)
}

export const createNewRecipe = async (input: CreateRecipeInput) => {
  const newlyCreatedRecipe = await database.transaction(async (trx) => {
    const { title, description, ovenNeeded, ingredientGroups, instructionGroups, tags, language, isPrivate, authorId } =
      input
    const languageId = await handleFindCreateOrPatchAndPurgeLanguage(trx, language)
    const newRecipeId = await handleCreateNewRecipe(trx, {
      title,
      description,
      ovenNeeded,
      isPrivate,
      authorId,
      languageId
    })
    await handleFindExistingOrCreateNewTagsWithRelations(trx, newRecipeId, tags)
    if (input.photoIdentifiers) {
      await handlePhotoIdentifiers(trx, input.photoIdentifiers, newRecipeId)
    } else if (input.photoFiles) {
      // FIXME: Create this! And check that only identifiers or files are passed, not both
    }
    await handleCreateOrPatchIngredientGroupsAndTheirIngredients(trx, newRecipeId, ingredientGroups ?? [])
    await handleCreateOrPatchInstructionGroupsAndTheirInstructions(trx, newRecipeId, instructionGroups ?? [])

    return await getRecipeExpandedById(newRecipeId, trx)
  })

  return newlyCreatedRecipe
}

export const patchExistingRecipe = async (recipeId: number, recipePatch: PatchRecipeInput) => {
  const updatedRecipe = await database.transaction(async (trx) => {
    const { tags, language, title, description, ovenNeeded, ingredientGroups, instructionGroups } = recipePatch

    const originalRecipe = await getRecipeExpandedByIdNoTagFormatting(recipeId, trx)
    if (!originalRecipe) {
      throw new Error('Recipe not found')
    }

    const newLanguageId = language
      ? await handleFindCreateOrPatchAndPurgeLanguage(trx, language, originalRecipe.language)
      : originalRecipe.language.id

    const recipeHasChanges = title || description || language || (ovenNeeded !== undefined && ovenNeeded !== null)
    if (recipeHasChanges) {
      await handlePatchRecipe(trx, recipePatch, originalRecipe, newLanguageId)
    }

    if (tags?.length) {
      await handlePatchAndPurgeRecipeTags(trx, tags, originalRecipe)
    }

    // FIXME: Handle patch of photos

    if (ingredientGroups?.length) {
      await handleCreateOrPatchIngredientGroupsAndTheirIngredients(
        trx,
        recipeId,
        ingredientGroups,
        originalRecipe.ingredientGroups
      )
    }

    if (instructionGroups?.length) {
      await handleCreateOrPatchInstructionGroupsAndTheirInstructions(
        trx,
        recipeId,
        instructionGroups,
        originalRecipe.instructionGroups
      )
    }
    return await getRecipeExpandedById(recipeId, trx)
  })

  return updatedRecipe
}
