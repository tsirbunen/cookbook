import { createNewAccount } from '../../../../services/accounts/service'
import type { MutationResolvers } from './../../../types.generated'

export const createAccount: NonNullable<MutationResolvers['createAccount']> = async (
  _parent,
  { accountInput },
  _ctx
) => {
  return await createNewAccount(accountInput)
}
