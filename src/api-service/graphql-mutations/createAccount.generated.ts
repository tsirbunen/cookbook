import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type AccountFullFragment = { __typename?: 'Account', id: number, username: string, phoneNumber: string, isVerified: boolean, token?: string | null };

export type CreateAccountMutationVariables = Types.Exact<{
  accountInput: Types.AccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'Account', id: number, username: string, phoneNumber: string, isVerified: boolean, token?: string | null } | null };

export const AccountFullFragmentDoc = gql`
    fragment AccountFull on Account {
  id
  username
  phoneNumber
  isVerified
  token
}
    `;
export const CreateAccountDocument = gql`
    mutation CreateAccount($accountInput: AccountInput!) {
  createAccount(accountInput: $accountInput) {
    ...AccountFull
  }
}
    ${AccountFullFragmentDoc}`;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;