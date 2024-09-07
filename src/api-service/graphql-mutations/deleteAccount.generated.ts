import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type AccountFullFragment = { __typename?: 'Account', id: number, username: string, phoneNumber: string, isVerified: boolean, token?: string | null };

export type DeleteAccountMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename: 'GeneralError', errorMessage: string } | { __typename: 'GeneralSuccess', successMessage: string } };

export const AccountFullFragmentDoc = gql`
    fragment AccountFull on Account {
  id
  username
  phoneNumber
  isVerified
  token
}
    `;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($id: Int!) {
  deleteAccount(id: $id) {
    __typename
    ... on GeneralSuccess {
      successMessage
    }
    ... on GeneralError {
      errorMessage
    }
  }
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;