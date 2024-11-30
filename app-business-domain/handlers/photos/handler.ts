import * as dotenv from 'dotenv'
import { DataStore } from '../../../app-datastore/data-stores/data-store'

dotenv.config()

export const uploadPhotoFile = async (_photoFile: File): Promise<string> => {
  return 'done'
}

export class PhotoHandler {
  dataStore: DataStore

  constructor(db: DataStore) {
    this.dataStore = db
  }
}
