import assert from 'node:assert'
import jwt from 'jsonwebtoken'
import type { Account } from '../../modules/types.generated'
import type { IdentityProvider } from '../types-and-interfaces/types'

type TokenInput = Pick<Account, 'id' | 'uuid' | 'username' | 'identityProvider'>
export type ProviderTokenData = { identityProvider: IdentityProvider; idAtProvider: string; accessToken: string }

const jwtSecret = process.env.JWT_SECRET ?? 'fake secret'
assert(jwtSecret, 'JWT_SECRET environment variable is missing!')

const jwtIssuer = 'cooking-companion-server'
const jwtAudience = 'cooking-companion-account'
const jwtExpirationTimeFromNow = 60 * 60 * 24 * 7 // = 1 week
const jwtExpirationTimeFromNowShort = 60 * 2 // = 2 minutes

export const createJWT = ({ id, uuid, username, identityProvider }: TokenInput) => {
  return jwt.sign(
    {
      data: { id, username, identityProvider },
      sub: uuid,
      iss: jwtIssuer,
      aud: jwtAudience,
      exp: Math.floor(Date.now() / 1000) + jwtExpirationTimeFromNow
    },
    jwtSecret
  )
}

export const createProviderAccessTokenJWT = ({ identityProvider, idAtProvider, accessToken }: ProviderTokenData) => {
  return jwt.sign(
    {
      data: { identityProvider, idAtProvider, accessToken },
      sub: idAtProvider,
      iss: jwtIssuer,
      aud: jwtAudience,
      exp: Math.floor(Date.now() / 1000) + jwtExpirationTimeFromNowShort
    },
    jwtSecret
  )
}

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, jwtSecret, { issuer: jwtIssuer, audience: jwtAudience })
  return decoded
}

export const getAuthenticatedUserId = (token?: string) => {
  if (!token) return null

  const decodedToken = verifyJWT(token) as { data: { id: number } }
  return decodedToken.data.id
}
