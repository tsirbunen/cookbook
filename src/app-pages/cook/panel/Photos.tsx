/** @jsxImportSource @emotion/react */

import React from 'react'
import Image from 'next/image'
import { css } from '@emotion/react'
import falafel from '../../../assets/falafel.png'
import dal from '../../../assets/dal.png'
import korma from '../../../assets/korma.png'
import { ColorCodes } from '../../../theme/theme'
import { HEADER_HEIGHT_WITH_TOOLS } from '../../../constants/layout'

type PhotosProps = {
  title: string
}

const Photos = ({ title }: PhotosProps) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = React.useState(0)
  const photoUrls = [falafel, dal, korma]

  const selectPhotoToDisplay = (index: number) => {
    setSelectedPhotoIndex(index)
  }

  const showSelectPhotoToDisplay = photoUrls.length > 1
  const src = photoUrls[selectedPhotoIndex]

  return (
    <div css={imageBoxCss}>
      <Image src={src} alt={`Photo of recipe with title: ${title}`} css={imageCss} />
      <div css={shadowGradientPhotoOverlayCss} />
      {showSelectPhotoToDisplay ? (
        <div css={dotBoxCss}>
          <div css={dotRowCss}>
            {photoUrls.map((_url, index) => (
              <div key={index} css={dotCss(selectedPhotoIndex === index)} onClick={() => selectPhotoToDisplay(index)} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Photos

const DOT_SIZE = 25
const DOT_SPACER = 3
const IMAGE_CONTAINER_HEIGHT = 500
const DOT_BOX_TOP = -(IMAGE_CONTAINER_HEIGHT + HEADER_HEIGHT_WITH_TOOLS + 85)

const shadowGradientPhotoOverlayCss = css`
  background-size: cover;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5) 30%, transparent 40%, transparent);
  position: relative;
  top: ${-IMAGE_CONTAINER_HEIGHT}px;
  height: ${IMAGE_CONTAINER_HEIGHT}px;
  width: 100%;
`

const imageBoxCss = css`
  position: relative;
  width: 100%;
  height: ${IMAGE_CONTAINER_HEIGHT}px;
`

const imageCss = css`
  object-fit: cover;
  height: ${IMAGE_CONTAINER_HEIGHT}px;
  width: 100%;
`

const dotBoxCss = css`
  position: relative;
  top: ${DOT_BOX_TOP}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  display: flex;
  z-index: 100;
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
  background-color: ${isSelected ? ColorCodes.VERY_PALE : ColorCodes.MEDIUM};
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  margin-left: ${DOT_SPACER}px;
  margin-right: ${DOT_SPACER}px;
  border-radius: 50%;
  &:hover {
    background-color: ${ColorCodes.VERY_PALE};
    transform: scale(1.15);
  }
`
