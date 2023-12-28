import { mutationResolvers } from '../modules/mutation/mutationResolvers'
import { mutationTypeDefs } from '../modules/mutation/mutationTypeDefs'
import { queryResolvers } from '../modules/query/queryResolvers'
import { queryTypeDefs } from '../modules/query/queryTypeDefs'
import { recipeResolvers } from '../modules/recipe/recipeResolvers'
import { recipeTypeDefs } from '../modules/recipe/recipeTypeDefs'

export const typeDefs = [queryTypeDefs, mutationTypeDefs, recipeTypeDefs]
export const resolvers = [queryResolvers, mutationResolvers, recipeResolvers]
