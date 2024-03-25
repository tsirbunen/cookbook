/** @jsxImportSource @emotion/react */

import React from 'react'
import Image from 'next/image'
import { css } from '@emotion/react'
import falafel from '../../../assets/falafel.png'
import dal from '../../../assets/dal.png'
import korma from '../../../assets/korma.png'
import { ColorCodes } from '../../../theme/theme'

type RecipePhotosProps = {
  title: string
}

const RecipePhotos = ({ title }: RecipePhotosProps) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = React.useState(0)
  const photoUrls = [falafel, dal, korma]

  const selectPhotoToDisplay = (index: number) => {
    setSelectedPhotoIndex(index)
  }

  const showSelectPhotoToDisplay = photoUrls.length > 1
  const src = photoUrls[selectedPhotoIndex]

  return (
    <div css={containerCss}>
      <Image src={src} alt={`Photo of recipe with title: ${title}`} css={imageCss} />
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

export default RecipePhotos

const DOT_SIZE = 15
const DOT_SPACER = 3

const containerCss = css`
  width: 100%;
`

const imageCss = css`
  object-fit: cover;
  min-height: 200px;
  max-height: 400px;
  width: 100%;
`

const dotBoxCss = css`
  position: relative;
  top: -${DOT_SIZE + 2 * DOT_SPACER + 5}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
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
