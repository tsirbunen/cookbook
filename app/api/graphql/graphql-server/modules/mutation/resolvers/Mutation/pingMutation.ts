import type { MutationResolvers } from '../../../types.generated'
export const pingMutation: NonNullable<MutationResolvers['pingMutation']> = async (_parent, _arg, _ctx) => {
  return 'pong'
}
