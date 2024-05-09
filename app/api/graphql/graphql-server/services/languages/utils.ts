import { eq } from 'drizzle-orm'
import { DatabaseType } from '../../database/inferred-types/inferred-types'
import { languages } from '../../database/database-schemas/languages'
import { Language } from '../../modules/types.generated'

export const getAllDatabaseLanguages = async (databaseOrTransaction: DatabaseType): Promise<Language[]> => {
  const allLanguages = await databaseOrTransaction.query.languages.findMany()
  return allLanguages
}

export const handleFindExistingOrCreateNewLanguage = async (trx: DatabaseType, language: string) => {
  const existingLanguage = await trx.query.languages.findMany({
    where: eq(languages.language, language),
    columns: { id: true }
  })

  let languageId: number
  if (existingLanguage.length) {
    languageId = existingLanguage[0].id
  } else {
    const newLanguage = await trx.insert(languages).values({ language }).returning({ insertedId: languages.id })
    languageId = newLanguage[0].insertedId
  }

  return languageId
}
