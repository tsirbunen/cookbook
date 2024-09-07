/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { Account } from './account/resolvers/Account';
import    { BadInputError } from './error/resolvers/BadInputError';
import    { File } from './mutation/resolvers/File';
import    { Ingredient } from './recipe/resolvers/Ingredient';
import    { IngredientGroup } from './recipe/resolvers/IngredientGroup';
import    { Instruction } from './recipe/resolvers/Instruction';
import    { InstructionGroup } from './recipe/resolvers/InstructionGroup';
import    { Language } from './recipe/resolvers/Language';
import    { createAccount as Mutation_createAccount } from './account/resolvers/Mutation/createAccount';
import    { createRecipe as Mutation_createRecipe } from './recipe/resolvers/Mutation/createRecipe';
import    { deleteAccount as Mutation_deleteAccount } from './account/resolvers/Mutation/deleteAccount';
import    { patchRecipe as Mutation_patchRecipe } from './recipe/resolvers/Mutation/patchRecipe';
import    { pingMutation as Mutation_pingMutation } from './mutation/resolvers/Mutation/pingMutation';
import    { requestVerificationCode as Mutation_requestVerificationCode } from './account/resolvers/Mutation/requestVerificationCode';
import    { signInToAccountWithCode as Mutation_signInToAccountWithCode } from './account/resolvers/Mutation/signInToAccountWithCode';
import    { Photo } from './recipe/resolvers/Photo';
import    { allLanguages as Query_allLanguages } from './recipe/resolvers/Query/allLanguages';
import    { allRecipes as Query_allRecipes } from './recipe/resolvers/Query/allRecipes';
import    { allTags as Query_allTags } from './recipe/resolvers/Query/allTags';
import    { pingQuery as Query_pingQuery } from './query/resolvers/Query/pingQuery';
import    { Recipe } from './recipe/resolvers/Recipe';
import    { Tag } from './recipe/resolvers/Tag';
    export const resolvers: Resolvers = {
      Query: { allLanguages: Query_allLanguages,allRecipes: Query_allRecipes,allTags: Query_allTags,pingQuery: Query_pingQuery },
      Mutation: { createAccount: Mutation_createAccount,createRecipe: Mutation_createRecipe,deleteAccount: Mutation_deleteAccount,patchRecipe: Mutation_patchRecipe,pingMutation: Mutation_pingMutation,requestVerificationCode: Mutation_requestVerificationCode,signInToAccountWithCode: Mutation_signInToAccountWithCode },
      
      Account: Account,
BadInputError: BadInputError,
File: File,
Ingredient: Ingredient,
IngredientGroup: IngredientGroup,
Instruction: Instruction,
InstructionGroup: InstructionGroup,
Language: Language,
Photo: Photo,
Recipe: Recipe,
Tag: Tag
    }