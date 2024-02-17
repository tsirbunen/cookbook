/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Image from 'next/image'
import { ColorCodes } from '../../../theme/theme'
import falafel from '../../../assets/falafel.png'
import { TbStarFilled, TbStar, TbCooker } from 'react-icons/tb'
import { Recipe } from '../../../types/graphql-schema-types.generated'

export const summaryRepresentationDataTestId = 'summary-representation'

export type SummaryRecipeProps = {
  recipe: Recipe
  onPickRecipeChanged: () => void
  isPicked: boolean
}

const imageWidth = 100
const imageHeight = 110
const borderRadius = 6

const SummaryRecipe = ({ recipe, onPickRecipeChanged, isPicked }: SummaryRecipeProps) => {
  const { title, tags, isFavorite, category, ovenNeeded } = recipe

  const getImageRadii = () => {
    return `${borderRadius}px 0px 0px ${borderRadius}px`
  }
  const Element = isFavorite ? TbStarFilled : TbStar
  const tagsCombined = tags.map((tag) => `#${tag.toUpperCase()}`).join(' ')

  return (
    <div css={container(isPicked)} data-testid={summaryRepresentationDataTestId}>
      <div css={imageContainer}>
        <Image
          src={falafel}
          alt={'Some image title'}
          style={{
            borderRadius: getImageRadii(),
            objectFit: 'cover',
            height: imageHeight,
            width: imageWidth
          }}
        />
      </div>

      <div css={infoContainer} onClick={onPickRecipeChanged}>
        <div css={categoryContainer(isPicked)}>{(category ?? '').toUpperCase()}</div>

        <div css={titleContainer(isPicked)}>{title}</div>

        <div css={tagsContainer(isPicked)}>
          <div>{tagsCombined}</div>
        </div>

        <div css={bottomContainer}>
          {isFavorite ? (
            <div>
              <div css={badge(isPicked)}>
                <Element fontSize="1.3em" strokeWidth="2" />
              </div>
            </div>
          ) : null}
          {ovenNeeded ? (
            <div>
              <div css={badge(isPicked)}>
                <TbCooker fontSize="1.3em" strokeWidth="2" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default SummaryRecipe

const container = (isPicked: boolean) => css`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: start;
  margin-bottom: 15px;
  background-color: ${isPicked ? ColorCodes.PALE : 'transparent'};
  border-radius: ${borderRadius}px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: ${borderRadius}px;
  position: relative;
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

const titleContainer = (isPicked: boolean) => css`
  color: ${isPicked ? ColorCodes.VERY_DARK : ColorCodes.VERY_DARK};
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

const tagsContainer = (isPicked: boolean) => css`
  color: ${isPicked ? ColorCodes.DARK : ColorCodes.DARK};
  font-size: 0.7em;
  font-weight: bold;
  margin-bottom: 5px;
`
const categoryContainer = (isPicked: boolean) => css`
  color: ${isPicked ? ColorCodes.DARK : ColorCodes.DARK};
  font-size: 0.7em;
  font-weight: bold;
`

const bottomContainer = css`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: start;
`

const badge = (isPicked: boolean) => css`
  width: 28px;
  height: 28px;
  background-color: ${isPicked ? ColorCodes.DARK : ColorCodes.DARK};
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${ColorCodes.VERY_PALE};
  margin-right: 5px;
`
