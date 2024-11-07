import { expect } from '@jest/globals'
import { client, database } from '../../database/config/config'
import { clearDatabase } from '../../database/utils/clear-database.js'
import { createLanguages } from '../../database/utils/insert-data-to-database.js'
import { handleFindCreateOrPatchAndPurgeLanguage } from '../languages/utils'
import { getTableRowCountInDatabase } from './test-database-helpers'

describe('Handle languages', () => {
  beforeEach(async () => {
    await clearDatabase(database)
  })

  it('Previously created tags are found without creating new tags', async () => {
    const languages = ['Chinese', 'Spanish', 'Japanese', 'French']
    const newLanguages = await createLanguages(database, languages)
    const index = 2
    const expectedLanguageId = newLanguages[index].id

    const languageId = await handleFindCreateOrPatchAndPurgeLanguage(database, languages[index])
    expect(languageId).toBe(expectedLanguageId)
    const rowCount = await getTableRowCountInDatabase('languages')
    expect(rowCount).toBe(languages.length)
  })

  it('New language is inserted if it does not exist in database yet', async () => {
    const languages = ['Chinese', 'Spanish', 'French']
    const existingLanguages = (await createLanguages(database, languages)) as { id: number; language: string }[]
    const newLanguage = 'German'

    const languageId = await handleFindCreateOrPatchAndPurgeLanguage(database, newLanguage)
    for (const language of existingLanguages) {
      expect(language.language).not.toBe(newLanguage)
      expect(language.id).not.toBe(languageId)
    }
    const rowCount = await getTableRowCountInDatabase('languages')
    expect(rowCount).toBe(languages.length + 1)
  })

  afterAll(async () => {
    await client.end()
  })
})
