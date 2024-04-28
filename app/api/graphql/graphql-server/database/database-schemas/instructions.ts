import { pgTable, serial, varchar, integer, AnyPgColumn } from 'drizzle-orm/pg-core'
import { recipes } from './recipes'
import { relations } from 'drizzle-orm'

export const instructionGroups = pgTable('instruction_groups', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 250 }),
  recipeId: integer('recipe_id').references((): AnyPgColumn => recipes.id)
})

export const instructionGroupRecipeRelations = relations(instructionGroups, ({ one }) => ({
  recipe: one(recipes, { fields: [instructionGroups.recipeId], references: [recipes.id] })
}))

export const instructionGroupInstructionRelations = relations(instructionGroups, ({ many }) => ({
  instructions: many(instructions)
}))

export const instructions = pgTable('instructions', {
  id: serial('id').primaryKey(),
  content: varchar('content', { length: 350 }).notNull(),
  previousId: integer('previous_id').references((): AnyPgColumn => instructions.id),
  groupId: integer('group_id').references((): AnyPgColumn => instructionGroups.id)
})

export const instructionRelations = relations(instructions, ({ one }) => ({
  instructionGroup: one(instructionGroups, {
    fields: [instructions.groupId],
    references: [instructionGroups.id]
  })
}))
