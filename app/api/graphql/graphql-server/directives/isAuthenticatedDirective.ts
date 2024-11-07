import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import { type GraphQLSchema, defaultFieldResolver } from 'graphql'

const directiveName = 'isAuthenticated'

export const isAuthenticatedTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const isAuthenticatedDirective = getDirective(schema, fieldConfig, directiveName)?.[0]

      if (isAuthenticatedDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig

        return {
          ...fieldConfig,
          resolve: async (source, args, context, info) => {
            if (!context.userId) return getUnauthenticatedError()

            const result = await resolve(source, args, context, info)
            return result
          }
        }
      }
    }
  })

export const getUnauthenticatedError = () => {
  return {
    __typename: 'UnauthenticatedError',
    errorMessage: 'You are not authenticated. Please sign in.'
  }
}
