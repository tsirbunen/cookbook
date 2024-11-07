import { gql } from 'graphql-request'

// biome-ignore lint/complexity/noStaticOnlyClass: This class is used to group related queries
export class TestQueries {
  static get pingQuery(): string {
    return gql`
      query pingQuery {
        pingQuery
      }
    `
  }
}
