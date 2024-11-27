export const getPhotoUploadUrlError = () => {
  return { __typename: 'PhotoUploadUrlError', errorMessage: 'Failed to create signed URLs for photo upload' }
}

export const getDeletePhotoError = () => {
  return { __typename: 'DeletePhotoError', errorMessage: 'Failed to delete photos from storage' }
}

export const getOriginalRecipeNotFoundError = () => {
  return { __typename: 'BadInputError', errorMessage: 'Original recipe was not found in database' }
}
