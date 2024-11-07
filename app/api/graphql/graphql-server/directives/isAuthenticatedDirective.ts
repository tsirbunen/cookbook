import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import { type GraphQLSchema, defaultFieldResolver } from 'graphql'

const directiveName = 'isAuthenticated'

export const authDirectiveTypeDefs = `directive @${directiveName}`
export const unauthenticatedError = {
  __typename: 'UnauthenticatedError',
  errorMessage: 'You are not authenticated. Please sign in.'
}

export const isAuthenticatedTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const isAuthenticatedDirective = getDirective(schema, fieldConfig, directiveName)?.[0]

      if (isAuthenticatedDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig

        return {
          ...fieldConfig,
          resolve: async (source, args, context, info) => {
            const userId = context.userId
            if (!userId) return unauthenticatedError

            const result = await resolve(source, args, context, info)
            return result
          }
        }
      }
    }
  })
