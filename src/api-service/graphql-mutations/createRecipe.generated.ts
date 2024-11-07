import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import { RecipeResultFullFragmentDoc } from '../graphql-fragments/recipeFragments.generated';
import * as Apollo from '@apollo/client';
export type CreateRecipeMutationVariables = Types.Exact<{
  createRecipeInput: Types.CreateRecipeInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe?: { __typename: 'BadInputError', errorMessage: string } | { __typename: 'Recipe', id: number, authorId?: number | null, title: string, description?: string | null, ovenNeeded: boolean, isPrivate?: boolean | null, photos?: Array<{ __typename?: 'Photo', id: number, url: string, isMainPhoto: boolean }> | null, tags?: Array<{ __typename?: 'Tag', id: number, tag: string }> | null, language: { __typename?: 'Language', id: number, language: string }, ingredientGroups: Array<{ __typename?: 'IngredientGroup', id: number, title?: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: number, name: string, amount?: number | null, unit?: string | null, previousId?: number | null }> }>, instructionGroups: Array<{ __typename?: 'InstructionGroup', id: number, title?: string | null, instructions: Array<{ __typename?: 'Instruction', id: number, content: string, previousId?: number | null }> }> } | { __typename: 'UnauthenticatedError', errorMessage: string } | { __typename: 'UnauthorizedError', errorMessage: string } | null };


export const CreateRecipeDocument = gql`
    mutation CreateRecipe($createRecipeInput: CreateRecipeInput!) {
  createRecipe(createRecipeInput: $createRecipeInput) {
    ...RecipeResultFull
  }
}
    ${RecipeResultFullFragmentDoc}`;
export type CreateRecipeMutationFn = Apollo.MutationFunction<CreateRecipeMutation, CreateRecipeMutationVariables>;
export type CreateRecipeMutationResult = Apollo.MutationResult<CreateRecipeMutation>;
export type CreateRecipeMutationOptions = Apollo.BaseMutationOptions<CreateRecipeMutation, CreateRecipeMutationVariables>;