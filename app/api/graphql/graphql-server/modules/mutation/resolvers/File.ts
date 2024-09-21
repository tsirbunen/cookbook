import { GraphQLScalarType } from 'graphql'
export const File = new GraphQLScalarType({
  name: 'File',
  description: 'File description',
  serialize: (_value) => {
    /* Implement logic to turn the returned value from resolvers to a value that can be sent to clients */
  },
  parseValue: (_value) => {
    /* Implement logic to parse input that was sent to the server as variables */
  },
  parseLiteral: (_ast) => {
    /* Implement logic to parse input that was sent to the server as literal values (string, number, or boolean) */
  }
})
