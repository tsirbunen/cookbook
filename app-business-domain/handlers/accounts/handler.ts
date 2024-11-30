import * as dotenv from 'dotenv'
dotenv.config()

import {
  getAllEmailAuthUsers,
  getExistingEmailAuthUser,
  resendVerificationEmail,
  signInEmailAuthUser,
  signUpEmailAuthUser
} from '../utils/storage-client'
import {
  type Account,
  type DeleteAccountInput,
  type EmailAccountInput,
  type EmailInput,
  IdentityProvider,
  type NonEmailAccountInput,
  type SignInToEmailAccountInput
} from '../../types-and-interfaces/types'
import { DataStore } from '../../../app-datastore/data-stores/data-store'
import {
  AuthError,
  getError,
  handleEmailAuthAuthError,
  handleSignUpCredentialsTakenError,
  hasEmailAuthError
} from './error-utils'
import { getAndVerifyGitHubUser } from './github-utils'
import { getHashedPassword } from './password-utils'
import { createJWT, verifyJWT } from './token-utils'

export class AccountHandler {
  dataStore: DataStore

  constructor(db: DataStore) {
    this.dataStore = db
  }

  async getAccountByToken(token: string) {
    return await this.dataStore.withinTransaction(async () => {
      try {
        const decodedToken = verifyJWT(token) as { data: { id: string; identityProvider: IdentityProvider } }
        const { id, identityProvider } = decodedToken.data

        const account = await this.dataStore.getAccountBy('id', id)
        if (account) {
          const isEmailAccount = identityProvider === IdentityProvider.EMAIL
          return isEmailAccount
            ? this.getVerifiedAccountWithTokenAdded(account)
            : this.getAccountWithTokenAdded({ ...account, identityProvider })
        }
      } catch (error) {
        return getError(AuthError.SOMETHING_WENT_WRONG)
      }
    })
  }

  async createNewNonEmailAccount({ username, token, identityProvider }: NonEmailAccountInput) {
    const actions = async () => {
      try {
        const idAtProvider = await this.getAndVerifyIdAtProvider(token, identityProvider)

        const accountsWithCredentials = await this.dataStore.getExistingAccounts({ idAtProvider, username })
        if (accountsWithCredentials?.length) {
          return handleSignUpCredentialsTakenError(accountsWithCredentials, {
            username,
            idAtProvider,
            identityProvider
          })
        }

        const newAccount = await this.dataStore.insertNonEmailAccount(username, idAtProvider, identityProvider)

        return this.getAccountWithTokenAdded({ ...newAccount, identityProvider })
      } catch (error) {
        // FIXME: Implement proper error handling logging
        console.error(error)
      }

      return getError(AuthError.SOMETHING_WENT_WRONG)
    }

    return await this.dataStore.withinTransaction(actions)
  }

  async getAndVerifyIdAtProvider(token: string, identityProvider: IdentityProvider) {
    switch (identityProvider) {
      case 'GITHUB':
        return await getAndVerifyGitHubUser(token)
      default:
        return null
    }
  }

  async createNewEmailAccount({ email, password, username }: EmailAccountInput) {
    const actions = async () => {
      try {
        const accountsWithCredentials = await this.dataStore.getExistingAccounts({ email, username })
        if (accountsWithCredentials?.length) {
          return handleSignUpCredentialsTakenError(accountsWithCredentials, { email, username })
        }

        const signUpResponse = await signUpEmailAuthUser({ email, password })
        if (hasEmailAuthError(signUpResponse)) return handleEmailAuthAuthError(signUpResponse)

        // If an auth user with the same email already exists at the current auth provider's database, then creating a new
        // auth user returns a fake user. We need a new query to find out whether a new auth user was truly created or not.
        const newAuthUserCheckResponse = await getExistingEmailAuthUser(
          (signUpResponse as { data: { user: { id: string } } }).data.user.id
        )
        const newRealAuthUser = newAuthUserCheckResponse.data.user

        if (newRealAuthUser) {
          // Note: Currently we use the free email authentication provider to check the passwords. However, we might run out of
          // free API calls at some point. So let's hash and store the password in case we need to start checking the passwords
          // ourselves.
          const passwordHash = await getHashedPassword(password)
          return await this.dataStore.insertEmailAccount(
            { email, username, password },
            newRealAuthUser.id,
            passwordHash
          )
        }

        return await this.fetchEmailAuthProviderUserAndUpsertAccount({ email, username, password })
      } catch (error) {
        // FIXME: Implement proper error handling logging
        console.error(error)
      }

      return getError(AuthError.SOMETHING_WENT_WRONG)
    }

    return await this.dataStore.withinTransaction(actions)
  }

