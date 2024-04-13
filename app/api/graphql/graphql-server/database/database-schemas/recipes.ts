import { relations } from 'drizzle-orm'
import { pgTable, serial, varchar, boolean, integer, AnyPgColumn } from 'drizzle-orm/pg-core'
import { ingredientGroups } from './ingredients'
import { instructionGroups } from './instructions'

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 250 }).notNull(),
  description: varchar('description', { length: 500 }),
  category: varchar('category', { length: 100 }),
  ovenNeeded: boolean('oven_needed')
})

export const recipePhotoRelations = relations(recipes, ({ many }) => ({
  photos: many(photos)
}))

export const recipeTagRelations = relations(recipes, ({ many }) => ({
  recipesToTags: many(recipesToTags)
}))

export const recipeIngredientGroupRelations = relations(recipes, ({ many }) => ({
  ingredientGroups: many(ingredientGroups)
}))

export const recipeInstructionGroupRelations = relations(recipes, ({ many }) => ({
  instructionGroups: many(instructionGroups)
}))

export const photos = pgTable('photos', {
  id: serial('id').primaryKey(),
  url: varchar('url', { length: 500 }).notNull(),
  isMainPhoto: boolean('is_main_photo').notNull(),
  recipeId: integer('recipe_id').references((): AnyPgColumn => recipes.id)
})

export const photoRelations = relations(photos, ({ one }) => ({
  recipe: one(recipes, { fields: [photos.recipeId], references: [recipes.id] })
}))

export const recipesToTags = pgTable('recipes_to_tags', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipe_id').references((): AnyPgColumn => recipes.id),
  tagId: integer('tag_id').references((): AnyPgColumn => tags.id)
})

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  tag: varchar('tag', { length: 150 }).notNull()
})

export const recipesToTagsRelations = relations(recipesToTags, ({ one }) => ({
  recipe: one(recipes, { fields: [recipesToTags.recipeId], references: [recipes.id] }),
  tags: one(tags, { fields: [recipesToTags.tagId], references: [tags.id] })
}))
