import { createYoga } from 'graphql-yoga'
import { makeSchema } from './graphql-server/make-schema'

const { handleRequest } = createYoga({
  schema: makeSchema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  cors: {
    origin: '*', // 'http://localhost:3000',
    credentials: true,
    methods: ['POST', 'GET', 'OPTIONS']
  }
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
