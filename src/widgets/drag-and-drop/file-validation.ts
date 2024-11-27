import { ToastVariant } from '../../theme/alert/alert-theme'
import type { SimpleToast } from '../../toast-service/ToastServiceProvider'

export const acceptedFileFormats = ['png', 'jpg', 'jpeg']
export const acceptedFileTypes = acceptedFileFormats.map((format) => `image/${format}`)

export abstract class FileValidationError {
  toToast(_input?: string | number): SimpleToast {
    throw new Error('Method not implemented.')
  }
}

export class WrongFileFormat implements FileValidationError {
  toToast(format?: string) {
    return {
      title: 'Wrong file format',
      description: `Files of type *.${format ?? '(no type)'} are not allowed. Must be one of: *.${acceptedFileFormats.join(', *.')}`,
      variant: ToastVariant.Warning
    }
  }
}

export class WrongFileType implements FileValidationError {
  toToast(type: string) {
    return {
      title: 'Wrong file type',
      description: `Files of type ${type} are not allowed. Must be one of: ${acceptedFileTypes.join(', ')}`,
      variant: ToastVariant.Warning
    }
  }
}

export const getFileValidationError = (fileType: string, fileName?: string) => {
  const format = fileName?.split('.').pop() ?? ''

  if (!format || !acceptedFileFormats.includes(format)) {
    return new WrongFileFormat().toToast(format)
  }

  if (!acceptedFileTypes.includes(fileType)) {
    return new WrongFileType().toToast(fileType)
  }

  return null
}

export class TooManyFiles implements FileValidationError {
  toToast(maxFilesCount: number) {
    return {
      title: 'Too many files',
      description: `A maximum of ${maxFilesCount} files can be uploaded`,
      variant: ToastVariant.Warning
    }
  }
}

export const getTooManyFilesError = (maxFiles: number) => {
  return new TooManyFiles().toToast(maxFiles)
}
