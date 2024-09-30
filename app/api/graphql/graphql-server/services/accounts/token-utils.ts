import assert from 'node:assert'
import jwt from 'jsonwebtoken'
import { Account } from '../../modules/types.generated'

type TokenInput = Pick<Account, 'id' | 'uuid' | 'username'>
export type ProviderTokenData = { idAtProvider: string; accessToken: string }

const jwtSecret = process.env.JWT_SECRET
assert(jwtSecret, 'JWT_SECRET environment variable is missing!')

const jwtIssuer = 'cooking-companion-server'
const jwtAudience = 'cooking-companion-account'
const jwtExpirationTimeFromNow = 60 * 60 * 24 * 7 // = 1 week
const jwtExpirationTimeFromNowShort = 60 * 2 // = 2 minutes

export const createJWT = ({ id, uuid, username }: TokenInput) => {
  return jwt.sign(
    {
      data: { id, username },
      sub: uuid,
      iss: jwtIssuer,
      aud: jwtAudience,
      exp: Math.floor(Date.now() / 1000) + jwtExpirationTimeFromNow
    },
    jwtSecret
  )
}

export const createProviderAccessTokenJWT = ({ idAtProvider, accessToken }: ProviderTokenData) => {
  return jwt.sign(
    {
      data: { idAtProvider, accessToken },
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
