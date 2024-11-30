/* eslint-disable @next/next/no-img-element */
import { type ChakraProps, Flex } from '@chakra-ui/react'
import { type CSSProperties, type SyntheticEvent, useEffect, useState } from 'react'
import { PiForkKnifeFill } from 'react-icons/pi'
import { Shades } from '../../constants/shades'
export const clickableRecipeCardArea = 'clickable-recipe-card-area'

export enum FallbackIcon {
  FOOD = 'FOOD'
}

type ImageWithFallbackProps = {
  mainPhotoUrl?: string
  fallbackIcon: FallbackIcon
  borderRadius?: string
  imageHeight: number
  imageWidth: number | string
  imageAlt: string
  onClick?: () => void
  index?: number
}

const ImageWithFallback = ({
  mainPhotoUrl,
  fallbackIcon,
  borderRadius,
  imageHeight,
  imageWidth,
  onClick,
  imageAlt,
  index
}: ImageWithFallbackProps) => {
  const [hasUploadError, setHasUploadError] = useState(false)
  const [srcIsLoaded, setSrcIsLoaded] = useState(false)

  useEffect(() => {
    if (mainPhotoUrl) {
      const img = new Image()
      img.src = mainPhotoUrl
      img.onload = () => {
        setSrcIsLoaded(true)
      }
    }
  }, [mainPhotoUrl])

  const onImageSourceError = (_event: SyntheticEvent<HTMLImageElement, Event>) => {
    setHasUploadError(true)
  }

  const dataTestId = `${clickableRecipeCardArea}-${index}`

  if (!mainPhotoUrl || !srcIsLoaded || hasUploadError) {
    return (
      <Flex
        onClick={onClick}
        data-testid={dataTestId}
        {...iconContainerCss(borderRadius, imageHeight, imageWidth, typeof imageWidth === 'number')}
      >
        {getFallbackIcon(fallbackIcon, imageWidth)}
      </Flex>
    )
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents:Implement later
    <img
      src={mainPhotoUrl}
      alt={imageAlt}
      style={{ ...(imageCss(borderRadius, imageHeight, imageWidth) as CSSProperties) }}
      onClick={onClick}
      onError={onImageSourceError}
      data-testid={dataTestId}
    />
  )
}

export default ImageWithFallback

const getFallbackIcon = (fallbackIcon: FallbackIcon, imageWidth: number | string) => {
  switch (fallbackIcon) {
    case FallbackIcon.FOOD:
      return (
        <PiForkKnifeFill
          size={typeof imageWidth === 'number' ? imageWidth * 0.6 : '50%'}
          color={Shades.SLIGHTLY_PALE}
        />
      )
    default:
      throw new Error(`Fallback icon ${fallbackIcon} not implemented`)
  }
}

const iconContainerCss = (
  borderRadius: string | undefined,
  imageHeight: number,
  imageWidth: number | string,
  isCentered = false
) => {
  return {
    borderRadius,
    height: imageHeight,
    width: imageWidth,
    backgroundColor: Shades.VERY_PALE,
    display: 'flex',
    justifyContent: isCentered ? 'center' : 'start',
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'center',
    paddingTop: isCentered ? '0px' : '60px'
  }
}

const imageCss = (borderRadius: string | undefined, imageHeight: number, imageWidth: number | string) => {
  return {
    borderRadius,
    objectFit: 'cover',
    height: imageHeight,
    width: imageWidth
  }
}
