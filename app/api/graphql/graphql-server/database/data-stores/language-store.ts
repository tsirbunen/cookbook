import { eq } from 'drizzle-orm'
import type { Language } from '../../handlers/types-and-interfaces/types'
import type { Database } from '../config/config'
import { languages } from '../database-schemas/languages'

export class LanguageStore {
  async getAllLanguages(trx: Database): Promise<Language[]> {
    return await trx.query.languages.findMany()
  }

  async upsertLanguage(trx: Database, patchedLanguage: string) {
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

    return newLanguageId
  }
}
