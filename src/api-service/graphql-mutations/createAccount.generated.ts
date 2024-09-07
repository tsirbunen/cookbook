import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import { AccountResultFullFragmentDoc } from '../graphql-fragments/accountFragments.generated';
import * as Apollo from '@apollo/client';
export type CreateAccountMutationVariables = Types.Exact<{
  accountInput: Types.AccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename: 'Account', id: number, username: string, phoneNumber: string, isVerified: boolean, token?: string | null } | { __typename: 'BadInputError', errorMessage: string } };


export const CreateAccountDocument = gql`
    mutation CreateAccount($accountInput: AccountInput!) {
  createAccount(accountInput: $accountInput) {
    ...AccountResultFull
  }
}
    ${AccountResultFullFragmentDoc}`;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;