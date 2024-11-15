import type { DataStore } from '../../database/data-stores/data-store'
import type { Language } from '../types-and-interfaces/types'

export class LanguageHandler {
  constructor(private dataStore: DataStore) {}

  async getAllLanguages(): Promise<Language[]> {
    return await this.dataStore.withinTransaction(async () => {
      return await this.dataStore.getAllLanguages()
    })
  }

  async upsertLanguage(patchedLanguage: string) {
    return await this.dataStore.withinTransaction(async () => {
      return await this.dataStore.upsertLanguage(patchedLanguage)
    })
  }
}
