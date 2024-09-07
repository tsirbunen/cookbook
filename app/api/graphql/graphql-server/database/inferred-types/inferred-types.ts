import { ingredientGroups, ingredients } from '../database-schemas/ingredients'
import { instructions, instructionGroups } from '../database-schemas/instructions'
import { database } from '../config/config'
import { recipes } from '../database-schemas/recipes'
import { languages } from '../database-schemas/languages'
import { tags, recipesToTags } from '../database-schemas/tags'
import { photos } from '../database-schemas/photos'
import { accounts } from '../database-schemas/accounts'

export type DatabaseType = typeof database

export type RecipeInsert = typeof recipes.$inferInsert
export type TagInsert = typeof tags.$inferInsert
export type IngredientGroupInsert = typeof ingredientGroups.$inferInsert
export type IngredientInsert = typeof ingredients.$inferInsert
export type InstructionGroupInsert = typeof instructionGroups.$inferInsert
export type InstructionInsert = typeof instructions.$inferInsert
export type LanguageInsert = typeof languages.$inferInsert
export type PhotoInsert = typeof photos.$inferInsert
export type RecipesToTagsInsert = typeof recipesToTags.$inferInsert
export type AccountInsert = typeof accounts.$inferInsert

export type RecipeDBSelect = typeof recipes.$inferSelect
export type TagDBSelect = typeof tags.$inferSelect
export type IngredientGroupDBSelect = typeof ingredientGroups.$inferSelect
export type IngredientDBSelect = typeof ingredients.$inferSelect
export type InstructionGroupDBSelect = typeof instructionGroups.$inferSelect
export type InstructionDBSelect = typeof instructions.$inferSelect
export type LanguageDBSelect = typeof languages.$inferSelect
export type PhotoDBSelect = typeof photos.$inferSelect
export type RecipesToTagsDBSelect = typeof recipesToTags.$inferSelect
export type AccountDBSelect = typeof accounts.$inferSelect

export type RecipeSelectDBExpanded = RecipeDBSelect & {
  photos: PhotoDBSelect[]
  language: LanguageDBSelect
  recipesToTags: Array<RecipesToTagsDBSelect & { tags: TagDBSelect }>
  ingredientGroups: Array<IngredientGroupDBSelect & { ingredients: IngredientDBSelect[] }>
  instructionGroups: Array<InstructionGroupDBSelect & { instructions: InstructionDBSelect[] }>
}
