import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import { AccountResultFullFragmentDoc } from '../graphql-fragments/accountFragments.generated';
import * as Apollo from '@apollo/client';
export type GetAccountQueryVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type GetAccountQuery = { __typename?: 'Query', getAccount: { __typename: 'Account', id: number, uuid: string, username: string, token?: string | null, email?: string | null, emailVerified?: boolean | null, identityProvider: Types.IdentityProvider } | { __typename: 'BadInputError', errorMessage: string } };


export const GetAccountDocument = gql`
    query GetAccount($token: String!) {
  getAccount(token: $token) {
    ...AccountResultFull
  }
}
    ${AccountResultFullFragmentDoc}`;
export type GetAccountQueryResult = Apollo.QueryResult<GetAccountQuery, GetAccountQueryVariables>;