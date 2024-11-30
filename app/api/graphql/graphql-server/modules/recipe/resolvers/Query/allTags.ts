import { TagHandler } from '../../../../../../../../app-business-domain/handlers/tags/handler'
import type { GraphQLContext } from '../../../../../route'
import type { QueryResolvers } from './../../../types.generated'

export const allTags: NonNullable<QueryResolvers['allTags']> = async (_parent, _arg, context: GraphQLContext) => {
  const handler = new TagHandler(context.dataStore)
  return await handler.getAllTags()
}
