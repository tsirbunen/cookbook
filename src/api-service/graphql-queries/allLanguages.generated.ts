import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type AllLanguagesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllLanguagesQuery = { __typename?: 'Query', allLanguages: Array<{ __typename?: 'Language', id: number, language: string }> };


export const AllLanguagesDocument = gql`
    query AllLanguages {
  allLanguages {
    id
    language
  }
}
    `;
export type AllLanguagesQueryResult = Apollo.QueryResult<AllLanguagesQuery, AllLanguagesQueryVariables>;