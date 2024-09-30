import { createClient } from '@supabase/supabase-js'
import assert from 'assert'

type SupabaseInput = { email: string; password: string }

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

assert(supabaseUrl, 'SUPABASE_URL environment variable is missing!')
assert(supabaseAnonKey, 'SUPABASE_ANON_KEY environment variable is missing!')
assert(supabaseServiceRoleKey, 'SUPABASE_SERVICE_ROLE_KEY environment variable is missing!')

const getGeneralClient = () => createClient(supabaseUrl!, supabaseAnonKey!)
const getAdminClient = () => createClient(supabaseUrl!, supabaseServiceRoleKey!)

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
