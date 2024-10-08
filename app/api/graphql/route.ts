import * as dotenv from 'dotenv'
dotenv.config()

import { GraphQLJSON } from 'graphql-scalars'
import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './graphql-server/modules/typeDefs.generated'
import { resolvers } from './graphql-server/modules/resolvers.generated'
import { validator } from './graphql-server/services/validation/validators'

const isProduction = process.env.NODE_ENV === 'production'

const { handleRequest } = createYoga({
  schema: createSchema({ typeDefs, resolvers: { ...resolvers, JSON: GraphQLJSON } }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  cors: {
    origin: [
      (isProduction ? process.env.NEXT_PUBLIC_ORIGIN : process.env.NEXT_PUBLIC_ORIGIN_LOCAL) as string,
      process.env.MOBILE_APP_ORIGIN as string
      // This is needed when connecting to app api at Vercel with locally running app image
      // 'http://localhost:3000'
    ],
    credentials: true,
    methods: ['POST', 'GET', 'OPTIONS']
  }
})

// We import and export ajv validator here so that we need only compile the schemas once
// when the server starts up.
export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS, validator }
