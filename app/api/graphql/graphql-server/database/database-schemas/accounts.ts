import { relations, sql } from 'drizzle-orm'
import { pgTable, serial, varchar, boolean, uuid } from 'drizzle-orm/pg-core'
import { recipes } from './recipes'

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid')
    .notNull()
    .unique()
    .default(sql`gen_random_uuid()`),
  username: varchar('title', { length: 250 }).notNull().unique(),
  phoneNumber: varchar('phone_number', { length: 50 }).notNull().unique(),
  isVerified: boolean('is_verified').notNull(),
  latestCode: varchar('latest_code', { length: 20 })
})

export const accountRelations = relations(accounts, ({ many }) => ({
  recipes: many(recipes)
}))
