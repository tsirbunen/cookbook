import { type ChakraProps, Flex } from '@chakra-ui/react'
import type React from 'react'
import { useContext } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { Shades } from '../../constants/shades'
import { ToastServiceContext } from '../../toast-service/ToastServiceProvider'
import { getFileValidationError, getTooManyFilesError } from './file-validation'

type DragAndDropProps = {
  onDroppedFiles: (newFiles: File[]) => void
  width: number
  height: number
  maxFiles: number
  uploadedFilesCount: number
  disabled: boolean
}

const DragAndDrop = ({ width, height, uploadedFilesCount, maxFiles, disabled, onDroppedFiles }: DragAndDropProps) => {
  const { showSimpleToast } = useContext(ToastServiceContext)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles && selectedFiles.length > 0) updateWithFiles(selectedFiles)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = event.dataTransfer.files
    if (droppedFiles.length > 0) updateWithFiles(droppedFiles)
  }

  const updateWithFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter(validateFile)
    if (newFiles.length + uploadedFilesCount > maxFiles) {
      showSimpleToast(getTooManyFilesError(maxFiles))
      return
    }

    onDroppedFiles(newFiles)
  }

  const validateFile = (fileObj: File) => {
    const validationError = getFileValidationError(fileObj.type, fileObj.name)
    if (!validationError) return true
    showSimpleToast(validationError)
  }

  return (
    <Flex onDrop={handleDrop} onDragOver={(event) => event.preventDefault()} {...outerCss(width, height, disabled)}>
      <AiOutlineCloudUpload fontSize={35} />
      <input type="file" hidden id="browse" onChange={handleFileChange} multiple />
    </Flex>
  )
}

export default DragAndDrop

const outerCss = (width: number, height: number, disabled: boolean) => {
  const common = {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'center',
    justifyContent: 'center',
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: '8px',
    color: Shades.VERY_PALE,
    border: `2.5px dashed ${Shades.VERY_PALE}`,
    backgroundColor: Shades.EXTREMELY_PALE
  }

  if (disabled) {
    return {
      ...common
    }
  }

  return {
    ...common,
    color: Shades.MEDIUM,
    _hover: {
      border: `2.5px dashed ${Shades.DARK}`,
      backgroundColor: Shades.VERY_PALE,
      color: Shades.DARK
    }
  }
}
