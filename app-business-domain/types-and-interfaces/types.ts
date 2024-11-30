export type Tag = {
  id: number
  tag: string
}

export type Language = {
  id: number
  language: string
}

export type Ingredient = {
  id?: number
  groupId: number
  previousId?: number | null
  amount?: number | null
  name: string
  unit?: string | null
}

export type IngredientGroupBody = {
  id?: number
  title?: string | null
  recipeId: number
}

export type IngredientGroupBodyFull = {
  id: number
  title?: string | null
  recipeId: number
}

export type IngredientGroupFull = IngredientGroupBodyFull & {
  ingredients: IngredientFull[]
}

export type IngredientFull = {
  id: number
  groupId: number
  previousId?: number | null
  amount?: number | null
  name: string
  unit?: string | null
}

export type IngredientGroupInput = {
  id?: number | null
  ingredients?: Ingredient[]
  title?: string
}

export type Instruction = {
  id?: number
  previousId?: number | null
  content: string
  groupId: number
}

export type InstructionFull = {
  id: number
  previousId: number | null
  content: string
  groupId: number
}

export type InstructionGroupBodyFull = {
  id: number
  title: string | null
  recipeId: number
}

export type InstructionGroupInput = {
  id?: number | null
  title?: string | null
  instructions: Instruction[]
}

export type InstructionGroupFull = InstructionGroupBodyFull & {
  instructions: InstructionFull[]
}

export type CreateRecipeInput = {
  authorId: number
  description?: string | null
  ingredientGroups: IngredientGroupInput[]
  instructionGroups: InstructionGroupInput[]
  isPrivate: boolean
  language: string
  ovenNeeded: boolean
  photoFiles: File[]
  photoIdentifiers: string[]
  tags: string[]
  title: string
}

export type PatchRecipeInput = Partial<CreateRecipeInput>

export type Photo = {
  url: string
  id: number
  isMainPhoto: boolean
  recipeId: number
}

export type RecipeBody = {
  id?: number | undefined
  authorId: number
  languageId: number
  title: string
  ovenNeeded: boolean
  isPrivate: boolean
  description?: string | null
}

export type Recipe = {
  id: number
  authorId: number
  description: string | null
  ingredientGroups: IngredientGroupFull[]
  instructionGroups: InstructionGroupFull[]
  isPrivate: boolean
  language: Language
  ovenNeeded: boolean
  photos: Photo[]
  tags: Tag[]
  title: string
}

export enum IdentityProvider {
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  EMAIL = 'EMAIL'
}

export type Account = {
  id: number
  uuid: string
  username: string
  email: string | null
  passwordHash: string | null
  emailVerified: boolean | null
  identityProvider: IdentityProvider
  idAtProvider: string
}

export type NonEmailAccountInput = {
  identityProvider: IdentityProvider
  token: string
  username: string
}

export type DeleteAccountInput = {
  id: number
  uuid: string
}

export type SignInToEmailAccountInput = {
  email: string
  password: string
}

export type EmailInput = {
  email: string
}

export type EmailAccountInput = {
  email: string
  password: string
  username: string
}

export type ByKey = 'email' | 'uuid' | 'idAtProvider' | 'id'
export type Operator = 'AND' | 'OR'
export type QueryAccountsParams = {
  username?: string | null
  id?: number | null
  uuid?: string | null
  email?: string | null
  operator?: Operator
  idAtProvider?: string | null
}

export type RecipeToTagInsert = {
  id?: number
  recipeId: number
  tagId: number
}

export type RecipeToTag = {
  id: number
  recipeId: number
  tagId: number
  tags: Tag
}

export type RecipeTag = {
  id: number
  tag: { id: number; tag: string }
}

export type RecipeExpanded = Pick<RecipeBody, 'authorId' | 'title' | 'description' | 'ovenNeeded' | 'isPrivate'> & {
  id: number
  photos: Photo[]
  language: Language
  recipesToTags: RecipeToTag[]
  ingredientGroups: IngredientGroupFull[]
  instructionGroups: InstructionGroupFull[]
}
