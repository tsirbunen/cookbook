import { createYoga } from 'graphql-yoga'
import { makeSchema } from './graphql-server/make-schema'

const { handleRequest } = createYoga({
  schema: makeSchema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  cors: {
    origin: process.env.NEXT_PUBLIC_ORIGIN,
    credentials: true,
    methods: ['POST', 'GET', 'OPTIONS']
  }
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
