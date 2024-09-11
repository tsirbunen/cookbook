import * as dotenv from 'dotenv'
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './graphql-server/modules/typeDefs.generated'
import { resolvers } from './graphql-server/modules/resolvers.generated'

const { handleRequest } = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
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

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
