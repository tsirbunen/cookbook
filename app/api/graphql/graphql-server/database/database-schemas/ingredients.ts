import { pgTable, serial, varchar, real, integer, AnyPgColumn } from 'drizzle-orm/pg-core'
import { recipes } from './recipes'
import { relations } from 'drizzle-orm'

export const ingredientGroups = pgTable('ingredient_groups', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 250 }),
  recipeId: integer('recipe_id').references((): AnyPgColumn => recipes.id)
})

export const ingredientGroupRecipeRelations = relations(ingredientGroups, ({ one }) => ({
  recipe: one(recipes, { fields: [ingredientGroups.recipeId], references: [recipes.id] })
}))

export const ingredientGroupIngredientRelations = relations(ingredientGroups, ({ many }) => ({
  ingredients: many(ingredients)
}))

// FIXME: Should a range be allowed for the amount?
export const ingredients = pgTable('ingredients', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 350 }).notNull(),
  amount: real('amount'),
  unit: varchar('unit', { length: 100 }),
  previousId: integer('previous_id').references((): AnyPgColumn => ingredients.id),
  groupId: integer('group_id').references((): AnyPgColumn => ingredientGroups.id)
})

export const ingredientRelations = relations(ingredients, ({ one }) => ({
  ingredientGroup: one(ingredientGroups, { fields: [ingredients.groupId], references: [ingredientGroups.id] })
}))
