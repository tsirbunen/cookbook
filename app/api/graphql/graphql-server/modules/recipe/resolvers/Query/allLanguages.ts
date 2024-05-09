import { getAllLanguages } from '../../../../services/languages/service'
import type { QueryResolvers } from './../../../types.generated'
export const allLanguages: NonNullable<QueryResolvers['allLanguages']> = async (_parent, _arg, _ctx) => {
  return await getAllLanguages()
}
