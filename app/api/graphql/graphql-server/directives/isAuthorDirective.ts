import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import { type GraphQLSchema, defaultFieldResolver } from 'graphql'
import { unauthenticatedError } from './isAuthenticatedDirective'

const directiveName = 'isAuthor'

export const authorDirectiveTypeDefs = `directive @${directiveName}`
const isNotAuthorError = {
  __typename: 'BadInputError',
  errorMessage: 'You are not the author of the recipe'
}

type WithAuthorId = Record<string, { authorId: number }>
const getPossibleAuthorId = (input: WithAuthorId) => {
  for (const key in input) {
    if (input[key] && typeof input[key].authorId === 'number') {
      return input[key].authorId
    }
  }

  return null
}

export const isAuthorTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const isAuthorDirective = getDirective(schema, fieldConfig, directiveName)?.[0]

      if (isAuthorDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig

        return {
          ...fieldConfig,
          resolve: async (source, args, context, info) => {
            const authenticatedUserId = context.userId
            if (!authenticatedUserId) return unauthenticatedError

            const authorId = getPossibleAuthorId(args)
            if (authorId !== authenticatedUserId) return isNotAuthorError

            const result = await resolve(source, args, context, info)
            return result
          }
        }
      }
    }
  })
