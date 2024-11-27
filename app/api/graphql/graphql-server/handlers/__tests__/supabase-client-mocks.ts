import type { AuthResponse, User } from '@supabase/supabase-js'
import { emailAccountTestData } from './test-data'

const testUserId = 'JEST TEST USER'
const testUser = { id: testUserId } as User

export const getGeneralClientMock = () => {
  const mockClient = {
    auth: {
      signUp: async () => {
        const testResponse: AuthResponse = { data: { user: testUser, session: null }, error: null }
        return testResponse
      },
      signIn: async () => {
        const testResponse: AuthResponse = { data: { user: testUser, session: null }, error: null }
        return testResponse
      },
      signInWithPassword: async () => {
        const testResponse: AuthResponse = { data: { user: testUser, session: null }, error: null }
        return testResponse
      },
      resend: async () => {
        const testResponse: AuthResponse = { data: { user: testUser, session: null }, error: null }
        return testResponse
      }
    }
  }
  return mockClient
}

export const getAdminClientMock = () => {
  const mockClient = {
    auth: {
      admin: {
        getUserById: async () => {
          const testResponse: AuthResponse = { data: { user: testUser, session: null }, error: null }
          return testResponse
        },
        listUsers: async () => {
          const testUser = { id: testUserId, email: emailAccountTestData.email } as User
          return { data: { users: [testUser] } }
        }
      }
    },
    storage: {
      from: () => {
        return {
          createSignedUploadUrl: async () => {
            return { data: { signedUrl: 'http://mock-signed-url.com' } }
          },
          remove: async () => {
            return { data: { length: 1 } }
          }
        }
      }
    }
  }
  return mockClient
}
