import { type ChakraProps, Divider, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { TbTrash } from 'react-icons/tb'
import { Shades } from '../../constants/shades'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import { dividerCss } from '../../utils/styles'
import { useFormInputHover } from '../form-simple-input/useFormInputHover'
import RequiredAsterisk from '../required-asterisk/RequiredAsterisk'
import DragAndDrop from './DragAndDrop'

export const formSimpleInputTestId = 'form-simple-input'
const SIZE = 90
const PHOTOS_MAX_COUNT = 4
const photoAlt = 'Some recipe photo'
const retryUploadLabel = 'RETRY UPLOAD'

export type PhotoDetails = {
  uuid: string
  file?: File
  url?: string
}

type DragAndDropWithHoverProps = {
  label: string
  info?: string
  isRequired?: boolean
  hoverId: string
  photoDetails: PhotoDetails[]
  onFilesChanged: (newFiles?: File[], deletedAtIndex?: number) => void
  failedUploadIds: string[]
  retryUpload: () => Promise<void>
}

const DragAndDropWithHover = ({
  label,
  info,
  isRequired,
  hoverId,
  photoDetails,
  onFilesChanged,
  failedUploadIds,
  retryUpload
}: DragAndDropWithHoverProps) => {
  const { showInput } = useFormInputHover({ hoverId })
  const [photos, setPhotos] = useState<{ url: string; uploadFailed: boolean }[]>([])

  useEffect(() => {
    if (!photoDetails?.length) {
      setPhotos([])
      return
    }

    setPhotos(
      photoDetails.map(({ uuid, file, url }) => {
        return {
          url: file ? URL.createObjectURL(file) : (url ?? ''),
          uploadFailed: failedUploadIds.includes(uuid)
        }
      })
    )
  }, [photoDetails, failedUploadIds])

  const onDroppedFiles = (newFiles: File[]) => {
    onFilesChanged(newFiles)
  }

  const handleRemoveFile = (index: number) => {
    onFilesChanged(undefined, index)
  }

  const hasUploadFailure = photos.some(({ uploadFailed }) => uploadFailed)

  return (
    <Flex data-testid={formSimpleInputTestId} {...outerCss(showInput)} id={hoverId}>
      <Text {...labelCss}>
        {label}
        {isRequired ? <RequiredAsterisk /> : null}
      </Text>
      <Divider {...dividerCss} />
      {info ? <Text {...infoCss}>{info}</Text> : null}

      <Flex {...dragAndDropCss}>
        <DragAndDrop
          onDroppedFiles={onDroppedFiles}
          width={SIZE}
          height={SIZE}
          maxFiles={PHOTOS_MAX_COUNT}
          uploadedFilesCount={photoDetails.length}
          disabled={photoDetails.length >= PHOTOS_MAX_COUNT}
        />
        {photos.length ? (
          photos.map(({ url, uploadFailed }, index) => {
            const photoKey = `photo-${index}`
            const uploadStatus = uploadFailed ? 'error' : undefined

            return (
              <Flex key={photoKey} {...photoCss} position="relative" onClick={() => handleRemoveFile(index)}>
                <Image src={url} width={SIZE} height={SIZE} style={{ objectFit: 'cover' }} alt={photoAlt} />

                <Flex {...photoTrashIconCss}>
                  <TbTrash />
                </Flex>

                <Flex {...photoUploadStatusCss(uploadStatus)}>
                  <AiOutlineCloudUpload fontSize={24} />
                </Flex>
              </Flex>
            )
          })
        ) : (
          <Flex />
        )}
      </Flex>

      {hasUploadFailure ? (
        <Flex {...retryUploadButtonCss}>
          <ButtonWithTheme variant={ButtonVariant.Error} onClick={retryUpload} isToggled={true} isSubmit={false}>
            <Text>{retryUploadLabel}</Text>
          </ButtonWithTheme>
        </Flex>
      ) : null}
    </Flex>
  )
}

export default DragAndDropWithHover

const outerCss = (showInput: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'start',
    justifyContent: 'start',
    marginBottom: '10px',
    backgroundColor: showInput ? 'white' : 'transparent',

    padding: '10px',
    borderRadius: '8px'
  }
}

const dragAndDropCss = {
  marginTop: '10px'
}

const retryUploadButtonCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  justifyContent: 'flex-end',
  marginTop: '10px',
  width: '100%'
}

const photoCss = {
  marginLeft: '10px',
  borderRadius: '8px',
  overflow: 'hidden',
  width: `${SIZE}px`,
  height: `${SIZE}px`
}

const photoTrashIconCss = {
  position: 'absolute' as ChakraProps['position'],
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: Shades.VERY_DARK,
  fontSize: '2.5em',
  opacity: 0,
  _hover: { opacity: 1 },
  borderRadius: '8px',
  backgroundColor: Shades.BACKGROUND
}

const photoUploadStatusCss = (status?: 'error') => {
  return {
    position: 'absolute' as ChakraProps['position'],
    bottom: '3px',
    right: '3px',
    backgroundColor: status === 'error' ? Shades.ERROR : 'transparent',
    color: Shades.BACKGROUND,
    opacity: status === 'error' ? 1 : 0,
    borderRadius: '8px'
  }
}

const infoCss = {
  lineHeight: '1.1em',
  fontSize: '0.8em',
  color: Shades.SLIGHTLY_DARK,
  marginBottom: '3px',
  marginTop: '3px'
}

const labelCss = {
  fontWeight: 'bold',
  fontSize: '1em',
  color: Shades.DARK,
  margin: '10px 0px 0px 0px',
  width: '100%',
  justifyContent: 'start'
}
