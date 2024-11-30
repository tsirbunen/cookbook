import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import { AccountResultFullFragmentDoc } from '../graphql-fragments/accountFragments.generated';
import * as Apollo from '@apollo/client';
export type SignInToEmailAccountMutationVariables = Types.Exact<{
  signInToEmailAccountInput: Types.SignInToEmailAccountInput;
}>;


export type SignInToEmailAccountMutation = { __typename?: 'Mutation', signInToEmailAccount: { __typename: 'Account', id: number, uuid: string, username: string, token?: string | null, email?: string | null, emailVerified?: boolean | null, identityProvider: Types.IdentityProvider } | { __typename: 'BadInputError', errorMessage: string } };


export const SignInToEmailAccountDocument = gql`
    mutation SignInToEmailAccount($signInToEmailAccountInput: SignInToEmailAccountInput!) {
  signInToEmailAccount(signInToEmailAccountInput: $signInToEmailAccountInput) {
    ...AccountResultFull
  }
}
    ${AccountResultFullFragmentDoc}`;
export type SignInToEmailAccountMutationFn = Apollo.MutationFunction<SignInToEmailAccountMutation, SignInToEmailAccountMutationVariables>;
export type SignInToEmailAccountMutationResult = Apollo.MutationResult<SignInToEmailAccountMutation>;
export type SignInToEmailAccountMutationOptions = Apollo.BaseMutationOptions<SignInToEmailAccountMutation, SignInToEmailAccountMutationVariables>;