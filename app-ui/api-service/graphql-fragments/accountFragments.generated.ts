import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
export type AccountFullFragment = { __typename?: 'Account', id: number, uuid: string, username: string, token?: string | null, email?: string | null, emailVerified?: boolean | null, identityProvider: Types.IdentityProvider };

export type AccountResultFull_Account_Fragment = { __typename: 'Account', id: number, uuid: string, username: string, token?: string | null, email?: string | null, emailVerified?: boolean | null, identityProvider: Types.IdentityProvider };

export type AccountResultFull_BadInputError_Fragment = { __typename: 'BadInputError', errorMessage: string };

export type AccountResultFullFragment = AccountResultFull_Account_Fragment | AccountResultFull_BadInputError_Fragment;

export const AccountFullFragmentDoc = gql`
    fragment AccountFull on Account {
  id
  uuid
  username
  token
  email
  emailVerified
  identityProvider
}
    `;
export const AccountResultFullFragmentDoc = gql`
    fragment AccountResultFull on AccountResult {
  __typename
  ... on Account {
    ...AccountFull
  }
  ... on BadInputError {
    errorMessage
  }
}
    ${AccountFullFragmentDoc}`;