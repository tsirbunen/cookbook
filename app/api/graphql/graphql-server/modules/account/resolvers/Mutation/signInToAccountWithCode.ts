import { signInToExistingAccount } from '../../../../services/accounts/service'
import type { MutationResolvers } from './../../../types.generated'

export const signInToAccountWithCode: NonNullable<MutationResolvers['signInToAccountWithCode']> = async (
  _parent,
  { code },
  _ctx
) => {
  return await signInToExistingAccount(code)
}
