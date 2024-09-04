import { requestNewCode } from '../../../../services/accounts/service'
import type { MutationResolvers } from './../../../types.generated'

export const requestVerificationCode: NonNullable<MutationResolvers['requestVerificationCode']> = async (
  _parent,
  { phoneNumber },
  _ctx
) => {
  return await requestNewCode(phoneNumber)
}
