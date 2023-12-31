import type { QueryResolvers } from '../../../types.generated'
export const pingQuery: NonNullable<QueryResolvers['pingQuery']> = async (_parent, _arg, _ctx) => {
  return 'pong'
}
