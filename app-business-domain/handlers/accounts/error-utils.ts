import type { AuthResponse } from '@supabase/supabase-js'
import type { IdentityProvider } from '../../../app/api/graphql/graphql-server/modules/types.generated'

// IMPORTANT: These are error messages that can be returned by the email authentication
// provider. Do NOT change these messages unless the email authentication provider changes them.
const emailRateLimitExceededMessage = 'email rate limit exceeded'
const emailNotConfirmedMessage = 'email not confirmed'
const invalidCredentialsMessage = 'invalid login credentials'
const emailRateErrorCode = 'over_email_send_rate_limit'
const emailNotConfirmedErrorCode = 'email_not_confirmed'

export enum AuthError {
  SOMETHING_WENT_WRONG = 'SOMETHING_WENT_WRONG',
  EMAIL_TAKEN = 'EMAIL_TAKEN',
  USERNAME_TAKEN = 'USERNAME_TAKEN',
  ID_AT_PROVIDER_TAKEN = 'ID_AT_PROVIDER_TAKEN',
  ID_AT_PROVIDER_AND_USERNAME_TAKEN = 'ID_AT_PROVIDER_AND_USERNAME_TAKEN',
  EMAIL_AND_USERNAME_TAKEN = 'EMAIL_AND_USERNAME_TAKEN',
  EMAIL_VERIFIED = 'EMAIL_VERIFIED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  VERIFICATION_EMAIL_SENT = 'VERIFICATION_EMAIL_SENT',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  EMAIL_RATE_LIMIT_EXCEEDED = 'EMAIL_RATE_LIMIT_EXCEEDED',
  ACCOUNT_NOT_FOUND = 'ACCOUNT_NOT_FOUND'
}

export const hasEmailAuthError = (authResponse: AuthResponse) => {
  return authResponse.error || !authResponse.data?.user
}

export const handleSignUpCredentialsTakenError = async (
  existingAccounts: { username?: string; email?: string | null; idAtProvider?: string | null }[],
  {
    email,
    username,
    idAtProvider,
    identityProvider
  }: { username?: string; email?: string | null; idAtProvider?: string | null; identityProvider?: IdentityProvider }
) => {
  const emailTaken = email && existingAccounts.some((account) => account.email === email)
  const usernameTaken = username && existingAccounts.some((account) => account.username === username)
  const idAtProviderTaken = idAtProvider && existingAccounts.some((account) => account.idAtProvider === idAtProvider)

  if (emailTaken && usernameTaken) {
    return getError(AuthError.EMAIL_AND_USERNAME_TAKEN, { email, username })
  }

  if (idAtProviderTaken && usernameTaken && identityProvider) {
    return getError(AuthError.ID_AT_PROVIDER_AND_USERNAME_TAKEN, { username, identityProvider })
  }

  if (emailTaken) {
    return getError(AuthError.EMAIL_TAKEN, { email })
  }

  if (usernameTaken) {
    return getError(AuthError.USERNAME_TAKEN, { username })
  }

  if (idAtProviderTaken && identityProvider) {
    return getError(AuthError.ID_AT_PROVIDER_TAKEN, { identityProvider })
  }

  return getError(AuthError.SOMETHING_WENT_WRONG)
}

export const handleEmailAuthAuthError = (authResponse: AuthResponse, options?: { email: string }) => {
  const { error } = authResponse
  if (error) {
    console.error(error)
  }

  const errorMessage = error?.message?.toLowerCase()

  const emailRateLimitExceeded = errorMessage?.includes(emailRateLimitExceededMessage)
  if (emailRateLimitExceeded) {
    return getError(AuthError.EMAIL_RATE_LIMIT_EXCEEDED)
  }

  const accountNotConfirmed =
    errorMessage?.includes(emailNotConfirmedMessage) || error?.code === emailNotConfirmedErrorCode
  if (accountNotConfirmed) {
    return getError(AuthError.EMAIL_NOT_VERIFIED, options?.email ? { email: options?.email } : undefined)
  }

  const invalidCredentials = errorMessage?.includes(invalidCredentialsMessage)
  if (invalidCredentials) {
    return getError(AuthError.INVALID_CREDENTIALS)
  }

  const rateError = error?.code === emailRateErrorCode
  if (rateError) {
    return getError(AuthError.EMAIL_RATE_LIMIT_EXCEEDED)
  }

  return getError(AuthError.SOMETHING_WENT_WRONG)
}

export const getError = (error: AuthError, params?: Record<string, string>) => {
  let errorMessage: string
  // FIXME: Find a better way tho check to the presence of possibly required params. Until then,
  // create all error messages using params replacement so that the messages make sense
  // even if the params are not provided.
  switch (error) {
    case AuthError.SOMETHING_WENT_WRONG:
      errorMessage = 'Something went wrong! Please try again later.'
      break
    case AuthError.EMAIL_TAKEN:
      errorMessage = `Account with ${extractEmail(params)} already exists! Please come up with another email.`
      break
    case AuthError.USERNAME_TAKEN:
      errorMessage = `Account with ${extractUsername(params)} already exists! Please come up with another username.`
      break
    case AuthError.ID_AT_PROVIDER_TAKEN:
      errorMessage = `Account created with ${params?.identityProvider} login already exists!`
      break
    case AuthError.ID_AT_PROVIDER_AND_USERNAME_TAKEN:
      errorMessage = `Account created with ${
        params?.identityProvider
      } login already exists! Also an account with ${extractUsername(
        params
      )} already exists! Please come up with another username.`
      break
    case AuthError.EMAIL_AND_USERNAME_TAKEN: {
      const credentials = extractEmailAndUsername(params)
      errorMessage = `Account(s) with ${credentials} already exist! Please come up with another email and username.`
      break
    }
    case AuthError.EMAIL_VERIFIED:
      errorMessage = `Account with ${extractEmail(params)} has already been verified! Please just sign in.`
      break
    case AuthError.VERIFICATION_EMAIL_SENT:
      errorMessage = `Verification email has already been sent to ${extractEmail(params)}! Please check your email box.`
      break
    case AuthError.EMAIL_NOT_VERIFIED:
      errorMessage = `Seems that ${extractEmail(
        params
      )} has not been verified! You need to verify your email before you can sign in. You can request a new verification email, if needed.`
      break
    case AuthError.INVALID_CREDENTIALS:
      errorMessage = 'Invalid email or password or both! Please try again.'
      break
    case AuthError.EMAIL_RATE_LIMIT_EXCEEDED:
      errorMessage =
        'The free emailing service this app uses is temporarily out of free emails. Please try again after about a minute.'
      break
    case AuthError.ACCOUNT_NOT_FOUND:
      errorMessage = params?.email
        ? `Account with email ${params?.email} could not be found! Please move on to another account.`
        : 'The account could not be found!'
      break
    default:
      errorMessage = 'Something went wrong! Please try again later.'
  }

  return { errorMessage }
}

const extractEmail = (params?: Record<string, string>) => {
  return params?.email ? `email ${params.email}` : 'the email you provided'
}

const extractUsername = (params?: Record<string, string>) => {
  return params?.username ? `username ${params.username}` : 'the username you provided'
}

const extractEmailAndUsername = (params?: Record<string, string>) => {
  return params?.email && params?.username
    ? `email ${params?.email} and username ${params?.username}`
    : 'the email and username you provided'
}
