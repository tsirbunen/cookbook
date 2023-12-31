import * as Types from '../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type RecipeEntityFragment = { __typename?: 'Recipe', id: number, title: string };

export type QueryPingQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type QueryPingQuery = { __typename?: 'Query', pingQuery?: string | null };

export type AllRecipesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllRecipesQuery = { __typename?: 'Query', allRecipes: Array<{ __typename?: 'Recipe', id: number, title: string } | null> };

export const RecipeEntityFragmentDoc = gql`
    fragment RecipeEntity on Recipe {
  id
  title
}
    `;
export const QueryPingDocument = gql`
    query QueryPing {
  pingQuery
}
    `;
export type QueryPingQueryResult = Apollo.QueryResult<QueryPingQuery, QueryPingQueryVariables>;
export const AllRecipesDocument = gql`
    query AllRecipes {
  allRecipes {
    ...RecipeEntity
  }
}
    ${RecipeEntityFragmentDoc}`;
export type AllRecipesQueryResult = Apollo.QueryResult<AllRecipesQuery, AllRecipesQueryVariables>;