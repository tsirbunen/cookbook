import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
export type IngredientEntityFragment = { __typename?: 'Ingredient', id: number, name: string, amount?: number | null, unit?: string | null, previousId?: number | null };

export type IngredientGroupEntityFragment = { __typename?: 'IngredientGroup', id: number, title?: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: number, name: string, amount?: number | null, unit?: string | null, previousId?: number | null }> };

export type InstructionEntityFragment = { __typename?: 'Instruction', id: number, content: string, previousId?: number | null };

export type InstructionGroupEntityFragment = { __typename?: 'InstructionGroup', id: number, title?: string | null, instructions: Array<{ __typename?: 'Instruction', id: number, content: string, previousId?: number | null }> };

export type RecipeEntityFragment = { __typename?: 'Recipe', id: number, title: string, description?: string | null, ovenNeeded: boolean, isPrivate?: boolean | null, authorId?: number | null, photos?: Array<{ __typename?: 'Photo', id: number, url: string, isMainPhoto: boolean }> | null, tags?: Array<{ __typename?: 'Tag', id: number, tag: string }> | null, language: { __typename?: 'Language', id: number, language: string }, ingredientGroups: Array<{ __typename?: 'IngredientGroup', id: number, title?: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: number, name: string, amount?: number | null, unit?: string | null, previousId?: number | null }> }>, instructionGroups: Array<{ __typename?: 'InstructionGroup', id: number, title?: string | null, instructions: Array<{ __typename?: 'Instruction', id: number, content: string, previousId?: number | null }> }> };

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
  authorId
  ingredientGroups {
    ...IngredientGroupEntity
  }
  instructionGroups {
    ...InstructionGroupEntity
  }
}
    ${IngredientGroupEntityFragmentDoc}
${InstructionGroupEntityFragmentDoc}`;