import assert from 'assert'
import { createClient } from '@supabase/supabase-js'
import { getAdminClientMock, getGeneralClientMock } from '../__tests__/supabase-client-mocks'

type SupabaseInput = { email: string; password: string }

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

assert(supabaseUrl, 'SUPABASE_URL environment variable is missing!')
assert(supabaseAnonKey, 'SUPABASE_ANON_KEY environment variable is missing!')
assert(supabaseServiceRoleKey, 'SUPABASE_SERVICE_ROLE_KEY environment variable is missing!')

// We need to set a special env variable as the "next dev" command overrides the NODE_ENV variable
// This knowledge is needed so that we can mock the Supabase client if running tests
const isJestTest = process.env.IS_JEST

const getGeneralClient = () => {
  if (isJestTest) return getGeneralClientMock()
  return createClient(supabaseUrl, supabaseAnonKey)
}

const getAdminClient = () => {
  if (isJestTest) return getAdminClientMock()
  return createClient(supabaseUrl, supabaseServiceRoleKey)
}

export const getExistingEmailAuthUser = async (supabaseId: string) => {
  const client = getAdminClient()
  return await client.auth.admin.getUserById(supabaseId)
}

export const getAllEmailAuthUsers = async () => {
  const client = getAdminClient()
  return await client.auth.admin.listUsers()
}

export const signUpEmailAuthUser = async (signUpInput: SupabaseInput) => {
  const client = getGeneralClient()

  return await client.auth.signUp({
    email: signUpInput.email,
    password: signUpInput.password,
    options: {
      // FIXME: Change this to the actual redirect URL
      emailRedirectTo: 'http://localhost:3000/account'
    }
  })
}

export const signInEmailAuthUser = async (signInInput: SupabaseInput) => {
  const client = getGeneralClient()

  return await client.auth.signInWithPassword({
    email: signInInput.email,
    password: signInInput.password
  })
}

export const resendVerificationEmail = async (email: string) => {
  const client = getGeneralClient()

  return await client.auth.resend({
    type: 'signup',
    email: email,
    options: {
      // FIXME: Change this to the actual redirect URL
      emailRedirectTo: 'http://localhost:3000/account'
    }
  })
}
