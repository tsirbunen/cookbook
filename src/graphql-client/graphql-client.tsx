'use client'

// This is the recommended way to use the client, but it turned out to be a little difficult to control.

// import { HttpLink } from '@apollo/client'
// import {
//   ApolloNextAppProvider,
//   NextSSRInMemoryCache,
//   NextSSRApolloClient
// } from '@apollo/experimental-nextjs-app-support/ssr'

// const URI =
//   process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URI : process.env.NEXT_PUBLIC_API_URI_LOCAL

// Note: This source was used to get the apollo client up and running:
// https://github.com/apollographql/apollo-client-nextjs

// function makeClient() {
//   const httpLink = new HttpLink({
//     uri: URI,
//     fetchOptions: { cache: 'no-store' }
//   })

//   return new NextSSRApolloClient({
//     cache: new NextSSRInMemoryCache(),
//     link: httpLink
//   })
// }

// export function GraphQLClientProvider({ children }: React.PropsWithChildren) {
//   return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
// }

// This would be the "manual" alternative to querying that provides a client with which we can
// perform queries at will. Change to this if it becomes too difficult with the above
// approach with the "automatic useQuery"-approach.
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { createContext } from 'react'

export type GraphQLClient = {
  client: ApolloClient<NormalizedCacheObject>
}

const URI =
  process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URI : process.env.NEXT_PUBLIC_API_URI_LOCAL

const httpLink = new HttpLink({
  uri: URI
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
