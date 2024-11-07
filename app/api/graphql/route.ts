import * as dotenv from 'dotenv'
dotenv.config()

import { GraphQLJSON } from 'graphql-scalars'
import { type YogaInitialContext, createSchema, createYoga } from 'graphql-yoga'
import { isAuthenticatedTransformer } from './graphql-server/directives/isAuthenticatedDirective'
import { isAuthorTransformer } from './graphql-server/directives/isAuthorDirective'
import { isValidInputTransformer } from './graphql-server/directives/isValidInput'
import { resolvers } from './graphql-server/modules/resolvers.generated'
import { typeDefs } from './graphql-server/modules/typeDefs.generated'
import { getAuthenticatedUserId } from './graphql-server/services/accounts/token-utils'
import { validator } from './graphql-server/services/validation/validators'

const isProduction = process.env.NODE_ENV === 'production'

export type GraphQLContext = { userId: number | null }

const wrapSchemaWithDirectives = () => {
  const graphQLSchema = createSchema<GraphQLContext>({ typeDefs, resolvers: { ...resolvers, JSON: GraphQLJSON } })
  const directives = [isAuthenticatedTransformer, isAuthorTransformer, isValidInputTransformer]
  return directives.reduce((schema, directive) => directive(schema), graphQLSchema)
}

const getGraphQLContext = async (initialContext: YogaInitialContext) => {
  const token = initialContext.request.headers.get('authorization')?.replace('Bearer ', '')
  return { userId: getAuthenticatedUserId(token) }
}

const { handleRequest } = createYoga<GraphQLContext>({
  schema: wrapSchemaWithDirectives(),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  cors: {
    origin: [
      (isProduction ? process.env.NEXT_PUBLIC_ORIGIN : process.env.NEXT_PUBLIC_ORIGIN_LOCAL) as string,
      process.env.MOBILE_APP_ORIGIN as string
      // Comment in if connecting to app api at Vercel with locally running app image
      // , 'http://localhost:3000'
    ],
    credentials: true,
    methods: ['POST', 'GET', 'OPTIONS']
  },
  context: (initialContext) => getGraphQLContext(initialContext)
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS, validator }
