import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import { RecipeResultFullFragmentDoc } from '../graphql-fragments/recipeFragments.generated';
import * as Apollo from '@apollo/client';
export type PatchRecipeMutationVariables = Types.Exact<{
  recipeId: Types.Scalars['Int']['input'];
  recipePatch: Types.PatchRecipeInput;
}>;


export type PatchRecipeMutation = { __typename?: 'Mutation', patchRecipe?: { __typename: 'BadInputError', errorMessage: string } | { __typename: 'DeletePhotoError', errorMessage: string } | { __typename: 'PhotoUploadUrlError', errorMessage: string } | { __typename: 'Recipe', id: number, authorId?: number | null, title: string, description?: string | null, ovenNeeded: boolean, isPrivate?: boolean | null, photos?: Array<{ __typename?: 'Photo', id: number, url: string, isMainPhoto: boolean }> | null, photoUploadDetails?: Array<{ __typename?: 'PhotoUploadDetails', photoId: string, token: string }> | null, tags?: Array<{ __typename?: 'Tag', id: number, tag: string }> | null, language: { __typename?: 'Language', id: number, language: string }, ingredientGroups: Array<{ __typename?: 'IngredientGroup', id: number, title?: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: number, name: string, amount?: number | null, unit?: string | null, previousId?: number | null }> }>, instructionGroups: Array<{ __typename?: 'InstructionGroup', id: number, title?: string | null, instructions: Array<{ __typename?: 'Instruction', id: number, content: string, previousId?: number | null }> }> } | { __typename: 'UnauthenticatedError', errorMessage: string } | { __typename: 'UnauthorizedError', errorMessage: string } | null };


export const PatchRecipeDocument = gql`
    mutation PatchRecipe($recipeId: Int!, $recipePatch: PatchRecipeInput!) {
  patchRecipe(recipeId: $recipeId, recipePatch: $recipePatch) {
    ...RecipeResultFull
  }
}
    ${RecipeResultFullFragmentDoc}`;
export type PatchRecipeMutationFn = Apollo.MutationFunction<PatchRecipeMutation, PatchRecipeMutationVariables>;
export type PatchRecipeMutationResult = Apollo.MutationResult<PatchRecipeMutation>;
export type PatchRecipeMutationOptions = Apollo.BaseMutationOptions<PatchRecipeMutation, PatchRecipeMutationVariables>;