import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './graphql-server/modules/typeDefs.generated'
import { resolvers } from './graphql-server/modules/resolvers.generated'

const { handleRequest } = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  cors: {
    origin: process.env.NEXT_PUBLIC_ORIGIN,
    credentials: true,
    methods: ['POST', 'GET', 'OPTIONS']
  }
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
