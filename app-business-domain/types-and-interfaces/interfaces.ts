import type {
  Account,
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
} from './types'


/**
 * This interface determines what methods the business logic needs, i.e. what methods 
 * should be implemented by the data storage solution selected.
 */
export interface IDataStore {
  withinTransaction<T>(actions: () => Promise<T>): Promise<T>
  getExistingAccounts(queryParams: QueryAccountsParams): Promise<Account[]>
  getAccountBy(by: ByKey, value: string): Promise<Account | undefined>
  insertEmailAccount(accountInput: EmailAccountInput, idAtProvider: string, passwordHash: string): Promise<Account>
  insertNonEmailAccount(username: string, idAtProvider: string, identityProvider: IdentityProvider): Promise<Account>
  setEmailIsVerified(id: number): Promise<void>
  createRecipe(recipeInsert: RecipeBody): Promise<number>
  patchRecipe(
    patched: Pick<RecipeBody, 'title' | 'description' | 'ovenNeeded' | 'languageId'>,
    originalRecipe: RecipeExpanded
  ): Promise<number>
  getRecipeExpandedById(id: number): Promise<Recipe | undefined>
  getAllRecipesExpanded(userId: number | null): Promise<Recipe[]>
  getRecipeExpandedByIdNoTagFormatting(id: number): Promise<RecipeExpanded | undefined>
  insertIngredient(updatedPatchedIngredient: Ingredient): Promise<number>
  updateIngredient(id: number, updatedPatchedIngredient: Ingredient): Promise<void>
  patchIngredientGroup(groupId: number, groupPatch: { title?: string | null }): Promise<void>
  removePreviousIngredientReferences(ingredientsToDeleteIds: number[]): Promise<void>
  deleteIngredients(ingredientsToDeleteIds: number[]): Promise<void>
  createIngredientGroup(groupInsert: { recipeId: number; title?: string | null }): Promise<{ insertedId: number }>
  createInstructionGroup(input: { recipeId: number; title?: string | null }): Promise<{ insertedId: number }>
  patchInstructionGroup(groupId: number, group: { title?: string | null }): Promise<void>
  deleteInstructionGroups(groupIds: number[]): Promise<void>
  deleteInstructions(ids: number[]): Promise<void>
  removePreviousInstructionReferences(referenceIdsToRemove: number[]): Promise<void>
  createInstruction(input: Instruction): Promise<number>
  updateInstruction(id: number, input: Omit<Instruction, 'id'>): Promise<void>
  getAllTags(): Promise<Tag[]>
  createTags(tagsToCreate: string[]): Promise<Tag[]>
  createRecipeToTagRelations(tagRelations: RecipeToTagInsert[]): Promise<void>
  getTagsByTagTexts(tagTexts: string[]): Promise<Tag[]>
  removeRecipeTagRelations(relationIds: number[]): Promise<void>
  getRecipesByTag(tagId: number): Promise<number[]>
  removeTag(tagId: number): Promise<void>
  getAllLanguages(): Promise<Language[]>
  upsertLanguage(patchedLanguage: string): Promise<number>
  handleCreatePhotoIdentifiers(photoUrls: { id: string; isMainPhoto: boolean }[], recipeId: number): Promise<void>
  handleDeletePhotoIdentifiers(photoIdentifiers: string[]): Promise<void>
}
