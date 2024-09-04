import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import { AccountFullFragmentDoc } from './deleteAccount.generated';
import * as Apollo from '@apollo/client';
export type SignInToAccountWithCodeMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;


export type SignInToAccountWithCodeMutation = { __typename?: 'Mutation', signInToAccountWithCode?: { __typename?: 'Account', id: number, username: string, phoneNumber: string, isVerified: boolean, token?: string | null } | null };


export const SignInToAccountWithCodeDocument = gql`
    mutation SignInToAccountWithCode($code: String!) {
  signInToAccountWithCode(code: $code) {
    ...AccountFull
  }
}
    ${AccountFullFragmentDoc}`;
export type SignInToAccountWithCodeMutationFn = Apollo.MutationFunction<SignInToAccountWithCodeMutation, SignInToAccountWithCodeMutationVariables>;
export type SignInToAccountWithCodeMutationResult = Apollo.MutationResult<SignInToAccountWithCodeMutation>;
export type SignInToAccountWithCodeMutationOptions = Apollo.BaseMutationOptions<SignInToAccountWithCodeMutation, SignInToAccountWithCodeMutationVariables>;