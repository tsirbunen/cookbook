import { relations } from 'drizzle-orm'
import { type AnyPgColumn, boolean, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { accounts } from './accounts'
import { ingredientGroups } from './ingredients'
import { instructionGroups } from './instructions'
import { languages } from './languages'
import { photos } from './photos'
import { recipesToTags } from './tags'

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 250 }).notNull(),
  description: varchar('description', { length: 500 }),
  ovenNeeded: boolean('oven_needed').notNull(),
  languageId: integer('language_id')
    .notNull()
    .references((): AnyPgColumn => languages.id),
  isPrivate: boolean('is_private').notNull(),
  authorId: integer('author_id').notNull()
})

export const recipePhotoRelations = relations(recipes, ({ many }) => ({
  photos: many(photos)
}))

export const recipeTagRelations = relations(recipes, ({ many }) => ({
  recipesToTags: many(recipesToTags)
}))

export const recipeLanguageRelations = relations(recipes, ({ one }) => ({
  language: one(languages, { fields: [recipes.languageId], references: [languages.id] })
}))

export const recipeIngredientGroupRelations = relations(recipes, ({ many }) => ({
  ingredientGroups: many(ingredientGroups)
}))

export const recipeInstructionGroupRelations = relations(recipes, ({ many }) => ({
  instructionGroups: many(instructionGroups)
}))

export const recipeAccountRelations = relations(recipes, ({ one }) => ({
  account: one(accounts, { fields: [recipes.authorId], references: [accounts.id] })
}))
