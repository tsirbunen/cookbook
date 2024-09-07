import { relations } from 'drizzle-orm'
import { pgTable, serial, varchar, boolean } from 'drizzle-orm/pg-core'
import { recipes } from './recipes'

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  username: varchar('title', { length: 250 }).notNull().unique(),
  phoneNumber: varchar('phone_number', { length: 50 }).unique(),
  isVerified: boolean('is_verified').notNull()
})

export const accountRelations = relations(accounts, ({ many }) => ({
  recipes: many(recipes)
}))
