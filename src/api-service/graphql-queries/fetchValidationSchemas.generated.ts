import * as Types from '../../types/graphql-schema-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type FetchValidationSchemasQueryVariables = Types.Exact<{
  schemas: Array<Types.TargetSchema> | Types.TargetSchema;
}>;


export type FetchValidationSchemasQuery = { __typename?: 'Query', validationSchemas?: Array<{ __typename?: 'ValidationSchema', target: Types.TargetSchema, schema: any }> | null };


export const FetchValidationSchemasDocument = gql`
    query FetchValidationSchemas($schemas: [TargetSchema!]!) {
  validationSchemas(schemas: $schemas) {
    target
    schema
  }
}
    `;
export type FetchValidationSchemasQueryResult = Apollo.QueryResult<FetchValidationSchemasQuery, FetchValidationSchemasQueryVariables>;