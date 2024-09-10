import * as dotenv from 'dotenv'
dotenv.config()

import { database } from '../../database/config/config'
import { AccountInput, SignInInput } from '../../modules/types.generated'
import {
  // handleCredentialsAlreadyTakenError,
  getExistingAccount,
  getAccountCouldNotBeFoundError,
  updateAccountInDBWithCode,
  getVerificationCodeSentSuccess,
  // getAccountDeletedSuccess,
  // getWrongCodeError,
  // setCodeToNull,
  // setIsVerifiedAndSetCodeToNull,
  // createJWT,
  getFeatureNotAvailableAtTheMomentError
} from './utils'
// import { accounts } from '../../database/database-schemas/accounts'
import { sendVerificationCodeSMS } from './sms-utils'

export const createNewAccount = async (accountInput: AccountInput) => {
  return getFeatureNotAvailableAtTheMomentError()
  // FIXME: Bring these back when feature is available
  // const existing = await getExistingAccount(database, accountInput)
  // if (existing) {
  //   return handleCredentialsAlreadyTakenError(existing, accountInput)
  // }

  // const [newAccount] = await database
  //   .insert(accounts)
  //   .values({ ...accountInput, isVerified: false })
  //   .returning()

  // return newAccount
}

export const requestNewCode = async (phoneNumber: string) => {
  // return getFeatureNotAvailableAtTheMomentError()
  // FIXME: Bring these back when feature is available
  const existingAccount = await getExistingAccount(database, { phoneNumber })
  if (!existingAccount) return getAccountCouldNotBeFoundError(phoneNumber)

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  console.log({ code })

  await updateAccountInDBWithCode(database, existingAccount.id, code)

  await sendVerificationCodeSMS(phoneNumber, code)

  return getVerificationCodeSentSuccess(phoneNumber)
}

export const signInToExistingAccount = async (signInInput: SignInInput) => {
  return getFeatureNotAvailableAtTheMomentError()
  // FIXME: Bring these back when feature is available
  // const { phoneNumber, code } = signInInput
  // const existingAccount = await getExistingAccount(database, { phoneNumber })
  // if (!existingAccount) return getAccountCouldNotBeFoundError(phoneNumber)

  // // If account exists, prevent further attempts to sign in with the same code by setting
  // // the code to null (regardless of whether the code is correct or not).
  // const codeIsCorrect = existingAccount.latestCode === code
  // if (codeIsCorrect) {
  //   const account = await setIsVerifiedAndSetCodeToNull(database, existingAccount.id)
  //   const token = createJWT(account)
  //   console.log({
  //     id: account.id,
  //     username: account.username,
  //     phoneNumber: account.phoneNumber,
  //     isVerified: account.isVerified,
  //     token
  //   })
  //   return {
  //     id: account.id,
  //     uuid: account.uuid,
  //     username: account.username,
  //     phoneNumber: account.phoneNumber,
  //     isVerified: account.isVerified,
  //     token
  //   }
  // } else {
  //   await setCodeToNull(database, existingAccount.id)
  //   return getWrongCodeError(code)
  // }
}

export const deleteAllAccountData = async (id: number, uuid: string) => {
  return getFeatureNotAvailableAtTheMomentError()
  // FIXME: Bring these back when feature is available
  // const existingAccount = await getExistingAccount(database, { id, uuid })
  // if (!existingAccount) return getAccountCouldNotBeFoundError()

  // // FIXME: Implement deleting account and all related data
  // return getAccountDeletedSuccess(existingAccount?.phoneNumber ?? '')
}
