import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type RequestVerificationEmailMutationVariables = Types.Exact<{
  emailInput: Types.EmailInput;
}>;


export type RequestVerificationEmailMutation = { __typename?: 'Mutation', requestVerificationEmail: { __typename: 'GeneralError', errorMessage: string } | { __typename: 'GeneralSuccess', successMessage: string } };


export const RequestVerificationEmailDocument = gql`
    mutation RequestVerificationEmail($emailInput: EmailInput!) {
  requestVerificationEmail(emailInput: $emailInput) {
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
export type RequestVerificationEmailMutationFn = Apollo.MutationFunction<RequestVerificationEmailMutation, RequestVerificationEmailMutationVariables>;
export type RequestVerificationEmailMutationResult = Apollo.MutationResult<RequestVerificationEmailMutation>;
export type RequestVerificationEmailMutationOptions = Apollo.BaseMutationOptions<RequestVerificationEmailMutation, RequestVerificationEmailMutationVariables>;