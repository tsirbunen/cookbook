import { getAdminClient } from './storage-client'

const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME ?? ''

export const createSignedUploadUrl = async (uuid: string) => {
  const supabase = getAdminClient()
  const { data } = await supabase.storage.from(bucketName).createSignedUploadUrl(uuid)
  return data?.signedUrl ?? null
}

export const removePhotos = async (photoIdentifiers: string[]) => {
  const supabase = getAdminClient()
  const { data } = await supabase.storage.from(bucketName).remove(photoIdentifiers)
  return data?.length ?? null
}
