import { mutationResolvers } from './modules/mutation/mutationResolvers'
import { mutationTypeDefs } from './modules/mutation/mutationTypeDefs'
import { queryResolvers } from './modules/query/queryResolvers'
import { queryTypeDefs } from './modules/query/queryTypeDefs'

export const typeDefs = [queryTypeDefs, mutationTypeDefs]
export const resolvers = [queryResolvers, mutationResolvers]