  async fetchEmailAuthProviderUserAndUpsertAccount({ email, password, username }: EmailAccountInput) {
    // Else an account with the same email did already exist at the email provider's auth database
    // and a fake user was first returned to us. As an existing account was not found in this app's
    // database, we need to create one. First we need to verify that the password provided in the input is correct.
    // We cannot attempt to sign in directly because the email might not be verified yet. So we need to query details
    // of the user to create an account in this app's database. The current email provider's auth database
    // does not support querying a single user by email, only all users can be queried.
    const usersListData = await getAllEmailAuthUsers()
    const authAccount = usersListData.data.users.find((user) => user.email === email)
    if (authAccount) {
      // If the account is found at the provider's auth database, then we need to try to sign in to that account
      // with the password provided in the input to verify that the password is correct before saving the hashed
      // password to this app's database.
      const signInResponse = await signInEmailAuthUser({ email, password })
      const idAtProvider = signInResponse.data?.user?.id

      if (idAtProvider) {
        const passwordHash = await getHashedPassword(password)
        return await this.dataStore.insertEmailAccount({ email, password, username }, idAtProvider, passwordHash)
      }
    }

    return getError(AuthError.SOMETHING_WENT_WRONG)
  }

  async requestNewVerificationEmail({ email }: EmailInput) {
    const actions = async () => {
      try {
        const existingAccount = await this.dataStore.getAccountBy('email', email)
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

    return await this.dataStore.withinTransaction(actions)
  }

  async signInToExistingEmailAccount({ email, password }: SignInToEmailAccountInput) {
    const actions = async () => {
      const existingAccount = await this.dataStore.getAccountBy('email', email)
      if (!existingAccount) return getError(AuthError.ACCOUNT_NOT_FOUND, { email })

      try {
        const signInResponse = await signInEmailAuthUser({ email, password })

        if (hasEmailAuthError(signInResponse)) {
          return handleEmailAuthAuthError(signInResponse, { email })
        }

        if (!existingAccount.emailVerified) {
          await this.dataStore.setEmailIsVerified(existingAccount.id)
        }

        return this.getVerifiedAccountWithTokenAdded({
          ...existingAccount,
          identityProvider: IdentityProvider.EMAIL
        })
      } catch (error) {
        console.error(error)
      }

      return getError(AuthError.SOMETHING_WENT_WRONG)
    }

    return await this.dataStore.withinTransaction(actions)
  }


  // async signInToExistingEmailAccount({ email, password }: SignInToEmailAccountInput) {
  //   const actions = async () => {
  //     // const existingAccount = await this.dataStore.getAccountBy('email', email)
  //     // if (!existingAccount) return getError(AuthError.ACCOUNT_NOT_FOUND, { email })

  //     try {
  //       const signInResponse = await signInEmailAuthUser({ email, password })

  //       if (hasEmailAuthError(signInResponse)) {
  //         return handleEmailAuthAuthError(signInResponse, { email })
  //       }

  //       // if (!existingAccount.emailVerified) {
  //       //   await this.dataStore.setEmailIsVerified(existingAccount.id)
  //       // }

  //       const username = 'tsirbunen'
  //       const user = signInResponse.data.user
  //       if (!user) return getError(AuthError.ACCOUNT_NOT_FOUND, { email })
  //       const passwordHash = await getHashedPassword(password)
  //       const account = await this.dataStore.insertEmailAccount({ email, username, password }, user.id, passwordHash)

  //       return this.getVerifiedAccountWithTokenAdded({
  //         ...account,
  //         identityProvider: IdentityProvider.EMAIL
  //       })
  //     } catch (error) {
  //       console.error(error)
  //     }

  //     return getError(AuthError.SOMETHING_WENT_WRONG)
  //   }

  //   return await this.dataStore.withinTransaction(actions)
  // }

  async deleteAllAccountData({ id: _, uuid }: DeleteAccountInput) {
    const actions = async () => {
      const existingAccount = await this.dataStore.getAccountBy('uuid', uuid)
      if (!existingAccount) return getError(AuthError.ACCOUNT_NOT_FOUND)

      // FIXME: Implement deleting account and all related data
      const username = existingAccount.username
      return { successMessage: `Account with username ${username} (and all the related data) deleted successfully!` }
    }

    return await this.dataStore.withinTransaction(actions)
  }

  getAccountWithTokenAdded({ id, uuid, username, identityProvider }: Account) {
    const token = createJWT({ id, uuid, username, identityProvider })

    return { id, uuid, username, token, identityProvider }
  }

  getVerifiedAccountWithTokenAdded({ id, uuid, username, email }: Account) {
    const identityProvider = IdentityProvider.EMAIL
    const token = createJWT({ id, uuid, username, identityProvider })

    return { id, uuid, username, email, emailVerified: true, token, identityProvider }
  }
}
