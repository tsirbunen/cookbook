import { gql } from 'graphql-request'

// biome-ignore lint/complexity/noStaticOnlyClass: This class is used to group related queries
export class TestMutations {
  static get createEmailAccount(): string {
    return gql`
      mutation createEmailAccount($emailAccountInput: EmailAccountInput!) {
        createEmailAccount(emailAccountInput: $emailAccountInput) {
         ${accountResultFragment}
        }
      }
    `
  }

  static get signInToEmailAccount(): string {
    return gql`
      mutation signInToEmailAccount($signInToEmailAccountInput: SignInToEmailAccountInput!) {
        signInToEmailAccount(signInToEmailAccountInput: $signInToEmailAccountInput) {
         ${accountResultFragment}
        }
      }
    `
  }

  static get createRecipe(): string {
    return gql`
      mutation createRecipe($createRecipeInput: CreateRecipeInput!) {
        createRecipe(createRecipeInput: $createRecipeInput) {
          ${recipeResult}
        }
      }
    `
  }

  static get patchRecipe(): string {
    return gql`
      mutation patchRecipe($recipeId: Int!, $recipePatch: PatchRecipeInput!) {
        patchRecipe(recipeId: $recipeId, recipePatch: $recipePatch) {
         ${recipeResult}
        }
      }
    `
  }
}

const accountResultFragment = gql`
  __typename
  ... on Account {
    id
    uuid
    username
    token
    email
    emailVerified
    identityProvider
  }

  ... on BadInputError {
    errorMessage
  }
`

const recipeFragment = gql`
    id
    authorId
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

const recipeResult = gql`
   __typename
   ... on Recipe {
     ${recipeFragment}
   }
  
   ... on UnauthenticatedError {
     errorMessage
   }

   ... on UnauthorizedError {
     errorMessage
   }

   ... on BadInputError {
     errorMessage
   }
`
