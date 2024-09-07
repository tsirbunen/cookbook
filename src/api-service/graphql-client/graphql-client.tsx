'use client'

import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { createContext } from 'react'
import fetch from 'cross-fetch'

export type GraphQLClient = {
  client: ApolloClient<NormalizedCacheObject>
}

const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

const URI = isProduction ? process.env.NEXT_PUBLIC_API_URI : process.env.NEXT_PUBLIC_API_URI_LOCAL

// Note: Running the tests requires that a fetch is passed to the HttpLink.
const httpLink = isTest
  ? new HttpLink({
      uri: URI,
      fetch
    })
  : new HttpLink({
      uri: URI,
      fetchOptions: { cache: 'no-store' }
    })

const graphqlClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export const GraphQLClientContext = createContext<GraphQLClient>({} as GraphQLClient)

function GraphQLClientProvider({ children }: React.PropsWithChildren) {
  return <GraphQLClientContext.Provider value={{ client: graphqlClient }}>{children}</GraphQLClientContext.Provider>
}

export default GraphQLClientProvider
