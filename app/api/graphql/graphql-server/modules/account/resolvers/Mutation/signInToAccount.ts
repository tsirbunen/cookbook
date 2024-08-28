import { signInToExistingAccount } from '../../../../services/accounts/service'
import type { MutationResolvers } from './../../../types.generated'

export const signInToAccount: NonNullable<MutationResolvers['signInToAccount']> = async (_parent, { code }, _ctx) => {
  return await signInToExistingAccount(code)
}
