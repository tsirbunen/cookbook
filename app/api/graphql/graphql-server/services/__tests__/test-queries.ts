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
          ${recipeFragment}
        }
      }
    `
  }

  static get patchRecipe(): string {
    return gql`
      mutation patchRecipe($recipeId: Int!, $recipePatch: RecipeInput!) {
        patchRecipe(recipeId: $recipeId, recipePatch: $recipePatch) {
         ${recipeFragment}
        }
      }
    `
  }
}

const recipeFragment = gql`
    id
    title
    description
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
      id
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
      id
      title
      instructions {
        id
        content
        previousId
      }
    }
`
