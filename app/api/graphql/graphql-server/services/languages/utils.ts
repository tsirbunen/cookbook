import { eq } from 'drizzle-orm'
import { DatabaseType } from '../../database/inferred-types/inferred-types'
import { languages } from '../../database/database-schemas/languages'
import { Language } from '../../modules/types.generated'
import { recipes } from '../../database/database-schemas/recipes'

export const getAllDatabaseLanguages = async (databaseOrTransaction: DatabaseType): Promise<Language[]> => {
  const allLanguages = await databaseOrTransaction.query.languages.findMany()
  return allLanguages
}

export const handleFindCreateOrPatchAndPurgeLanguage = async (
  trx: DatabaseType,
  patchedLanguage: string,
  oldLanguage?: Language
) => {
  let newLanguageId: number

  const existingLanguages = await trx.query.languages.findMany({
    where: eq(languages.language, patchedLanguage),
    columns: { id: true }
  })

  if (existingLanguages.length) {
    newLanguageId = existingLanguages[0].id
  } else {
    const newLanguage = await trx
      .insert(languages)
      .values({ language: patchedLanguage })
      .returning({ insertedId: languages.id })
    newLanguageId = newLanguage[0].insertedId
  }

  if (oldLanguage) {
    const recipesUsingOldLanguage = await trx.query.recipes.findMany({
      where: eq(recipes.languageId, oldLanguage.id)
    })
    if (!recipesUsingOldLanguage.length) {
      await trx.delete(languages).where(eq(languages.id, oldLanguage.id))
    }
  }

  return newLanguageId
}
