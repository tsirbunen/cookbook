import * as dotenv from 'dotenv'
dotenv.config()

import { database } from '../../database/config/config'
import type { Language } from '../../modules/types.generated'
import { getAllDatabaseLanguages } from './utils'

export const getAllLanguages = async (): Promise<Language[]> => {
  return await getAllDatabaseLanguages(database)
}
