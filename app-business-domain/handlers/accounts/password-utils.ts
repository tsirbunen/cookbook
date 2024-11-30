import { randomBytes } from 'node:crypto'
import { argon2Verify, argon2id } from 'hash-wasm'

export const getHashedPassword = async (password: string) => {
  const randomBytesSalt = randomBytes(16)

  return await argon2id({
    password,
    salt: randomBytesSalt,
    parallelism: 1,
    iterations: 2,
    memorySize: 19 * 1024,
    hashLength: 32,
    outputType: 'encoded'
  })
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await argon2Verify({
    password,
    hash: hashedPassword
  })
}
