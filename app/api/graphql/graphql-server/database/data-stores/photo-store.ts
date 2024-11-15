import type { Database } from '../config/config'
import { photos } from '../database-schemas/photos'

export class PhotoStore {
  async handlePhotoIdentifiers(trx: Database, photoUrls: string[], recipeId: number) {
    // Here we link existing photos to a recipe
    for (let i = 0; i < photoUrls.length; i++) {
      await trx.insert(photos).values({
        url: photoUrls[i],
        isMainPhoto: i === 0,
        recipeId
      })
    }
  }
}
