import { getAllRecipes } from '../../../../services/recipe-service'
import type { QueryResolvers } from '../../../types.generated'

export const allRecipes: NonNullable<QueryResolvers['allRecipes']> = async (_parent, _arg, _ctx) => {
  const allRecipes = await getAllRecipes()
  return allRecipes
}
