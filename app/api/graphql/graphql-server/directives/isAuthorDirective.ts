import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import { type GraphQLSchema, defaultFieldResolver } from 'graphql'
import type { GraphQLContext } from '../../route'
import { getUnauthenticatedError } from './isAuthenticatedDirective'

const directiveName = 'isAuthor'

export const isAuthorTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const isAuthorDirective = getDirective(schema, fieldConfig, directiveName)?.[0]

      if (isAuthorDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig

        return {
          ...fieldConfig,
          resolve: async (source, args, context, info) => {
            const error = getIsAuthenticatedAuthorError(args, context)
            if (error) return error

            const result = await resolve(source, args, context, info)
            return result
          }
        }
      }
    }
  })

type ArgsWithAuthorId = Record<string, { authorId: number }>

const getIsAuthenticatedAuthorError = (args: ArgsWithAuthorId, context: GraphQLContext) => {
  const authenticatedUserId = context.userId
  if (!authenticatedUserId) return getUnauthenticatedError()

  const authorId = getPossibleAuthorId(args)
  if (authorId !== authenticatedUserId) return getIsNotAuthorError()
}

const getPossibleAuthorId = (args: ArgsWithAuthorId) => {
  for (const key in args) {
    if (args[key] && typeof args[key].authorId === 'number') {
      return args[key].authorId
    }
  }

  return null
}

const getIsNotAuthorError = () => {
  return {
    __typename: 'BadInputError',
    errorMessage: 'You are not the author of the recipe'
  }
}
