export const queryResolvers = {
  Query: {
    pingQuery: (_parent: unknown, _args: unknown, _context: unknown) => {
      return 'pong'
    }
  }
}
