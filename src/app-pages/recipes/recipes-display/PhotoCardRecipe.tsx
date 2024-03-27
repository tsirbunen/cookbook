/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Image from 'next/image'
import { ColorCodes } from '../../../theme/theme'
import falafel from '../../../assets/falafel.png'
import { Recipe } from '../../../types/graphql-schema-types.generated'

export const photoRepresentationDataTestId = 'card-representation'

const cardHeight = 195
const spacing = 10
const borderRadius = 6
const imageHeight = 150
export const cardWidth = 170
export const cardsViewMobileWidth = (cardWidth + spacing) * 2

export type RecipeForPhotoCardProps = {
  recipe: Recipe
  onPickRecipeChanged: () => void
  isPicked: boolean
  photoUrl?: string
}

const PhotoCardRecipe = ({ recipe, onPickRecipeChanged, isPicked }: RecipeForPhotoCardProps) => {
  return (
    <div css={cardCss(isPicked)} data-testid={photoRepresentationDataTestId}>
      <Image
        src={falafel}
        alt={'Some image title'}
        style={{
          borderRadius: '6px 6px 0px 0px',
          objectFit: 'cover',
          height: imageHeight,
          width: cardWidth
        }}
        onClick={onPickRecipeChanged}
      />
      <div css={titleCss(isPicked)}>{recipe.title}</div>
    </div>
  )
}

export default PhotoCardRecipe

const cardCss = (isPicked: boolean) => css`
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: ${borderRadius}px;
  margin-right: 3px;
  margin-left: 3px;
  margin-bottom: ${spacing}px;
  position: relative;
  background-color: ${isPicked ? ColorCodes.VERY_DARK : 'transparent'};
`

const titleCss = (isPicked: boolean) => css`
  color: ${isPicked ? ColorCodes.VERY_PALE : ColorCodes.VERY_DARK};
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
