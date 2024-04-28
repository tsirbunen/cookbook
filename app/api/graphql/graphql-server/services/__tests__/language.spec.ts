import { expect } from '@jest/globals'
import { client, database } from '../../database/config/config'
import { handleFindExistingOrCreateNewLanguage } from '../languages/utils'
import { clearDatabase, getTableRowCountInDatabase, insertLanguagesToDB } from './test-database-helpers'

describe('Handle languages', () => {
  beforeEach(async () => {
    await clearDatabase()
  })

  it('Previously created tags are found without creating new tags', async () => {
    const languages = ['Chinese', 'Spanish', 'Japanese', 'French']
    const newLanguages = await insertLanguagesToDB(languages)
    const index = 2
    const expectedLanguageId = newLanguages[index].id

    const languageId = await handleFindExistingOrCreateNewLanguage(database, languages[index])
    expect(languageId).toBe(expectedLanguageId)
    const rowCount = await getTableRowCountInDatabase('languages')
    expect(rowCount).toBe(languages.length)
  })

  it('New language is inserted if it does not exist in database yet', async () => {
    const languages = ['Chinese', 'Spanish', 'French']
    const existingLanguages = await insertLanguagesToDB(languages)
    const newLanguage = 'German'

    const languageId = await handleFindExistingOrCreateNewLanguage(database, newLanguage)
    existingLanguages.forEach((language) => {
      expect(language.language).not.toBe(newLanguage)
      expect(language.id).not.toBe(languageId)
    })
    const rowCount = await getTableRowCountInDatabase('languages')
    expect(rowCount).toBe(languages.length + 1)
  })

  afterAll(async () => {
    await client.end()
  })
})
