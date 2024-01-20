/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Image from 'next/image'
import { ColorCodes } from '../../../theme/theme'
import falafel from '../../../assets/falafel.png'

const cardHeight = 195
const cardMargin = 10
const borderRadius = 6
const imageHeight = 150
export const headerHeight = 50
export const cardWidth = 175
export const cardsViewMobileWidth = (cardWidth + cardMargin) * 2

export type RecipeForPhotoCardProps = {
  id: number
  title: string
  onPickRecipeChanged: (recipeId: number, category: string) => void
  isPicked: boolean
  category: string
  photoUrl?: string
}

const RecipePhotoCard = ({ id, title, onPickRecipeChanged, isPicked, photoUrl, category }: RecipeForPhotoCardProps) => {
  console.log(photoUrl)

  return (
    <div css={outerContainer}>
      <div css={container(isPicked)}>
        <Image
          src={falafel}
          alt={'Some image title'}
          style={{
            borderRadius: '6px 6px 0px 0px',
            objectFit: 'cover',
            height: imageHeight,
            width: cardWidth
          }}
          onClick={() => onPickRecipeChanged(id, category)}
        />
        <div css={titleContainer(isPicked)}>{title}</div>
      </div>
    </div>
  )
}

export default RecipePhotoCard

const outerContainer = css`
  width: ${cardWidth + cardMargin}px;
  height: ${cardHeight + cardMargin}px;
`

const border = `2px solid ${ColorCodes.DARK}`

const container = (isPicked: boolean) => css`
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: ${borderRadius}px;
  /* border: ${isPicked ? border : 'none'}; */
  margin-right: ${cardMargin / 2}px;
  margin-left: ${cardMargin / 2}px;
  margin-bottom: ${cardMargin}px;
  position: relative;
  background-color: ${isPicked ? ColorCodes.PALE : 'transparent'};
`

const titleContainer = (isPicked: boolean) => css`
  color: ${isPicked ? ColorCodes.VERY_DARK : ColorCodes.VERY_DARK};
  font-weight: bold;
  font-size: 12px;
  height: ${cardHeight - imageHeight - 10}px;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 3px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    text-decoration: underline;
  }
`
