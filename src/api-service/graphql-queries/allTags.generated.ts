import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type AllTagsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllTagsQuery = { __typename?: 'Query', allTags: Array<{ __typename?: 'Tag', id: number, tag: string }> };


export const AllTagsDocument = gql`
    query AllTags {
  allTags {
    id
    tag
  }
}
    `;
export type AllTagsQueryResult = Apollo.QueryResult<AllTagsQuery, AllTagsQueryVariables>;