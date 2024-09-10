import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import { AccountResultFullFragmentDoc } from '../graphql-fragments/accountFragments.generated';
import * as Apollo from '@apollo/client';
export type SignInToAccountMutationVariables = Types.Exact<{
  signInInput: Types.SignInInput;
}>;


export type SignInToAccountMutation = { __typename?: 'Mutation', signInToAccount: { __typename: 'Account', id: number, uuid: string, username: string, phoneNumber: string, isVerified: boolean, token?: string | null } | { __typename: 'BadInputError', errorMessage: string } };


export const SignInToAccountDocument = gql`
    mutation SignInToAccount($signInInput: SignInInput!) {
  signInToAccount(signInInput: $signInInput) {
    ...AccountResultFull
  }
}
    ${AccountResultFullFragmentDoc}`;
export type SignInToAccountMutationFn = Apollo.MutationFunction<SignInToAccountMutation, SignInToAccountMutationVariables>;
export type SignInToAccountMutationResult = Apollo.MutationResult<SignInToAccountMutation>;
export type SignInToAccountMutationOptions = Apollo.BaseMutationOptions<SignInToAccountMutation, SignInToAccountMutationVariables>;