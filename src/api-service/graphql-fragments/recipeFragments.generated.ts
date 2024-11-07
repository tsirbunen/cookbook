import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
export type IngredientEntityFragment = { __typename?: 'Ingredient', id: number, name: string, amount?: number | null, unit?: string | null, previousId?: number | null };

export type IngredientGroupEntityFragment = { __typename?: 'IngredientGroup', id: number, title?: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: number, name: string, amount?: number | null, unit?: string | null, previousId?: number | null }> };

export type InstructionEntityFragment = { __typename?: 'Instruction', id: number, content: string, previousId?: number | null };

export type InstructionGroupEntityFragment = { __typename?: 'InstructionGroup', id: number, title?: string | null, instructions: Array<{ __typename?: 'Instruction', id: number, content: string, previousId?: number | null }> };

export type RecipeEntityFragment = { __typename?: 'Recipe', id: number, authorId?: number | null, title: string, description?: string | null, ovenNeeded: boolean, isPrivate?: boolean | null, photos?: Array<{ __typename?: 'Photo', id: number, url: string, isMainPhoto: boolean }> | null, tags?: Array<{ __typename?: 'Tag', id: number, tag: string }> | null, language: { __typename?: 'Language', id: number, language: string }, ingredientGroups: Array<{ __typename?: 'IngredientGroup', id: number, title?: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: number, name: string, amount?: number | null, unit?: string | null, previousId?: number | null }> }>, instructionGroups: Array<{ __typename?: 'InstructionGroup', id: number, title?: string | null, instructions: Array<{ __typename?: 'Instruction', id: number, content: string, previousId?: number | null }> }> };

export type RecipeResultFull_BadInputError_Fragment = { __typename: 'BadInputError', errorMessage: string };

export type RecipeResultFull_Recipe_Fragment = { __typename: 'Recipe', id: number, authorId?: number | null, title: string, description?: string | null, ovenNeeded: boolean, isPrivate?: boolean | null, photos?: Array<{ __typename?: 'Photo', id: number, url: string, isMainPhoto: boolean }> | null, tags?: Array<{ __typename?: 'Tag', id: number, tag: string }> | null, language: { __typename?: 'Language', id: number, language: string }, ingredientGroups: Array<{ __typename?: 'IngredientGroup', id: number, title?: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: number, name: string, amount?: number | null, unit?: string | null, previousId?: number | null }> }>, instructionGroups: Array<{ __typename?: 'InstructionGroup', id: number, title?: string | null, instructions: Array<{ __typename?: 'Instruction', id: number, content: string, previousId?: number | null }> }> };

export type RecipeResultFull_UnauthenticatedError_Fragment = { __typename: 'UnauthenticatedError', errorMessage: string };

export type RecipeResultFull_UnauthorizedError_Fragment = { __typename: 'UnauthorizedError', errorMessage: string };

export type RecipeResultFullFragment = RecipeResultFull_BadInputError_Fragment | RecipeResultFull_Recipe_Fragment | RecipeResultFull_UnauthenticatedError_Fragment | RecipeResultFull_UnauthorizedError_Fragment;

export const IngredientEntityFragmentDoc = gql`
    fragment IngredientEntity on Ingredient {
  id
  name
  amount
  unit
  previousId
}
    `;
export const IngredientGroupEntityFragmentDoc = gql`
    fragment IngredientGroupEntity on IngredientGroup {
  id
  title
  ingredients {
    ...IngredientEntity
  }
}
    ${IngredientEntityFragmentDoc}`;
export const InstructionEntityFragmentDoc = gql`
    fragment InstructionEntity on Instruction {
  id
  content
  previousId
}
    `;
export const InstructionGroupEntityFragmentDoc = gql`
    fragment InstructionGroupEntity on InstructionGroup {
  id
  title
  instructions {
    ...InstructionEntity
  }
}
    ${InstructionEntityFragmentDoc}`;
export const RecipeEntityFragmentDoc = gql`
    fragment RecipeEntity on Recipe {
  id
  authorId
  title
  description
  photos {
    id
    url
    isMainPhoto
  }
  tags {
    id
    tag
  }
  ovenNeeded
  language {
    id
    language
  }
  isPrivate
  ingredientGroups {
    ...IngredientGroupEntity
  }
  instructionGroups {
    ...InstructionGroupEntity
  }
}
    ${IngredientGroupEntityFragmentDoc}
${InstructionGroupEntityFragmentDoc}`;
export const RecipeResultFullFragmentDoc = gql`
    fragment RecipeResultFull on RecipeResult {
  __typename
  ... on Recipe {
    ...RecipeEntity
  }
  ... on UnauthenticatedError {
    errorMessage
  }
  ... on UnauthorizedError {
    errorMessage
  }
  ... on BadInputError {
    errorMessage
  }
}
    ${RecipeEntityFragmentDoc}`;