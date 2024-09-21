import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import { AccountResultFullFragmentDoc } from '../graphql-fragments/accountFragments.generated';
import * as Apollo from '@apollo/client';
export type CreateEmailAccountMutationVariables = Types.Exact<{
  emailAccountInput: Types.EmailAccountInput;
}>;


export type CreateEmailAccountMutation = { __typename?: 'Mutation', createEmailAccount: { __typename: 'Account', id: number, uuid: string, username: string, token?: string | null, email?: string | null, emailVerified?: boolean | null, identityProvider: Types.IdentityProvider } | { __typename: 'BadInputError', errorMessage: string } };


export const CreateEmailAccountDocument = gql`
    mutation CreateEmailAccount($emailAccountInput: EmailAccountInput!) {
  createEmailAccount(emailAccountInput: $emailAccountInput) {
    ...AccountResultFull
  }
}
    ${AccountResultFullFragmentDoc}`;
export type CreateEmailAccountMutationFn = Apollo.MutationFunction<CreateEmailAccountMutation, CreateEmailAccountMutationVariables>;
export type CreateEmailAccountMutationResult = Apollo.MutationResult<CreateEmailAccountMutation>;
export type CreateEmailAccountMutationOptions = Apollo.BaseMutationOptions<CreateEmailAccountMutation, CreateEmailAccountMutationVariables>;