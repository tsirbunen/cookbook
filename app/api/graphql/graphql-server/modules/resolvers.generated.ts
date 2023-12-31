/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { pingMutation as Mutation_pingMutation } from './mutation/resolvers/Mutation/pingMutation';
import    { allRecipes as Query_allRecipes } from './recipe/resolvers/Query/allRecipes';
import    { pingQuery as Query_pingQuery } from './query/resolvers/Query/pingQuery';
import    { Recipe } from './recipe/resolvers/Recipe';
    export const resolvers: Resolvers = {
      Query: { allRecipes: Query_allRecipes,pingQuery: Query_pingQuery },
      Mutation: { pingMutation: Mutation_pingMutation },
      
      Recipe: Recipe
    }