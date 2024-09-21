export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  File: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Int']['output'];
  identityProvider: IdentityProvider;
  token?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type AccountResult = Account | BadInputError;

export type BadInputError = BaseError & {
  __typename?: 'BadInputError';
  errorMessage: Scalars['String']['output'];
};

export type BaseError = {
  errorMessage: Scalars['String']['output'];
};

export type BaseSuccess = {
  successMessage: Scalars['String']['output'];
};

export type EmailAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GeneralError = BaseError & {
  __typename?: 'GeneralError';
  errorMessage: Scalars['String']['output'];
};

export type GeneralResult = GeneralError | GeneralSuccess;

export type GeneralSuccess = BaseSuccess & {
  __typename?: 'GeneralSuccess';
  successMessage: Scalars['String']['output'];
};

export enum IdentityProvider {
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Github = 'GITHUB'
}

export type Ingredient = {
  __typename?: 'Ingredient';
  amount?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  previousId?: Maybe<Scalars['Int']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

export type IngredientGroup = {
  __typename?: 'IngredientGroup';
  id: Scalars['Int']['output'];
  ingredients: Array<Ingredient>;
  title?: Maybe<Scalars['String']['output']>;
};

export type IngredientGroupInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  ingredients?: InputMaybe<Array<IngredientInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type IngredientInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  groupId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  previousId?: InputMaybe<Scalars['Int']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type Instruction = {
  __typename?: 'Instruction';
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  previousId?: Maybe<Scalars['Int']['output']>;
};

export type InstructionGroup = {
  __typename?: 'InstructionGroup';
  id: Scalars['Int']['output'];
  instructions: Array<Instruction>;
  title?: Maybe<Scalars['String']['output']>;
};

export type InstructionGroupInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Array<InstructionInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type InstructionInput = {
  content: Scalars['String']['input'];
  groupId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  previousId?: InputMaybe<Scalars['Int']['input']>;
};

export type Language = {
  __typename?: 'Language';
  id: Scalars['Int']['output'];
  language: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEmailAccount: AccountResult;
  createRecipe?: Maybe<Recipe>;
  deleteAccount: GeneralResult;
  patchRecipe?: Maybe<Recipe>;
  pingMutation?: Maybe<Scalars['String']['output']>;
  requestVerificationEmail: GeneralResult;
  signInToEmailAccount: AccountResult;
};


export type MutationCreateEmailAccountArgs = {
  emailAccountInput: EmailAccountInput;
};


export type MutationCreateRecipeArgs = {
  recipeInput: RecipeInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['Int']['input'];
  uuid: Scalars['String']['input'];
};


export type MutationPatchRecipeArgs = {
  recipeId: Scalars['Int']['input'];
  recipePatch: RecipeInput;
};


export type MutationRequestVerificationEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSignInToEmailAccountArgs = {
  signInToEmailAccountInput: SignInToEmailAccountInput;
};

export type Photo = {
  __typename?: 'Photo';
  id: Scalars['Int']['output'];
  isMainPhoto: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
};

export type PhotoInput = {
  isMainPhoto: Scalars['Boolean']['input'];
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allLanguages: Array<Language>;
  allRecipes: Array<Recipe>;
  allTags: Array<Tag>;
  pingQuery?: Maybe<Scalars['String']['output']>;
  validationSchemas?: Maybe<Array<ValidationSchema>>;
};


export type QueryValidationSchemasArgs = {
  schemas: Array<TargetSchema>;
};

export type Recipe = {
  __typename?: 'Recipe';
  authorId?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  ingredientGroups: Array<IngredientGroup>;
  instructionGroups: Array<InstructionGroup>;
  isPrivate?: Maybe<Scalars['Boolean']['output']>;
  language: Language;
  ovenNeeded: Scalars['Boolean']['output'];
  photos?: Maybe<Array<Photo>>;
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
};

export type RecipeInput = {
  authorId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ingredientGroups?: InputMaybe<Array<IngredientGroupInput>>;
  instructionGroups?: InputMaybe<Array<InstructionGroupInput>>;
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  ovenNeeded?: InputMaybe<Scalars['Boolean']['input']>;
  photoFiles?: InputMaybe<Array<Scalars['File']['input']>>;
  photoIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SignInToEmailAccountInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int']['output'];
  tag: Scalars['String']['output'];
};

export enum TargetSchema {
  EmailAccountInput = 'EMAIL_ACCOUNT_INPUT',
  RequestVerificationEmailInput = 'REQUEST_VERIFICATION_EMAIL_INPUT',
  SignInToEmailAccountInput = 'SIGN_IN_TO_EMAIL_ACCOUNT_INPUT'
}

export type ValidationSchema = {
  __typename?: 'ValidationSchema';
  schema: Scalars['JSON']['output'];
  target: TargetSchema;
};
