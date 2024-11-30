import * as dotenv from 'dotenv'
dotenv.config()

import { IngredientGroupHandler } from '../ingredients/handler'
import { InstructionGroupHandler } from '../instructions/handler'
import { TagHandler } from '../tags/handler'
import {
  getDeletePhotoError,
  getOriginalRecipeNotFoundError,
  getPhotoUploadUrlError
} from '../utils/error-utils'
import { createSignedUploadUrl, removePhotos } from '../utils/storage-client'
import type {
  CreateRecipeInput,
  PatchRecipeInput,
  Recipe,
  RecipeExpanded
} from '../../types-and-interfaces/types'
import { DataStore } from '../../../app-datastore/data-stores/data-store'

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

  async getPhotoUploadUrls(photoIdentifiers?: string[]) {
    if (!photoIdentifiers) return []

    const photoUploadDetails = []
    for await (const uuid of photoIdentifiers) {
      const signedUrl = await createSignedUploadUrl(uuid)
      if (!signedUrl) return null
      const token = signedUrl.split('token=')[1]
      photoUploadDetails.push({ photoId: uuid, token })
    }

    return photoUploadDetails
  }

  public async createNewRecipe(input: CreateRecipeInput) {
    const actions = async () => {
      const photoUploadDetails = await this.getPhotoUploadUrls(input.photoIdentifiers)
      if (photoUploadDetails === null) return getPhotoUploadUrlError()

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
        await this.dataStore.handleCreatePhotoIdentifiers(
          input.photoIdentifiers.map((identifier, index) => {
            return { id: identifier, isMainPhoto: index === 0 }
          }),
          newRecipeId
        )
      }
      await this.ingredientGroupHandler.handleUpsertIngredientGroupsAndIngredients(newRecipeId, ingredientGroups ?? [])
      await this.instructionsHandler.createGroupsWithInstructions(newRecipeId, instructionGroups)

      const recipeExpanded = await this.dataStore.getRecipeExpandedById(newRecipeId)
      if (!photoUploadDetails.length) return recipeExpanded
      return { ...recipeExpanded, photoUploadDetails }
    }

    return await this.dataStore.withinTransaction(actions)
  }

  async patchExistingRecipe(recipeId: number, recipePatch: PatchRecipeInput) {
    const actions = async () => {
      const { tags, photoIdentifiers, language, title, description, ovenNeeded, ingredientGroups, instructionGroups } =
        recipePatch

      const original = await this.dataStore.getRecipeExpandedByIdNoTagFormatting(recipeId)
      if (!original) return getOriginalRecipeNotFoundError()

      const originalPhotoUuids = original.photos.map((photo) => photo.url)
      const originalPhotoUuidsToDelete = originalPhotoUuids.filter((uuid) => !photoIdentifiers?.includes(uuid))
      const newPhotoUuids = photoIdentifiers?.filter((uuid) => !originalPhotoUuids.includes(uuid))
      const newPhotoUploadDetails = await this.getPhotoUploadUrls(newPhotoUuids)
      if (newPhotoUploadDetails === null) return getPhotoUploadUrlError()
      if (newPhotoUuids?.length) {
        await this.dataStore.handleCreatePhotoIdentifiers(
          newPhotoUuids.map((identifier) => {
            return { id: identifier, isMainPhoto: identifier === photoIdentifiers?.[0] }
          }),
          original.id
        )
      }

      if (originalPhotoUuidsToDelete.length) {
        const deletedFilesCount = await removePhotos(originalPhotoUuidsToDelete)
        if (deletedFilesCount === null) return getDeletePhotoError()
      }
      if (originalPhotoUuidsToDelete.length) {
        await this.dataStore.handleDeletePhotoIdentifiers(originalPhotoUuidsToDelete)
      }

      const newLanguageId = language ? await this.dataStore.upsertLanguage(language) : original.language.id

      const recipeHasChanges = title || description || language || (ovenNeeded !== undefined && ovenNeeded !== null)
      if (recipeHasChanges) await this.handlePatchRecipe(recipePatch, original, newLanguageId)

      if (tags?.length) await this.tagHandler.handlePatchAndPurgeRecipeTags(tags, original)

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

      const recipeExpanded = await this.dataStore.getRecipeExpandedById(recipeId)
      if (!newPhotoUploadDetails.length) return recipeExpanded
      return { ...recipeExpanded, photoUploadDetails: newPhotoUploadDetails }
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
