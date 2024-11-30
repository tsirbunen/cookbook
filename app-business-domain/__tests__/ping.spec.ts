import { expect } from '@jest/globals'
import { getGraphQLClient } from './test-graphql-client'
import { TestQueries } from './test-queries'

describe('Api connection', () => {
  it('Query "ping" returns a "pong"', async () => {
    const graphQLClient = getGraphQLClient()
    const query = TestQueries.pingQuery
    const response = (await graphQLClient.request(query)) as { pingQuery: string }
    expect(response.pingQuery).toBe('pong')
  })
})
