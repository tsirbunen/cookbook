import * as dotenv from 'dotenv'
dotenv.config()

import { database } from '../../database/config/config'
import type { Tag } from '../../modules/types.generated'
import { getAllDatabaseTags } from './utils'

export const getAllTags = async (): Promise<Tag[]> => {
  return await getAllDatabaseTags(database)
}
