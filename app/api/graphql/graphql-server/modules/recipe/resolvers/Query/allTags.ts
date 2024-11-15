import type { GraphQLContext } from '../../../../../route'
import { TagHandler } from '../../../../handlers/tags/handler'
import type { QueryResolvers } from './../../../types.generated'

export const allTags: NonNullable<QueryResolvers['allTags']> = async (_parent, _arg, context: GraphQLContext) => {
  const handler = new TagHandler(context.dataStore)
  return await handler.getAllTags()
}
