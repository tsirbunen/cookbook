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
};

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
  createRecipe?: Maybe<Recipe>;
  patchRecipe?: Maybe<Recipe>;
  pingMutation?: Maybe<Scalars['String']['output']>;
};


export type MutationCreateRecipeArgs = {
  recipeInput: RecipeInput;
};


export type MutationPatchRecipeArgs = {
  recipeId: Scalars['Int']['input'];
  recipePatch: RecipeInput;
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
};

export type Recipe = {
  __typename?: 'Recipe';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  ingredientGroups: Array<IngredientGroup>;
  instructionGroups: Array<InstructionGroup>;
  language: Language;
  ovenNeeded: Scalars['Boolean']['output'];
  photos?: Maybe<Array<Photo>>;
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
};

export type RecipeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  ingredientGroups?: InputMaybe<Array<IngredientGroupInput>>;
  instructionGroups?: InputMaybe<Array<InstructionGroupInput>>;
  language?: InputMaybe<Scalars['String']['input']>;
  ovenNeeded?: InputMaybe<Scalars['Boolean']['input']>;
  photoFiles?: InputMaybe<Array<Scalars['File']['input']>>;
  photoIdentifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int']['output'];
  tag: Scalars['String']['output'];
};
