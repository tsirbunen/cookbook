import { relations } from 'drizzle-orm'
import { pgTable, serial, varchar, boolean, integer, AnyPgColumn } from 'drizzle-orm/pg-core'
import { recipes } from './recipes'

export const photos = pgTable('photos', {
  id: serial('id').primaryKey(),
  url: varchar('url', { length: 500 }).notNull(),
  isMainPhoto: boolean('is_main_photo').notNull(),
  recipeId: integer('recipe_id')
    .notNull()
    .references((): AnyPgColumn => recipes.id)
})

export const photoRelations = relations(photos, ({ one }) => ({
  recipe: one(recipes, { fields: [photos.recipeId], references: [recipes.id] })
}))
