import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import { RecipeEntityFragmentDoc } from '../graphql-fragments/recipeFragments.generated';
import * as Apollo from '@apollo/client';
export type InitialRecipesAndRelatedDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type InitialRecipesAndRelatedDataQuery = { __typename?: 'Query', allRecipes: Array<{ __typename?: 'Recipe', id: number, authorId?: number | null, title: string, description?: string | null, ovenNeeded: boolean, isPrivate?: boolean | null, photos?: Array<{ __typename?: 'Photo', id: number, url: string, isMainPhoto: boolean }> | null, tags?: Array<{ __typename?: 'Tag', id: number, tag: string }> | null, language: { __typename?: 'Language', id: number, language: string }, ingredientGroups: Array<{ __typename?: 'IngredientGroup', id: number, title?: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: number, name: string, amount?: number | null, unit?: string | null, previousId?: number | null }> }>, instructionGroups: Array<{ __typename?: 'InstructionGroup', id: number, title?: string | null, instructions: Array<{ __typename?: 'Instruction', id: number, content: string, previousId?: number | null }> }> }>, allLanguages: Array<{ __typename?: 'Language', id: number, language: string }>, allTags: Array<{ __typename?: 'Tag', id: number, tag: string }> };


export const InitialRecipesAndRelatedDataDocument = gql`
    query InitialRecipesAndRelatedData {
  allRecipes {
    ...RecipeEntity
  }
  allLanguages {
    id
    language
  }
  allTags {
    id
    tag
  }
}
    ${RecipeEntityFragmentDoc}`;
export type InitialRecipesAndRelatedDataQueryResult = Apollo.QueryResult<InitialRecipesAndRelatedDataQuery, InitialRecipesAndRelatedDataQueryVariables>;