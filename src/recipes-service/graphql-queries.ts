import { gql } from '@apollo/client'

export const pingQueryQuery = gql`
  query QueryPing {
    pingQuery
  }
`

export const allRecipesQuery = gql`
  query AllRecipes {
    allRecipes {
      id
      title
    }
  }
`
