import { relations } from 'drizzle-orm'
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { recipes } from './recipes'

export const languages = pgTable('languages', {
  id: serial('id').primaryKey(),
  language: varchar('language', { length: 150 }).notNull().unique()
})

export const languageRelations = relations(languages, ({ many }) => ({
  recipes: many(recipes)
}))
