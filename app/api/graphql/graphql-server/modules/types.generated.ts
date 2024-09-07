import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  File: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['Int']['output'];
  isVerified: Scalars['Boolean']['output'];
  phoneNumber: Scalars['String']['output'];
  token?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type AccountInput = {
  phoneNumber: Scalars['String']['input'];
  username: Scalars['String']['input'];
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

export type GeneralError = BaseError & {
  __typename?: 'GeneralError';
  errorMessage: Scalars['String']['output'];
};

export type GeneralResult = GeneralError | GeneralSuccess;

export type GeneralSuccess = BaseSuccess & {
  __typename?: 'GeneralSuccess';
  successMessage: Scalars['String']['output'];
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
  createAccount: AccountResult;
  createRecipe?: Maybe<Recipe>;
  deleteAccount: GeneralResult;
  patchRecipe?: Maybe<Recipe>;
  pingMutation?: Maybe<Scalars['String']['output']>;
  requestVerificationCode: GeneralResult;
  signInToAccountWithCode: AccountResult;
};


export type MutationcreateAccountArgs = {
  accountInput: AccountInput;
};


export type MutationcreateRecipeArgs = {
  recipeInput: RecipeInput;
};


export type MutationdeleteAccountArgs = {
  id: Scalars['Int']['input'];
};


export type MutationpatchRecipeArgs = {
  recipeId: Scalars['Int']['input'];
  recipePatch: RecipeInput;
};


export type MutationrequestVerificationCodeArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type MutationsignInToAccountWithCodeArgs = {
  code: Scalars['String']['input'];
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

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int']['output'];
  tag: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  AccountResult: ( Account & { __typename: 'Account' } ) | ( BadInputError & { __typename: 'BadInputError' } );
  GeneralResult: ( GeneralError & { __typename: 'GeneralError' } ) | ( GeneralSuccess & { __typename: 'GeneralSuccess' } );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  BaseError: ( BadInputError & { __typename: 'BadInputError' } ) | ( GeneralError & { __typename: 'GeneralError' } );
  BaseSuccess: ( GeneralSuccess & { __typename: 'GeneralSuccess' } );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AccountInput: AccountInput;
  AccountResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AccountResult']>;
  BadInputError: ResolverTypeWrapper<BadInputError>;
  BaseError: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseError']>;
  BaseSuccess: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseSuccess']>;
  File: ResolverTypeWrapper<Scalars['File']['output']>;
  GeneralError: ResolverTypeWrapper<GeneralError>;
  GeneralResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['GeneralResult']>;
  GeneralSuccess: ResolverTypeWrapper<GeneralSuccess>;
  Ingredient: ResolverTypeWrapper<Ingredient>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  IngredientGroup: ResolverTypeWrapper<IngredientGroup>;
  IngredientGroupInput: IngredientGroupInput;
  IngredientInput: IngredientInput;
  Instruction: ResolverTypeWrapper<Instruction>;
  InstructionGroup: ResolverTypeWrapper<InstructionGroup>;
  InstructionGroupInput: InstructionGroupInput;
  InstructionInput: InstructionInput;
  Language: ResolverTypeWrapper<Language>;
  Mutation: ResolverTypeWrapper<{}>;
  Photo: ResolverTypeWrapper<Photo>;
  PhotoInput: PhotoInput;
  Query: ResolverTypeWrapper<{}>;
  Recipe: ResolverTypeWrapper<Recipe>;
  RecipeInput: RecipeInput;
  Tag: ResolverTypeWrapper<Tag>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  Int: Scalars['Int']['output'];
  Boolean: Scalars['Boolean']['output'];
  String: Scalars['String']['output'];
  AccountInput: AccountInput;
  AccountResult: ResolversUnionTypes<ResolversParentTypes>['AccountResult'];
  BadInputError: BadInputError;
  BaseError: ResolversInterfaceTypes<ResolversParentTypes>['BaseError'];
  BaseSuccess: ResolversInterfaceTypes<ResolversParentTypes>['BaseSuccess'];
  File: Scalars['File']['output'];
  GeneralError: GeneralError;
  GeneralResult: ResolversUnionTypes<ResolversParentTypes>['GeneralResult'];
  GeneralSuccess: GeneralSuccess;
  Ingredient: Ingredient;
  Float: Scalars['Float']['output'];
  IngredientGroup: IngredientGroup;
  IngredientGroupInput: IngredientGroupInput;
  IngredientInput: IngredientInput;
  Instruction: Instruction;
  InstructionGroup: InstructionGroup;
  InstructionGroupInput: InstructionGroupInput;
  InstructionInput: InstructionInput;
  Language: Language;
  Mutation: {};
  Photo: Photo;
  PhotoInput: PhotoInput;
  Query: {};
  Recipe: Recipe;
  RecipeInput: RecipeInput;
  Tag: Tag;
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountResult'] = ResolversParentTypes['AccountResult']> = {
  __resolveType?: TypeResolveFn<'Account' | 'BadInputError', ParentType, ContextType>;
};

export type BadInputErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['BadInputError'] = ResolversParentTypes['BadInputError']> = {
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseError'] = ResolversParentTypes['BaseError']> = {
  __resolveType?: TypeResolveFn<'BadInputError' | 'GeneralError', ParentType, ContextType>;
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type BaseSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseSuccess'] = ResolversParentTypes['BaseSuccess']> = {
  __resolveType?: TypeResolveFn<'GeneralSuccess', ParentType, ContextType>;
  successMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface FileScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['File'], any> {
  name: 'File';
}

export type GeneralErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralError'] = ResolversParentTypes['GeneralError']> = {
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeneralResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralResult'] = ResolversParentTypes['GeneralResult']> = {
  __resolveType?: TypeResolveFn<'GeneralError' | 'GeneralSuccess', ParentType, ContextType>;
};

export type GeneralSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralSuccess'] = ResolversParentTypes['GeneralSuccess']> = {
  successMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngredientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ingredient'] = ResolversParentTypes['Ingredient']> = {
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  previousId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  unit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngredientGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['IngredientGroup'] = ResolversParentTypes['IngredientGroup']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ingredients?: Resolver<Array<ResolversTypes['Ingredient']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InstructionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Instruction'] = ResolversParentTypes['Instruction']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  previousId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InstructionGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['InstructionGroup'] = ResolversParentTypes['InstructionGroup']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instructions?: Resolver<Array<ResolversTypes['Instruction']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LanguageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Language'] = ResolversParentTypes['Language']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAccount?: Resolver<ResolversTypes['AccountResult'], ParentType, ContextType, RequireFields<MutationcreateAccountArgs, 'accountInput'>>;
  createRecipe?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType, RequireFields<MutationcreateRecipeArgs, 'recipeInput'>>;
  deleteAccount?: Resolver<ResolversTypes['GeneralResult'], ParentType, ContextType, RequireFields<MutationdeleteAccountArgs, 'id'>>;
  patchRecipe?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType, RequireFields<MutationpatchRecipeArgs, 'recipeId' | 'recipePatch'>>;
  pingMutation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requestVerificationCode?: Resolver<ResolversTypes['GeneralResult'], ParentType, ContextType, RequireFields<MutationrequestVerificationCodeArgs, 'phoneNumber'>>;
  signInToAccountWithCode?: Resolver<ResolversTypes['AccountResult'], ParentType, ContextType, RequireFields<MutationsignInToAccountWithCodeArgs, 'code'>>;
};

