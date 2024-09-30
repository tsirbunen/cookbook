/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { Account } from './account/resolvers/Account';
import    { BadInputError } from './error/resolvers/BadInputError';
import    { File } from './mutation/resolvers/File';
import    { GeneralError } from './error/resolvers/GeneralError';
import    { GeneralSuccess } from './success/resolvers/GeneralSuccess';
import    { Ingredient } from './recipe/resolvers/Ingredient';
import    { IngredientGroup } from './recipe/resolvers/IngredientGroup';
import    { Instruction } from './recipe/resolvers/Instruction';
import    { InstructionGroup } from './recipe/resolvers/InstructionGroup';
import    { Language } from './recipe/resolvers/Language';
import    { createEmailAccount as Mutation_createEmailAccount } from './account/resolvers/Mutation/createEmailAccount';
import    { createNonEmailAccount as Mutation_createNonEmailAccount } from './account/resolvers/Mutation/createNonEmailAccount';
import    { createRecipe as Mutation_createRecipe } from './recipe/resolvers/Mutation/createRecipe';
import    { deleteAccount as Mutation_deleteAccount } from './account/resolvers/Mutation/deleteAccount';
import    { patchRecipe as Mutation_patchRecipe } from './recipe/resolvers/Mutation/patchRecipe';
import    { pingMutation as Mutation_pingMutation } from './mutation/resolvers/Mutation/pingMutation';
import    { requestVerificationEmail as Mutation_requestVerificationEmail } from './account/resolvers/Mutation/requestVerificationEmail';
import    { signInToEmailAccount as Mutation_signInToEmailAccount } from './account/resolvers/Mutation/signInToEmailAccount';
import    { Photo } from './recipe/resolvers/Photo';
import    { allLanguages as Query_allLanguages } from './recipe/resolvers/Query/allLanguages';
import    { allRecipes as Query_allRecipes } from './recipe/resolvers/Query/allRecipes';
import    { allTags as Query_allTags } from './recipe/resolvers/Query/allTags';
import    { getAccount as Query_getAccount } from './account/resolvers/Query/getAccount';
import    { pingQuery as Query_pingQuery } from './query/resolvers/Query/pingQuery';
import    { validationSchemas as Query_validationSchemas } from './validation/resolvers/Query/validationSchemas';
import    { Recipe } from './recipe/resolvers/Recipe';
import    { Tag } from './recipe/resolvers/Tag';
import    { ValidationSchema } from './validation/resolvers/ValidationSchema';
import    { JSONResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { allLanguages: Query_allLanguages,allRecipes: Query_allRecipes,allTags: Query_allTags,getAccount: Query_getAccount,pingQuery: Query_pingQuery,validationSchemas: Query_validationSchemas },
      Mutation: { createEmailAccount: Mutation_createEmailAccount,createNonEmailAccount: Mutation_createNonEmailAccount,createRecipe: Mutation_createRecipe,deleteAccount: Mutation_deleteAccount,patchRecipe: Mutation_patchRecipe,pingMutation: Mutation_pingMutation,requestVerificationEmail: Mutation_requestVerificationEmail,signInToEmailAccount: Mutation_signInToEmailAccount },
      
      Account: Account,
BadInputError: BadInputError,
File: File,
GeneralError: GeneralError,
GeneralSuccess: GeneralSuccess,
Ingredient: Ingredient,
IngredientGroup: IngredientGroup,
Instruction: Instruction,
InstructionGroup: InstructionGroup,
Language: Language,
Photo: Photo,
Recipe: Recipe,
Tag: Tag,
ValidationSchema: ValidationSchema,
JSON: JSONResolver
    }