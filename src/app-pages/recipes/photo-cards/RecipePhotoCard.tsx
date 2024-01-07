/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Image from 'next/image'
import { ColorCodes } from '../../../theme/theme'
import falafel from '../../../assets/falafel.png'
import CheckboxCustomized from '../../../components/checkbox/CheckboxCustomized'

export const headerHeight = 50
export const cardWidth = 175
const cardHeight = 195
const cardMargin = 10
const borderRadius = 6
const imageHeight = 150
const badgeWidth = 30
export const cardsViewMobileWidth = (cardWidth + cardMargin) * 2

const RecipePhotoCard = () => {
  const isFavorite = Math.random() > 0.5
  const title = isFavorite
    ? 'Lemon pie with Swiss meringue topping'
    : 'Really delicious Lemon pie with Swiss meringue topping'
  return (
    <div css={outerContainer}>
      <div css={container}>
        <Image
          src={falafel}
          alt={'Some image title'}
          style={{
            borderRadius: '6px 6px 0px 0px',
            objectFit: 'cover',
            height: imageHeight,
            width: cardWidth
          }}
        />
        <div css={badge}>
          <CheckboxCustomized />
        </div>
        <div css={titleContainer}>{title}</div>
      </div>
    </div>
  )
}

export default RecipePhotoCard

const outerContainer = css`
  width: ${cardWidth + cardMargin}px;
  height: ${cardHeight + cardMargin}px;
`

const container = css`
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: ${borderRadius}px;
  margin-right: ${cardMargin / 2}px;
  margin-left: ${cardMargin / 2}px;
  margin-bottom: ${cardMargin}px;
  background-color: white;
  position: relative;
`

const titleContainer = css`
  color: ${ColorCodes.VERY_DARK};
  font-weight: bold;
  font-size: 12px;
  height: ${cardHeight - imageHeight - 10}px;
  margin-left: 10px;
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

const badge = css`
  margin-top: ${-badgeWidth}px;
  margin-left: ${cardWidth - badgeWidth - 2}px;
  position: absolute;
`
