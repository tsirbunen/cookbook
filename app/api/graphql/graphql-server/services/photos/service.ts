import * as dotenv from 'dotenv'
dotenv.config()

import { DatabaseType } from '../../database/inferred-types/inferred-types'
import { photos } from '../../database/database-schemas/photos'

export const uploadPhotoFile = async (_photoFile: File): Promise<string> => {
  return 'done'
}

export const handlePhotoIdentifiers = async (trx: DatabaseType, photoUrls: string[], recipeId: number) => {
  // Here we link existing photos to a recipe
  for (let i = 0; i < photoUrls.length; i++) {
    await trx.insert(photos).values({
      url: photoUrls[i],
      isMainPhoto: i === 0,
      recipeId
    })
  }
}
