import { deleteAllAccountData } from '../../../../services/accounts/service'
import type { MutationResolvers } from './../../../types.generated'

export const deleteAccount: NonNullable<MutationResolvers['deleteAccount']> = async (_parent, { id }, _ctx) => {
  return await deleteAllAccountData(id)
}
