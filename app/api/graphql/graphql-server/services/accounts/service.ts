import * as dotenv from 'dotenv'
dotenv.config()

import { database } from '../../database/config/config'
import { AccountInput } from '../../modules/types.generated'
import {
  handleCredentialsAlreadyTakenError,
  getExistingAccount,
  getAccountDoesNotExistError,
  updateAccountInDBWithCode,
  getVerificationCodeSentSuccess,
  getAccountDeletedSuccess
} from './utils'
import { accounts } from '../../database/database-schemas/accounts'
import { sendVerificationCodeSMS } from './sms-utils'

export const createNewAccount = async (accountInput: AccountInput) => {
  const existing = await getExistingAccount(database, accountInput)
  if (existing) {
    return handleCredentialsAlreadyTakenError(existing, accountInput)
  }

  const [newAccount] = await database
    .insert(accounts)
    .values({ ...accountInput, isVerified: false })
    .returning()

  return newAccount
}

export const requestNewCode = async (phoneNumber: string) => {
  const existingAccount = await getExistingAccount(database, { phoneNumber })
  if (!existingAccount) return getAccountDoesNotExistError(phoneNumber)

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  await updateAccountInDBWithCode(database, existingAccount.id, code)

  await sendVerificationCodeSMS(phoneNumber, code)

  return getVerificationCodeSentSuccess(phoneNumber)
}

export const signInToExistingAccount = async (code: string) => {
  // FIXME: Implement this properly; while developing front, keep this
  return {
    username: 'user from api',
    phoneNumber: '+358 50 1234567',
    id: 3,
    isVerified: true,
    token: 'token'
  }
}

export const deleteAllAccountData = async (id: number) => {
  const existingAccount = await getExistingAccount(database, { id })
  if (!existingAccount) return getAccountDoesNotExistError()

  // FIXME: Implement deleting account and all related data
  // await trx.delete(accounts).where(eq(accounts.id, id))
  return getAccountDeletedSuccess(existingAccount?.phoneNumber ?? '')
}
