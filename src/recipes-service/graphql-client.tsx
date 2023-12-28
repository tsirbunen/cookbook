'use client'

import { HttpLink } from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient
} from '@apollo/experimental-nextjs-app-support/ssr'

const URI = 'http://localhost:3000/api/graphql'

// Note: This source was used to get the apollo client up and running:
// https://github.com/apollographql/apollo-client-nextjs

function makeClient() {
  const httpLink = new HttpLink({
    uri: URI,
    fetchOptions: { cache: 'no-store' }
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: httpLink
  })
}

export function GraphQLClientProvider({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
