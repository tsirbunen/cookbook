import { relations } from 'drizzle-orm'
import { pgTable, serial, varchar, boolean, integer, AnyPgColumn } from 'drizzle-orm/pg-core'
import { ingredientGroups } from './ingredients'
import { instructionGroups } from './instructions'
import { languages } from './languages'
import { recipesToTags } from './tags'
import { photos } from './photos'
import { accounts } from './accounts'

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 250 }).notNull(),
  description: varchar('description', { length: 500 }),
  ovenNeeded: boolean('oven_needed').notNull(),
  languageId: integer('language_id').references((): AnyPgColumn => languages.id),
  isPrivate: boolean('is_private'),
  authorId: integer('author_id')
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
