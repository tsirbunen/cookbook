/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { Ingredient } from './recipe/resolvers/Ingredient';
import    { IngredientGroup } from './recipe/resolvers/IngredientGroup';
import    { Instruction } from './recipe/resolvers/Instruction';
import    { InstructionGroup } from './recipe/resolvers/InstructionGroup';
import    { Language } from './recipe/resolvers/Language';
import    { createRecipe as Mutation_createRecipe } from './recipe/resolvers/Mutation/createRecipe';
import    { pingMutation as Mutation_pingMutation } from './mutation/resolvers/Mutation/pingMutation';
import    { Photo } from './recipe/resolvers/Photo';
import    { allRecipes as Query_allRecipes } from './recipe/resolvers/Query/allRecipes';
import    { pingQuery as Query_pingQuery } from './query/resolvers/Query/pingQuery';
import    { Recipe } from './recipe/resolvers/Recipe';
import    { Tag } from './recipe/resolvers/Tag';
    export const resolvers: Resolvers = {
      Query: { allRecipes: Query_allRecipes,pingQuery: Query_pingQuery },
      Mutation: { createRecipe: Mutation_createRecipe,pingMutation: Mutation_pingMutation },
      
      Ingredient: Ingredient,
IngredientGroup: IngredientGroup,
Instruction: Instruction,
InstructionGroup: InstructionGroup,
Language: Language,
Photo: Photo,
Recipe: Recipe,
Tag: Tag
    }