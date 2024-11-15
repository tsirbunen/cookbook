import { relations } from 'drizzle-orm'
import { type AnyPgColumn, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { recipes } from './recipes'

export const recipesToTags = pgTable('recipes_to_tags', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipe_id')
    .references((): AnyPgColumn => recipes.id)
    .notNull(),
  tagId: integer('tag_id')
    .references((): AnyPgColumn => tags.id)
    .notNull()
})

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  tag: varchar('tag', { length: 150 }).notNull()
})

export const recipesToTagsRelations = relations(recipesToTags, ({ one }) => ({
  recipe: one(recipes, { fields: [recipesToTags.recipeId], references: [recipes.id] }),
  tags: one(tags, { fields: [recipesToTags.tagId], references: [tags.id] })
}))
