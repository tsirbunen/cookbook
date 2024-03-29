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
};

export enum Category {
  Breakfast = 'BREAKFAST',
  Brunch = 'BRUNCH',
  Dinner = 'DINNER',
  Lunch = 'LUNCH',
  Snack = 'SNACK'
}

export type Ingredient = {
  __typename?: 'Ingredient';
  amount?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  previousIngredientId?: Maybe<Scalars['Int']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

export type IngredientGroup = {
  __typename?: 'IngredientGroup';
  id: Scalars['Int']['output'];
  ingredients: Array<Ingredient>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Instruction = {
  __typename?: 'Instruction';
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  ingredientReferenceIds: Array<Maybe<Scalars['Int']['output']>>;
  previousInstructionId?: Maybe<Scalars['Int']['output']>;
};

export type InstructionGroup = {
  __typename?: 'InstructionGroup';
  id: Scalars['Int']['output'];
  instructions: Array<Instruction>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  pingMutation?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  allRecipes: Array<Recipe>;
  pingQuery?: Maybe<Scalars['String']['output']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']['output']>;
  extraImageUrls: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  ingredientGroups: Array<IngredientGroup>;
  instructionGroups: Array<InstructionGroup>;
  isFavorite: Scalars['Boolean']['output'];
  mainImageUrl?: Maybe<Scalars['String']['output']>;
  ovenNeeded: Scalars['Boolean']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};
