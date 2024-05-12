import { getAllTags } from '../../../../services/tags/service'
import type { QueryResolvers } from './../../../types.generated'
export const allTags: NonNullable<QueryResolvers['allTags']> = async (_parent, _arg, _ctx) => {
  return await getAllTags()
}
