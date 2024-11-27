import type { PhotoUploadUrlErrorResolvers } from './../../types.generated'

export const PhotoUploadUrlError: PhotoUploadUrlErrorResolvers = {
  __isTypeOf: (parent) => {
    return !!parent.errorMessage
  }
}
