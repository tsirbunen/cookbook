'use client'

import { ApolloClient, HttpLink, InMemoryCache, type NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import fetch from 'cross-fetch'
import { createContext, useState } from 'react'

export type GraphQLClient = {
  client: ApolloClient<NormalizedCacheObject>
  setAuthentication: (token: string | null) => void
}

const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

const URI = isProduction ? process.env.NEXT_PUBLIC_API_URI : process.env.NEXT_PUBLIC_API_URI_LOCAL

const getHttpLink = () => {
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

  return httpLink
}

const getClient = () => {
  const graphqlClient = new ApolloClient({
    link: getHttpLink(),
    cache: new InMemoryCache()
  })

  return graphqlClient
}

const getAuthLink = (token: string) => {
  return setContext((_, { headers: _headers }) => {
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })
}

const getAuthenticatedClient = (token: string) => {
  const httpLink = getHttpLink()
  const authLink = getAuthLink(token)
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
}

export const GraphQLClientContext = createContext<GraphQLClient>({} as GraphQLClient)

function GraphQLClientProvider({ children }: React.PropsWithChildren) {
  const [graphqlClient, setGraphqlClient] = useState(getClient())

  const setAuthentication = (token: string | null) => {
    if (!token) {
      setGraphqlClient(getClient())
      return
    }

    const authenticatedClient = getAuthenticatedClient(token)
    setGraphqlClient(authenticatedClient)
  }

  return (
    <GraphQLClientContext.Provider value={{ client: graphqlClient, setAuthentication: setAuthentication }}>
      {children}
    </GraphQLClientContext.Provider>
  )
}

export default GraphQLClientProvider
