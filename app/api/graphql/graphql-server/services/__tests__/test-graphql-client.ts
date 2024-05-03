import * as dotenv from 'dotenv'
dotenv.config()

import { GraphQLClient } from 'graphql-request'

const isGithubTest = !!process.env.IS_GITHUB
const TEST_HOST = isGithubTest ? 'app' : 'localhost'
const TEST_SERVER_URL = `http://${TEST_HOST}:3000`
const TEST_ENDPOINT = `${TEST_SERVER_URL}/api/graphql`

export function getGraphQLClient(token?: string) {
  if (token) {
    return new GraphQLClient(TEST_ENDPOINT, {
      headers: {
        authorization: token
      }
    })
  }
  return new GraphQLClient(TEST_ENDPOINT)
}
