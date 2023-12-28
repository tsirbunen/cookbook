import { createYoga } from 'graphql-yoga'
import { makeGraphQLSchema } from './graphql-server/graphql-schema/make-graphql-schema'

const { handleRequest } = createYoga({
  schema: makeGraphQLSchema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  cors: {
    origin: process.env.NEXT_PUBLIC_ORIGIN,
    credentials: true,
    methods: ['POST', 'GET', 'OPTIONS']
  }
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
