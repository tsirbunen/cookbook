import { getAllRecipes } from './recipeService'

export const recipeResolvers = {
  Query: {
    allRecipes: async (_parent: unknown, _args: unknown, _context: unknown) => {
      const allRecipes = await getAllRecipes()
      return allRecipes
    }
  }
}
