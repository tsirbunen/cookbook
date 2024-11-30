import { RecipeHandler } from '../../../../../../../../app-business-domain/handlers/recipes/handler'
import type { GraphQLContext } from '../../../../../route'
import type { QueryResolvers } from '../../../types.generated'

export const allRecipes: NonNullable<QueryResolvers['allRecipes']> = async (_parent, _arg, context: GraphQLContext) => {
  const handler = new RecipeHandler(context.dataStore)
  return await handler.getAllPublicAndUsersOwnRecipes(context.userId)
}
