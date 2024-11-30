import { expect } from '@jest/globals'
import { emailAccountTestData } from './test-data'
import { getGraphQLClient } from './test-graphql-client'
import { TestMutations } from './test-mutations'
import { AccountResult,  IdentityProvider } from '../../app-ui/types/graphql-schema-types.generated'
import { BadInputError, Account } from '../../app/api/graphql/graphql-server/modules/types.generated'
import { getHashedPassword } from '../handlers/accounts/password-utils'
import { clearDatabase } from '../../app-datastore/utils/clear-database'
import { client, database } from '../../app-datastore/config/config'
import { createEmailAccount } from '../../app-datastore/utils/insert-data-to-database'

describe('Handle accounts', () => {
  beforeEach(async () => {
    await clearDatabase(database)
  })

  it('New email account can be created with proper username, email and password', async () => {
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

  it('Create new email account fails if an input field value is missing', async () => {
    const invalidInputs = [
      {
        invalidInput: { username: 'Username', email: 'email' },
        expectedErrorContents: ['password', 'required type', 'not provided']
      },
      {
        invalidInput: { username: 'Username', password: 'password' },
        expectedErrorContents: ['email', 'required type', 'not provided']
      },
      {
        invalidInput: { email: 'email', password: 'password' },
        expectedErrorContents: ['username', 'required type', 'not provided']
      }
    ]

    const mutation = TestMutations.createEmailAccount
    const graphQLClient = getGraphQLClient()
    for await (const { invalidInput, expectedErrorContents } of invalidInputs) {
      try {
        await graphQLClient.request(mutation, {
          emailAccountInput: invalidInput
        })
      } catch (error) {
        const errorMessage = (error as unknown as { message: string }).message.toString()
        for (const item of expectedErrorContents) {
          expect(errorMessage).toContain(item)
        }
      }
    }
  })

  it('Create new email account fails if an input field value is invalid', async () => {
    const invalidInputs = [
      {
        invalidInput: { username: 'u', email: 'email@emailple.com', password: 'passwordP1' },
        expectedErrorContents: ['username']
      },
      {
        invalidInput: { username: 'uuuuuuuuuuuuuuuuuuuuuuu', email: 'email@.com', password: 'passwordP1' },
        expectedErrorContents: ['username', 'email']
      },
      {
        invalidInput: { username: 'Username', email: 'email@em', password: 'pasP1' },
        expectedErrorContents: ['email', 'password']
      },
      {
        invalidInput: { username: 'Username', email: 'email@emailple.com', password: 'ppppppppP' },
        expectedErrorContents: ['password']
      },
      {
        invalidInput: { username: 'u', email: 'email.com', password: 'ppp' },
        expectedErrorContents: ['username', 'email', 'password']
      }
    ]

    const mutation = TestMutations.createEmailAccount
    const graphQLClient = getGraphQLClient()
    for await (const { invalidInput, expectedErrorContents } of invalidInputs) {
      const response = (await graphQLClient.request(mutation, {
        emailAccountInput: invalidInput
      })) as { createEmailAccount: BadInputError }

      expect(response.createEmailAccount.__typename).toBe('BadInputError')
      const errorMessage = response.createEmailAccount.errorMessage.toLowerCase()
      for (const item of expectedErrorContents) {
        expect(errorMessage).toContain(item)
      }
    }
  })

  afterAll(async () => {
    await client.end()
  })
})
