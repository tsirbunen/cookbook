export const recipeTypeDefs = /* GraphQL */ `
  type Recipe {
    id: Int!
    title: String!
  }

  extend type Query {
    allRecipes: [Recipe]!
  }
`
