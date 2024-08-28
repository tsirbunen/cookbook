import { pgTable, serial, varchar, boolean } from 'drizzle-orm/pg-core'

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  username: varchar('title', { length: 250 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 50 }),
  isVerified: boolean('is_verified').notNull()
})
