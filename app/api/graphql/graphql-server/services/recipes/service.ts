import * as dotenv from 'dotenv'
dotenv.config()

import { database } from '../../database/config/config'
import { handleFindExistingOrCreateNewLanguage } from '../languages/utils'
import { handleFindExistingOrCreateNewTags } from '../tags/utils'
import { getAllRecipesExpanded, getRecipeExpandedById, handleCreateNewRecipe } from './utils'
import { handleCreateIngredients } from '../ingredients/utils'
import { handleCreateInstructions } from '../instructions/utils'
import { IngredientGroupInput, InstructionGroupInput, Recipe, RecipeInput } from '../../modules/types.generated'
import { handlePhotoIdentifiers } from '../photos/service'

export const getAllRecipes = async (): Promise<Recipe[]> => {
  return await getAllRecipesExpanded(database)
}

export const createNewRecipe = async (input: RecipeInput) => {
  const newlyCreatedRecipe = await database.transaction(async (trx) => {
    const { title, description, ovenNeeded, ingredientGroups, instructionGroups, tags, language } = input

    const languageId = await handleFindExistingOrCreateNewLanguage(trx, language)
    const newRecipeId = await handleCreateNewRecipe(trx, { title, description, ovenNeeded, languageId })
    await handleFindExistingOrCreateNewTags(trx, newRecipeId, tags)
    if (input.photoIdentifiers) {
      await handlePhotoIdentifiers(trx, input.photoIdentifiers, newRecipeId)
    } else if (input.photoFiles) {
      // FIXME: Create this! And check that only identifiers or files are passed, not both
    }
    await handleCreateIngredients(trx, ingredientGroups as IngredientGroupInput[], newRecipeId)
    await handleCreateInstructions(trx, instructionGroups as InstructionGroupInput[], newRecipeId)

    return await getRecipeExpandedById(newRecipeId, trx)
  })

  return newlyCreatedRecipe
}
