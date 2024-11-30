import { createClient } from '@supabase/supabase-js'
import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ToastVariant } from '../../../theme/alert/alert-theme'
import { ToastServiceContext } from '../../../toast-service/ToastServiceProvider'
import type { PhotoUploadDetails, Recipe } from '../../../types/graphql-schema-types.generated'
import type { PhotoDetails } from '../../../widgets/drag-and-drop/DragAndDropWithHover'

const photoBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_S3_ENDPOINT ?? ''
const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

type UseFileManager = {
  photoDetails: PhotoDetails[]
  onFilesChanged: (newFiles?: File[], deletedAtIndex?: number) => void
  uploadFiles: (photoUploadDetails?: PhotoUploadDetails[] | null) => Promise<void>
  failedUploadIds: string[]
  retryUpload: () => Promise<void>
}

export const useFileManager = (existingRecipe?: Recipe): UseFileManager => {
  const { showSimpleToast } = useContext(ToastServiceContext)
  const [photoDetails, setPhotoDetails] = useState<PhotoDetails[]>(
    existingRecipe?.photos?.map((photo) => {
      return { uuid: photo.url, url: photo.url }
    }) ?? []
  )
  const [failedUploadIds, setFailedUploadIds] = useState<string[]>([])
  const [failedUploadDetails, setFailedUploadDetails] = useState<PhotoUploadDetails[]>([])

  const onFilesChanged = (newFiles?: File[], deletedAtIndex?: number) => {
    if (!newFiles?.length && deletedAtIndex === undefined) {
      setPhotoDetails([])
      setFailedUploadIds([])
      return
    }

    if (newFiles?.length) {
      const newPhotoDetails = newFiles.map((file) => ({ uuid: uuidv4(), file }))
      setPhotoDetails([...photoDetails, ...newPhotoDetails])
      return
    }

    if (deletedAtIndex !== undefined) {
      const updatedPhotoDetails = photoDetails.filter((_, index) => index !== deletedAtIndex)
      setPhotoDetails(updatedPhotoDetails)
    }
  }

  const uploadFiles = async (photoUploadDetails?: PhotoUploadDetails[] | null) => {
    if (!photoUploadDetails) return

    const successfulUploadIds: string[] = []

    for await (const { uuid, file } of photoDetails) {
      if (!file) continue

      const details = photoUploadDetails.find((uploadDetail) => uploadDetail.photoId === uuid)
      if (!details) {
        handleFileUploadError(uuid)
        continue
      }

      const { data, error } = await supabase.storage.from(bucketName).uploadToSignedUrl(uuid, details.token, file)
      if (data) successfulUploadIds.push(uuid)
      if (error) {
        setFailedUploadDetails((prev) => [...prev, { ...details }])
        handleFileUploadError(uuid)
      }
    }

    if (successfulUploadIds.length) updatePhotoDetails(successfulUploadIds)
  }

  const retryUpload = async () => {
    const successfulUploadIds: string[] = []

    for await (const { photoId, token } of failedUploadDetails) {
      const file = photoDetails.find((photoDetail) => photoDetail.uuid === photoId)?.file
      if (!file) continue

      const { data, error } = await supabase.storage.from(bucketName).uploadToSignedUrl(photoId, token, file)
      if (data) successfulUploadIds.push(photoId)
      if (error) handleFileUploadError()
    }

    if (successfulUploadIds.length) {
      setFailedUploadIds((prev) => prev.filter((uuid) => !successfulUploadIds.includes(uuid)))
      setFailedUploadDetails((prev) =>
        prev.filter((uploadDetail) => !successfulUploadIds.includes(uploadDetail.photoId))
      )
      updatePhotoDetails(successfulUploadIds)
    }
  }

  const updatePhotoDetails = (successfulUploadIds: string[]) => {
    setPhotoDetails((prev) =>
      prev.map((photoDetail) => {
        if (successfulUploadIds.includes(photoDetail.uuid))
          return { ...photoDetail, url: getPhotoUrl(photoDetail.uuid) }
        return photoDetail
      })
    )
  }

  const handleFileUploadError = (uuid?: string) => {
    showSimpleToast({
      title: 'Failed to upload file',
      description: 'Failed to upload one file. Please try to upload files again.',
      variant: ToastVariant.Error
    })

    if (!uuid) return

    setFailedUploadIds((prev) => [...prev, uuid])
  }

  const getPhotoUrl = (uuid: string) => {
    return `${photoBaseUrl}/${uuid}`
  }

  return {
    photoDetails,
    onFilesChanged,
    uploadFiles,
    failedUploadIds,
    retryUpload
  }
}