export type PhotoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Photo'] = ResolversParentTypes['Photo']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isMainPhoto?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allLanguages?: Resolver<Array<ResolversTypes['Language']>, ParentType, ContextType>;
  allRecipes?: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType>;
  allTags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  pingQuery?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type RecipeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recipe'] = ResolversParentTypes['Recipe']> = {
  authorId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ingredientGroups?: Resolver<Array<ResolversTypes['IngredientGroup']>, ParentType, ContextType>;
  instructionGroups?: Resolver<Array<ResolversTypes['InstructionGroup']>, ParentType, ContextType>;
  isPrivate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  language?: Resolver<ResolversTypes['Language'], ParentType, ContextType>;
  ovenNeeded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  photos?: Resolver<Maybe<Array<ResolversTypes['Photo']>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  AccountResult?: AccountResultResolvers<ContextType>;
  BadInputError?: BadInputErrorResolvers<ContextType>;
  BaseError?: BaseErrorResolvers<ContextType>;
  BaseSuccess?: BaseSuccessResolvers<ContextType>;
  File?: GraphQLScalarType;
  GeneralError?: GeneralErrorResolvers<ContextType>;
  GeneralResult?: GeneralResultResolvers<ContextType>;
  GeneralSuccess?: GeneralSuccessResolvers<ContextType>;
  Ingredient?: IngredientResolvers<ContextType>;
  IngredientGroup?: IngredientGroupResolvers<ContextType>;
  Instruction?: InstructionResolvers<ContextType>;
  InstructionGroup?: InstructionGroupResolvers<ContextType>;
  Language?: LanguageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Photo?: PhotoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Recipe?: RecipeResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
};

