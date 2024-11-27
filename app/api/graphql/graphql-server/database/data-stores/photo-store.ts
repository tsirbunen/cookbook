import { eq } from 'drizzle-orm'
import type { Database } from '../config/config'
import { photos } from '../database-schemas/photos'

export class PhotoStore {
  async handleCreatePhotoIdentifiers(
    trx: Database,
    photoIdentifiers: { id: string; isMainPhoto: boolean }[],
    recipeId: number
  ) {
    // Here we link existing photos to a recipe
    for (let i = 0; i < photoIdentifiers.length; i++) {
      const { id, isMainPhoto } = photoIdentifiers[i]
      await trx.insert(photos).values({
        url: id,
        isMainPhoto,
        recipeId
      })
    }
  }

  async handleDeletePhotoIdentifiers(trx: Database, photoIdentifiers: string[]) {
    for (let i = 0; i < photoIdentifiers.length; i++) {
      await trx.delete(photos).where(eq(photos.url, photoIdentifiers[i]))
    }
  }
}
