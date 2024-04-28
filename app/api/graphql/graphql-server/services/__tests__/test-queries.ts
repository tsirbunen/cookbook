import { gql } from 'graphql-request'

export class TestQueries {
  static get pingQuery(): string {
    return gql`
      query pingQuery {
        pingQuery
      }
    `
  }

  static get createRecipe(): string {
    return gql`
      mutation createRecipe($recipeInput: RecipeInput!) {
        createRecipe(recipeInput: $recipeInput) {
          id
          title
          language {
            id
            language
          }
          photos {
            id
            url
            isMainPhoto
          }
          tags {
            id
            tag
          }
          ovenNeeded
          ingredientGroups {
            title
            ingredients {
              id
              amount
              unit
              name
              previousId
            }
          }
          instructionGroups {
            title
            instructions {
              id
              content
              previousId
            }
          }
        }
      }
    `
  }
}
