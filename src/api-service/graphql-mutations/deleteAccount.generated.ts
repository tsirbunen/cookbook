import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type DeleteAccountMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  uuid: Types.Scalars['String']['input'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename: 'GeneralError', errorMessage: string } | { __typename: 'GeneralSuccess', successMessage: string } };


export const DeleteAccountDocument = gql`
    mutation DeleteAccount($id: Int!, $uuid: String!) {
  deleteAccount(id: $id, uuid: $uuid) {
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