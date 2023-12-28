import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs, resolvers } from './type-defs-and-resolvers'

export const makeSchema = async (_: { request: Request }) => {
  return makeExecutableSchema({
    typeDefs,
    resolvers
  })
}
