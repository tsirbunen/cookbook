import { requestNewCode } from '../../../../services/accounts/service'

import type { MutationResolvers } from './../../../types.generated'
export const requestCode: NonNullable<MutationResolvers['requestCode']> = async (_parent, { phoneNumber }, _ctx) => {
  return await requestNewCode(phoneNumber)
}
