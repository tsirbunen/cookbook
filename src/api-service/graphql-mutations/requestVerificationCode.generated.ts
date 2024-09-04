import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type RequestVerificationCodeMutationVariables = Types.Exact<{
  phoneNumber: Types.Scalars['String']['input'];
}>;


export type RequestVerificationCodeMutation = { __typename?: 'Mutation', requestVerificationCode?: boolean | null };


export const RequestVerificationCodeDocument = gql`
    mutation RequestVerificationCode($phoneNumber: String!) {
  requestVerificationCode(phoneNumber: $phoneNumber)
}
    `;
export type RequestVerificationCodeMutationFn = Apollo.MutationFunction<RequestVerificationCodeMutation, RequestVerificationCodeMutationVariables>;
export type RequestVerificationCodeMutationResult = Apollo.MutationResult<RequestVerificationCodeMutation>;
export type RequestVerificationCodeMutationOptions = Apollo.BaseMutationOptions<RequestVerificationCodeMutation, RequestVerificationCodeMutationVariables>;