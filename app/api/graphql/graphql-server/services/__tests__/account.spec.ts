import { client, database } from '../../database/config/config'
import { expect } from '@jest/globals'
import { getGraphQLClient } from './test-graphql-client'
import { clearDatabase } from '../../database/utils/clear-database.js'
import { Account } from '../../modules/types.generated'
import { emailAccountTestData } from './test-data'
import { TestMutations } from './test-mutations'
import { AccountResult, IdentityProvider } from '../../../../../../src/types/graphql-schema-types.generated'
import { createEmailAccount } from '../../database/utils/insert-data-to-database'
import { getHashedPassword } from '../accounts/password-utils'

describe('Handle accounts', () => {
  beforeEach(async () => {
    await clearDatabase(database)
  })

  it('New email account can be created with proper email and password', async () => {
    const mutation = TestMutations.createEmailAccount
    const graphQLClient = getGraphQLClient()
    const createAccountResponse = (await graphQLClient.request(mutation, {
      emailAccountInput: emailAccountTestData
    })) as { createEmailAccount: AccountResult }
    const newAccount = createAccountResponse.createEmailAccount as Account
    expect(newAccount.__typename).toBe('Account')
    expect(newAccount.id).toBeDefined()
    expect(newAccount.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(newAccount.email).toBe(emailAccountTestData.email)
    expect(newAccount.token).toBeNull()
    expect(newAccount.username).toBe(emailAccountTestData.username)
    expect(newAccount.emailVerified).toBeFalsy()
    expect(newAccount.identityProvider).toBe(IdentityProvider.Email)
  })

  it('User can sign in to an email account with proper email and password', async () => {
    const passwordHash = await getHashedPassword(emailAccountTestData.password)
    const accountInDB = await createEmailAccount(database, { ...emailAccountTestData, passwordHash })

    const mutation = TestMutations.signInToEmailAccount
    const graphQLClient = getGraphQLClient()
    const signInResponse = (await graphQLClient.request(mutation, {
      signInToEmailAccountInput: { email: emailAccountTestData.email, password: emailAccountTestData.password }
    })) as { signInToEmailAccount: AccountResult }
    const account = signInResponse.signInToEmailAccount as Account

    expect(account.__typename).toBe('Account')
    expect(account.id).toBe(accountInDB.id)
    expect(account.uuid).toMatch(accountInDB.uuid)
    expect(account.email).toBe(emailAccountTestData.email)
    expect(account.token).toBeDefined()
    expect(account.username).toBe(emailAccountTestData.username)
    expect(account.emailVerified).toBeTruthy()
    expect(account.identityProvider).toBe(IdentityProvider.Email)
  })

  afterAll(async () => {
    await client.end()
  })
})
