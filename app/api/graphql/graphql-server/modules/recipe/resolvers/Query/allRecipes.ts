import type { GraphQLContext } from '../../../../../route'
import { getAllPublicAndUsersOwnRecipes } from '../../../../services/recipes/service'
import type { QueryResolvers } from '../../../types.generated'

export const allRecipes: NonNullable<QueryResolvers['allRecipes']> = async (_parent, _arg, context: GraphQLContext) => {
  const { userId } = context
  const allRecipes = await getAllPublicAndUsersOwnRecipes(userId)
  return allRecipes
}
