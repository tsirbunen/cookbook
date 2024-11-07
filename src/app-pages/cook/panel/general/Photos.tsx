/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import React from 'react'
import { HEADER_HEIGHT } from '../../../../constants/layout'
import { Shades } from '../../../../constants/shades'
import type { Photo } from '../../../../types/graphql-schema-types.generated'
import ImageWithFallback, { FallbackIcon } from '../../../../widgets/image-with-fallback/ImageWithFallback'

type PhotosProps = {
  title: string
  photos: Photo[]
  panelWidth: number | null
}

const Photos = ({ title, photos, panelWidth }: PhotosProps) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = React.useState(0)

  const selectPhotoToDisplay = (index: number) => {
    setSelectedPhotoIndex(index)
  }

  const showSelectPhotoToDisplay = photos.length > 1
  const mainPhotoUrl = (photos ?? []).find((photo) => photo.isMainPhoto)?.url
  const photoUrlToDisplay =
    photos[selectedPhotoIndex]?.url !== undefined ? photos[selectedPhotoIndex]?.url : mainPhotoUrl

  return (
    <div css={imageBoxCss(panelWidth)}>
      <ImageWithFallback
        mainPhotoUrl={photoUrlToDisplay}
        fallbackIcon={FallbackIcon.FOOD}
        imageHeight={IMAGE_CONTAINER_HEIGHT}
        imageWidth="100%"
        imageAlt={title}
      />
      <div css={shadowGradientPhotoOverlayCss} />
      {showSelectPhotoToDisplay ? (
        <div css={dotBoxCss}>
          <div css={dotRowCss}>
            {photos.map((_url, index) => {
              const key = index
              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: Implement later
                <div key={key} css={dotCss(selectedPhotoIndex === index)} onClick={() => selectPhotoToDisplay(index)} />
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Photos

export const IMAGE_CONTAINER_HEIGHT = 500
const DOT_BOX_TOP = IMAGE_CONTAINER_HEIGHT - HEADER_HEIGHT - 75
const DOT_SIZE = 25
const DOT_SPACER = 3

const shadowGradientPhotoOverlayCss = css`
  background-size: cover;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.8) 20%,
    rgba(0, 0, 0, 0.1) 50%,
    transparent 60%,
    transparent
  );
  position: relative;
  top: ${-IMAGE_CONTAINER_HEIGHT}px;
  height: ${IMAGE_CONTAINER_HEIGHT}px;
  width: 100%;
`

const imageBoxCss = (panelWidth?: number | null) => {
  const width = panelWidth ? `${panelWidth}px` : '100%'
  return css`
    position: absolute;
    width: ${width};
    height: ${IMAGE_CONTAINER_HEIGHT}px;
  `
}

const dotBoxCss = css`
  position: absolute;
  top: ${DOT_BOX_TOP}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  display: flex;
`
const dotRowCss = css`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: black;
  display: flex;
  padding: ${DOT_SPACER}px;
  border-radius: 20px;
  &:hover {
    transform: scale(1.15);
  }
`

const dotCss = (isSelected: boolean) => css`
  background-color: ${isSelected ? Shades.VERY_PALE : Shades.MEDIUM};
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  margin-left: ${DOT_SPACER}px;
  margin-right: ${DOT_SPACER}px;
  border-radius: 50%;
  &:hover {
    background-color: ${Shades.VERY_PALE};
    transform: scale(1.15);
  }
`
