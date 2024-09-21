import assert from 'node:assert'
import jwt from 'jsonwebtoken'
import { Account } from '../../modules/types.generated'

type TokenInput = Pick<Account, 'id' | 'uuid' | 'username'>

const jwtSecret = process.env.JWT_SECRET
assert(jwtSecret, 'JWT_SECRET environment variable is missing!')

const jwtIssuer = 'cooking-companion-server'
const jwtAudience = 'cooking-companion-account'
const jwtExpirationTimeFromNow = 60 * 60 * 24 * 7 // = 1 week

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

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, jwtSecret, { issuer: jwtIssuer, audience: jwtAudience })
  return decoded
}
