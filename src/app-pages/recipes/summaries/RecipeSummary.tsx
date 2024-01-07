/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Image from 'next/image'
import { ColorCodes } from '../../../theme/theme'
import falafel from '../../../assets/falafel.png'
import { TbStarFilled, TbStar, TbCooker } from 'react-icons/tb'
import CheckboxCustomized from '../../../components/checkbox/CheckboxCustomized'

const imageWidth = 100
const imageHeight = 100

const RecipeSummary = () => {
  const isFavorite = Math.random() > 0.5
  const title = isFavorite
    ? 'Lemon pie with Swiss meringue topping'
    : 'Really, really delicious Lemon pie with Swiss meringue topping meringue topping meringue topping'

  const tags = '#vegetarian #lebanese #healthy'
  const category = Math.random() > 0.5 ? 'Lunch' : 'Breakfast'
  const Element = isFavorite ? TbStarFilled : TbStar

  return (
    <div css={container}>
      <div css={imageContainer}>
        <Image
          src={falafel}
          alt={'Some image title'}
          style={{
            borderRadius: '6px',
            objectFit: 'cover',
            height: imageHeight,
            width: imageWidth
          }}
        />
      </div>

      <div css={infoContainer}>
        <div css={categoryContainer}>{category.toUpperCase()}</div>
        <div css={titleContainer}>{title}</div>
        <div css={tagsContainer}>
          <div>{tags.toUpperCase()}</div>
        </div>
        <div css={bottomContainer}>
          <div>
            <div css={badge}>
              <Element fontSize="1.25em" strokeWidth="2" />
            </div>
          </div>
          {isFavorite ? (
            <div>
              <div css={badge}>
                <TbCooker fontSize="1.25em" strokeWidth="2" />
              </div>
            </div>
          ) : null}
          <div>
            <CheckboxCustomized />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeSummary

const container = css`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: start;
  margin-left: 5px;
  margin-bottom: 15px;
`

const imageContainer = css`
  width: ${imageWidth}px;
  height: ${imageHeight}px;
  margin-right: 8px;
`

const infoContainer = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`

const titleContainer = css`
  color: ${ColorCodes.VERY_DARK};
  font-weight: bold;
  font-size: 0.9em;
  margin-bottom: 5px;
  line-height: 1.2em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    text-decoration: underline;
  }
`

const tagsContainer = css`
  color: ${ColorCodes.MEDIUM};
  font-size: 0.7em;
  font-weight: bold;
`
const categoryContainer = css`
  color: ${ColorCodes.MEDIUM};
  font-size: 0.7em;
  font-weight: bold;
`

const bottomContainer = css`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: start;
`

const badge = css`
  width: 25px;
  height: 25px;
  background-color: ${ColorCodes.MEDIUM};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${ColorCodes.VERY_PALE};
  margin-right: 5px;
`
