import type { DeletePhotoErrorResolvers } from './../../types.generated'

export const DeletePhotoError: DeletePhotoErrorResolvers = {
  __isTypeOf: (parent) => {
    return !!parent.errorMessage
  }
}
