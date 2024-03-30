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
    <div css={containerCss}>
      <div css={imageBoxCss}>
        <Image src={src} alt={`Photo of recipe with title: ${title}`} css={imageCss} />
      </div>
      <div css={headerImageStyle()} />

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

const DOT_SIZE = 15
const DOT_SPACER = 3
const IMAGE_POSITION_TOP = -(DOT_SIZE + 2 * DOT_SPACER + 5)
const HEADER_AND_SPACING = HEADER_HEIGHT_WITH_TOOLS + 50

const headerImageStyle = () => css`
  background-size: cover;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4) 20%, transparent 40%, rgba(0, 0, 0, 0));

  position: absolute;
  top: ${2 * IMAGE_POSITION_TOP + HEADER_AND_SPACING}px;
  height: 500px;
  width: 100%;
`

const containerCss = css``
const imageBoxCss = css`
  position: relative;
  top: ${IMAGE_POSITION_TOP}px;
`

const imageCss = css`
  object-fit: cover;
  height: 500px;
  width: 100%;
`

const dotBoxCss = css`
  position: relative;
  top: ${-HEADER_AND_SPACING}px;
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
    transform: scale(1.25);
  }
`

const dotCss = (isSelected: boolean) => css`
  background-color: ${isSelected ? ColorCodes.PALE : ColorCodes.DARK};
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  margin-left: ${DOT_SPACER}px;
  margin-right: ${DOT_SPACER}px;
  border-radius: 50%;
  &:hover {
    background-color: ${ColorCodes.VERY_PALE};
    transform: scale(1.25);
  }
`
