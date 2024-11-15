import type { IDataStore } from '../../handlers/types-and-interfaces/interfaces'
import type {
  ByKey,
  EmailAccountInput,
  IdentityProvider,
  Ingredient,
  Instruction,
  Language,
  QueryAccountsParams,
  Recipe,
  RecipeBody,
  RecipeExpanded,
  RecipeToTagInsert,
  Tag
} from '../../handlers/types-and-interfaces/types'

import { type Database, database } from '../config/config'
import { AccountStore } from './account-store'
import { IngredientGroupStore } from './ingredient-group-store'
import { IngredientStore } from './ingredient-store'
import { InstructionGroupStore } from './instruction-group-store'
import { InstructionStore } from './instruction-store'
import { LanguageStore } from './language-store'
import { PhotoStore } from './photo-store'
import { RecipeStore } from './recipe-store'
import { TagStore } from './tag-store'

// FIXME: Is it a problem that there are so many methods available on this class?
export class DataStore implements IDataStore {
  private database: Database
  private transaction: Database | null = null
  private accountStore: AccountStore
  private recipeStore: RecipeStore
  private tagStore: TagStore
  private languageStore: LanguageStore
  private photoStore: PhotoStore
  private ingredientStore: IngredientStore
  private ingredientGroupStore: IngredientGroupStore
  private instructionStore: InstructionStore
  private instructionGroupStore: InstructionGroupStore

  constructor(db: Database) {
    this.database = db
    this.accountStore = new AccountStore()
    this.recipeStore = new RecipeStore()
    this.tagStore = new TagStore()
    this.languageStore = new LanguageStore()
    this.photoStore = new PhotoStore()
    this.ingredientStore = new IngredientStore()
    this.ingredientGroupStore = new IngredientGroupStore()
    this.instructionGroupStore = new InstructionGroupStore()
    this.instructionStore = new InstructionStore()
  }

  async withinTransaction<T>(actions: () => Promise<T>) {
    return await this.database.transaction(async (trx) => {
      this.setTransaction(trx)
      const result = await actions()
      this.setTransaction(null)
      return result
    })
  }

  setTransaction(trx: Database | null) {
    this.transaction = trx
  }

  // FIXME: FInd a better way to handle this
  getTrx() {
    if (!this.transaction) throw new Error('Transaction not set')
    return this.transaction
  }

  async getExistingAccounts(queryParams: QueryAccountsParams) {
    return await this.accountStore.getExistingAccounts(this.getTrx(), queryParams)
  }

  async getAccountBy(by: ByKey, value: string) {
    return await this.accountStore.getAccountBy(this.getTrx(), by, value)
  }

  async insertEmailAccount(accountInput: EmailAccountInput, idAtProvider: string, passwordHash: string) {
    return await this.accountStore.insertEmailAccount(this.getTrx(), accountInput, idAtProvider, passwordHash)
  }

  async insertNonEmailAccount(username: string, idAtProvider: string, identityProvider: IdentityProvider) {
    return await this.accountStore.insertNonEmailAccount(this.getTrx(), username, idAtProvider, identityProvider)
  }

  async setEmailIsVerified(id: number) {
    await this.accountStore.setEmailIsVerified(this.getTrx(), id)
  }

  async createRecipe(recipeInsert: RecipeBody) {
    return await this.recipeStore.create(this.getTrx(), recipeInsert)
  }

  async patchRecipe(
    patched: Pick<RecipeBody, 'title' | 'description' | 'ovenNeeded' | 'languageId'>,
    originalRecipe: RecipeExpanded
  ) {
    return await this.recipeStore.patchRecipe(this.getTrx(), patched, originalRecipe)
  }

  async getRecipeExpandedById(id: number): Promise<Recipe | undefined> {
    return await this.recipeStore.getRecipeExpandedById(this.getTrx(), id)
  }

  async getAllRecipesExpanded(userId: number | null): Promise<Recipe[]> {
    return await this.recipeStore.getAllRecipesExpanded(this.getTrx(), userId)
  }

