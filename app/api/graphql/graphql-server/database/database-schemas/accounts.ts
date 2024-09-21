import { relations, sql } from 'drizzle-orm'
import { pgTable, serial, varchar, boolean, uuid, pgEnum } from 'drizzle-orm/pg-core'
import { recipes } from './recipes'

export const identityProviderEnum = pgEnum('identity_provider', ['EMAIL', 'GITHUB', 'FACEBOOK'])

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid')
    .notNull()
    .unique()
    .default(sql`gen_random_uuid()`),
  username: varchar('username', { length: 250 }).notNull().unique(),
  email: varchar('email', { length: 50 }).unique(),
  passwordHash: varchar('password_hash', { length: 250 }),
  emailVerified: boolean('email_verified'),
  identityProvider: identityProviderEnum('identity_provider').notNull(),
  idAtProvider: varchar('id_at_provider', { length: 250 }).unique()
})

export const accountRelations = relations(accounts, ({ many }) => ({
  recipes: many(recipes)
}))
