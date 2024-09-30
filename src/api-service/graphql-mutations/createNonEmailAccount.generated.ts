import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import { AccountResultFullFragmentDoc } from '../graphql-fragments/accountFragments.generated';
import * as Apollo from '@apollo/client';
export type CreateNonEmailAccountMutationVariables = Types.Exact<{
  nonEmailAccountInput: Types.NonEmailAccountInput;
}>;


export type CreateNonEmailAccountMutation = { __typename?: 'Mutation', createNonEmailAccount: { __typename: 'Account', id: number, uuid: string, username: string, token?: string | null, email?: string | null, emailVerified?: boolean | null, identityProvider: Types.IdentityProvider } | { __typename: 'BadInputError', errorMessage: string } };


export const CreateNonEmailAccountDocument = gql`
    mutation CreateNonEmailAccount($nonEmailAccountInput: NonEmailAccountInput!) {
  createNonEmailAccount(nonEmailAccountInput: $nonEmailAccountInput) {
    ...AccountResultFull
  }
}
    ${AccountResultFullFragmentDoc}`;
export type CreateNonEmailAccountMutationFn = Apollo.MutationFunction<CreateNonEmailAccountMutation, CreateNonEmailAccountMutationVariables>;
export type CreateNonEmailAccountMutationResult = Apollo.MutationResult<CreateNonEmailAccountMutation>;
export type CreateNonEmailAccountMutationOptions = Apollo.BaseMutationOptions<CreateNonEmailAccountMutation, CreateNonEmailAccountMutationVariables>;