  async getRecipeExpandedByIdNoTagFormatting(id: number) {
    return await this.recipeStore.getRecipeExpandedByIdNoTagFormatting(this.getTrx(), id)
  }

  async insertIngredient(updatedPatchedIngredient: Ingredient) {
    return await this.ingredientStore.insertIngredient(this.getTrx(), updatedPatchedIngredient)
  }

  async updateIngredient(id: number, updatedPatchedIngredient: Ingredient) {
    await this.ingredientStore.updateIngredient(this.getTrx(), id, updatedPatchedIngredient)
  }

  async patchIngredientGroup(groupId: number, groupPatch: { title?: string | null }) {
    await this.ingredientGroupStore.patchIngredientGroup(this.getTrx(), groupId, groupPatch)
  }

  async removePreviousIngredientReferences(ingredientsToDeleteIds: number[]) {
    await this.ingredientStore.removePreviousIngredientReferences(this.getTrx(), ingredientsToDeleteIds)
  }

  async deleteIngredients(ingredientsToDeleteIds: number[]) {
    await this.ingredientStore.deleteIngredients(this.getTrx(), ingredientsToDeleteIds)
  }

  async createIngredientGroup(groupInsert: { recipeId: number; title?: string | null }) {
    return await this.ingredientGroupStore.createIngredientGroup(this.getTrx(), groupInsert)
  }

  async createInstructionGroup(input: { recipeId: number; title?: string | null }) {
    return this.instructionGroupStore.create(this.getTrx(), input)
  }

  async patchInstructionGroup(groupId: number, group: { title?: string | null }) {
    await this.instructionGroupStore.patch(this.getTrx(), groupId, group)
  }

  async deleteInstructionGroups(groupIds: number[]) {
    await this.instructionGroupStore.delete(this.getTrx(), groupIds)
  }

  async deleteInstructions(ids: number[]) {
    await this.instructionStore.delete(this.getTrx(), ids)
  }

  async removePreviousInstructionReferences(referenceIdsToRemove: number[]) {
    await this.instructionStore.removePreviousInstructionReferences(this.getTrx(), referenceIdsToRemove)
  }

  async createInstruction(input: Instruction) {
    return await this.instructionStore.create(this.getTrx(), input)
  }

  async updateInstruction(id: number, input: Omit<Instruction, 'id'>) {
    await this.instructionStore.update(this.getTrx(), id, input)
  }

  async getAllTags(): Promise<Tag[]> {
    return await this.tagStore.getAllTags(this.getTrx())
  }

  async createTags(tagsToCreate: string[]) {
    return await this.tagStore.create(this.getTrx(), tagsToCreate)
  }

  async createRecipeToTagRelations(tagRelations: RecipeToTagInsert[]) {
    return await this.tagStore.createRecipeRelations(this.getTrx(), tagRelations)
  }

  async getTagsByTagTexts(tagTexts: string[]) {
    return await this.tagStore.getByTagTexts(this.getTrx(), tagTexts)
  }

  async removeRecipeTagRelations(relationIds: number[]) {
    await this.tagStore.removeRelationsToRecipes(this.getTrx(), relationIds)
  }

  async getRecipesByTag(tagId: number) {
    return await this.tagStore.getRecipesByTag(this.getTrx(), tagId)
  }

  async removeTag(tagId: number) {
    await this.tagStore.deleteTag(this.getTrx(), tagId)
  }

  async getAllLanguages(): Promise<Language[]> {
    return await this.languageStore.getAllLanguages(this.getTrx())
  }

  async upsertLanguage(patchedLanguage: string) {
    const language = await this.languageStore.upsertLanguage(this.getTrx(), patchedLanguage)
    return language
  }

  async handlePhotoIdentifiers(photoUrls: string[], recipeId: number) {
    return await this.photoStore.handlePhotoIdentifiers(this.getTrx(), photoUrls, recipeId)
  }
}

export const dataStore = new DataStore(database)
