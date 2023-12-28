export const mutationResolvers = {
  Mutation: {
    pingMutation: (_parent: unknown, _args: unknown, _context: unknown) => {
      return 'pingMutation'
    }
  }
}
