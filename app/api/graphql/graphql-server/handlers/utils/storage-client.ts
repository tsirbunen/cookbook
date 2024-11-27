import assert from 'assert'
import { createClient } from '@supabase/supabase-js'
import { getAdminClientMock, getGeneralClientMock } from '../__tests__/supabase-client-mocks'

export type SupabaseSignUpInput = { email: string; password: string }

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME ?? ''
const appPublicOrigin = process.env.NEXT_PUBLIC_ORIGIN ?? ''

assert(supabaseUrl, 'SUPABASE_URL environment variable is missing!')
assert(supabaseAnonKey, 'SUPABASE_ANON_KEY environment variable is missing!')
assert(supabaseServiceRoleKey, 'SUPABASE_SERVICE_ROLE_KEY environment variable is missing!')

// We need to set a special env variable as the "next dev" command overrides the NODE_ENV variable
// This knowledge is needed so that we can mock the Supabase client if running tests
const isJestTest = process.env.IS_JEST

export const getGeneralClient = () => {
  if (isJestTest) return getGeneralClientMock()
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const getAdminClient = () => {
  if (isJestTest) return getAdminClientMock()
  return createClient(supabaseUrl, supabaseServiceRoleKey)
}

export const createSignedUploadUrl = async (uuid: string) => {
  const supabase = getAdminClient()
  const { data } = await supabase.storage.from(bucketName).createSignedUploadUrl(uuid)
  return data?.signedUrl ?? null
}

export const removePhotos = async (photoIdentifiers: string[]) => {
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
  const { data } = await supabase.storage.from(bucketName).remove(photoIdentifiers)
  return data?.length ?? null
}

export const getExistingEmailAuthUser = async (supabaseId: string) => {
  const client = getAdminClient()
  return await client.auth.admin.getUserById(supabaseId)
}

export const getAllEmailAuthUsers = async () => {
  const client = getAdminClient()
  return await client.auth.admin.listUsers()
}

export const signUpEmailAuthUser = async (signUpInput: SupabaseSignUpInput) => {
  const client = getGeneralClient()

  return await client.auth.signUp({
    email: signUpInput.email,
    password: signUpInput.password,
    options: {
      emailRedirectTo: `${appPublicOrigin}/account`
    }
  })
}

export const signInEmailAuthUser = async (signInInput: SupabaseSignUpInput) => {
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
      emailRedirectTo: `${appPublicOrigin}/account`
    }
  })
}
