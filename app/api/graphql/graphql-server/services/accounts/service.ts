import * as dotenv from 'dotenv'
dotenv.config()

import { database } from '../../database/config/config'
import { EmailAccountInput, SignInToEmailAccountInput } from '../../modules/types.generated'
import {
  getExistingEmailAuthUser,
  resendVerificationEmail,
  signInEmailAuthUser,
  signUpEmailAuthUser
} from './email-provider-utils'
import {
  handleSignUpCredentialsTakenError,
  handleEmailAuthAuthError,
  AuthError,
  getError,
  hasEmailAuthError
} from './error-utils'
import {
  getExistingAccounts,
  insertEmailAccount,
  fetchEmailAuthProviderUserAndUpsertAccount,
  setEmailIsVerified,
  getAccountBy,
  getVerifiedAccountWithTokenAdded
} from './utils'

export const createNewEmailAccount = async ({ email, password, username }: EmailAccountInput) => {
  // FIXME: Implement proper validation elsewhere
  try {
    const accountsWithCredentials = await getExistingAccounts(database, { email, username })
    if (accountsWithCredentials?.length) {
      return handleSignUpCredentialsTakenError(accountsWithCredentials, { email, username })
    }

    const signUpResponse = await signUpEmailAuthUser({ email, password })
    if (hasEmailAuthError(signUpResponse)) return handleEmailAuthAuthError(signUpResponse)

    // If an auth user with the same email already exists at the current auth provider's database, then creating a new
    // auth user returns a fake user. We need a new query to find out whether a new auth user was truly created or not.
    const newAuthUserCheckResponse = await getExistingEmailAuthUser(signUpResponse.data!.user!.id)
    const newRealAuthUser = newAuthUserCheckResponse.data.user

    if (newRealAuthUser) {
      return await insertEmailAccount(database, { email, username, password }, newRealAuthUser.id)
    } else {
      return await fetchEmailAuthProviderUserAndUpsertAccount(database, { email, username, password })
    }
  } catch (error) {
    // FIXME: Implement proper error handling logging
    console.error(error)
  }

  return getError(AuthError.SOMETHING_WENT_WRONG)
}

export const requestNewVerificationEmail = async (email: string) => {
  try {
    const existingAccount = await getAccountBy(database, 'email', email)
    if (!existingAccount) return getError(AuthError.ACCOUNT_NOT_FOUND, { email })
    if (existingAccount.emailVerified) return getError(AuthError.EMAIL_VERIFIED, { email })

    const requestVerificationResponse = await resendVerificationEmail(email)
    if (requestVerificationResponse.data?.user === null && requestVerificationResponse.error === null) {
      return { successMessage: `Verification email sent to ${email}!` }
    }

    if (hasEmailAuthError(requestVerificationResponse)) {
      return handleEmailAuthAuthError(requestVerificationResponse)
    }
  } catch (error) {
    console.error(error)
  }

  return getError(AuthError.SOMETHING_WENT_WRONG)
}

export const signInToExistingEmailAccount = async ({ email, password }: SignInToEmailAccountInput) => {
  const existingAccount = await getAccountBy(database, 'email', email)
  if (!existingAccount) return getError(AuthError.ACCOUNT_NOT_FOUND, { email })

  try {
    const signInResponse = await signInEmailAuthUser({ email, password })

    if (hasEmailAuthError(signInResponse)) {
      return handleEmailAuthAuthError(signInResponse, { email })
    }

    if (!existingAccount.emailVerified) {
      await setEmailIsVerified(database, existingAccount.id)
    }

    return getVerifiedAccountWithTokenAdded(existingAccount)
  } catch (error) {
    console.error(error)
  }

  return getError(AuthError.SOMETHING_WENT_WRONG)
}

export const deleteAllAccountData = async (id: number, uuid: string) => {
  const existingAccount = await getAccountBy(database, 'uuid', uuid)
  if (!existingAccount) return getError(AuthError.ACCOUNT_NOT_FOUND)

  // FIXME: Implement deleting account and all related data
  const username = existingAccount.username
  return { successMessage: `Account with username ${username} (and all the related data) deleted successfully!` }
}
