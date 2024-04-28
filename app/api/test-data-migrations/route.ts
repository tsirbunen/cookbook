import { NextResponse } from 'next/server'

import { database } from '../graphql/graphql-server/database/config/config'
import { getDatabaseTableTestInputs } from './test-recipes-migration-data'
import { ingredientGroups, ingredients } from '../graphql/graphql-server/database/database-schemas/ingredients'
import { instructionGroups, instructions } from '../graphql/graphql-server/database/database-schemas/instructions'
import { languages } from '../graphql/graphql-server/database/database-schemas/languages'
import { photos } from '../graphql/graphql-server/database/database-schemas/photos'
import { recipes } from '../graphql/graphql-server/database/database-schemas/recipes'
import { tags, recipesToTags } from '../graphql/graphql-server/database/database-schemas/tags'

export async function POST(_request: Request) {
  try {
    await performTestDataMigrations()
    return NextResponse.json({ message: 'Test data successfully migrated to database' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Failed to migrate test data to database' })
  }
}

const performTestDataMigrations = async () => {
  const {
    languageInputs,
    recipeInputs,
    photoInputs,
    tagInputs,
    recipesToTagsInputs,
    ingredientGroupInputs,
    ingredientInputs,
    instructionGroupInputs,
    instructionInputs
  } = getDatabaseTableTestInputs()

  await database.transaction(async (trx) => {
    await trx.insert(languages).values(languageInputs).returning()
    await trx.insert(recipes).values(recipeInputs).returning()
    await trx.insert(photos).values(photoInputs).returning()
    await trx.insert(tags).values(tagInputs).returning()
    await trx.insert(recipesToTags).values(recipesToTagsInputs).returning()
    await trx.insert(ingredientGroups).values(ingredientGroupInputs).returning()
    await trx.insert(ingredients).values(ingredientInputs).returning()
    await trx.insert(instructionGroups).values(instructionGroupInputs).returning()
    await trx.insert(instructions).values(instructionInputs).returning()
  })
}
