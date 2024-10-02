import { gql } from 'graphql-request'

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
