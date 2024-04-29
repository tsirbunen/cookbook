/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ColorCodes } from '../../../theme/theme'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { SoundServiceContext, SoundType } from '../../../sounds/SoundProvider'
import { useContext } from 'react'
import ImageWithFallback, { FallbackIcon } from '../../../widgets/image-with-fallback/ImageWithFallback'

export const photoRepresentationDataTestId = 'card-representation'

const CARD_HEIGHT = 195
const SPACING = 10
const BORDER_RADIUS = 8
const IMAGE_HEIGHT = 150
const CARD_WIDTH = 170

export type RecipeForPhotoCardProps = {
  recipe: Recipe
  onPickRecipeChanged: () => void
  isPicked: boolean
}

const PhotoCardRecipe = ({ recipe, onPickRecipeChanged, isPicked }: RecipeForPhotoCardProps) => {
  const { playSound } = useContext(SoundServiceContext)

  const toggleIsPickedWithSound = () => {
    const soundType = isPicked ? SoundType.NEGATIVE : SoundType.POSITIVE
    playSound(soundType)
    onPickRecipeChanged()
  }

  const mainPhotoUrl = (recipe.photos ?? []).find((photo) => photo.isMainPhoto)?.url

  return (
    <div css={cardCss(isPicked)} data-testid={photoRepresentationDataTestId}>
      <ImageWithFallback
        mainPhotoUrl={mainPhotoUrl}
        fallbackIcon={FallbackIcon.FOOD}
        borderRadius={`${BORDER_RADIUS}px ${BORDER_RADIUS}px 0px 0px`}
        imageHeight={IMAGE_HEIGHT}
        imageWidth={CARD_WIDTH}
        onClick={toggleIsPickedWithSound}
        imageAlt={recipe.title}
      />
      <div css={titleCss(isPicked)}>{recipe.title}</div>
    </div>
  )
}

export default PhotoCardRecipe

const cardCss = (isPicked: boolean) => css`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: ${BORDER_RADIUS}px;
  margin-right: 3px;
  margin-left: 3px;
  margin-bottom: ${SPACING}px;
  position: relative;
  background-color: ${isPicked ? ColorCodes.VERY_DARK : 'transparent'};
`

const titleCss = (isPicked: boolean) => css`
  color: ${isPicked ? ColorCodes.VERY_PALE : ColorCodes.VERY_DARK};
  font-weight: bold;
  font-size: 12px;
  height: ${CARD_HEIGHT - IMAGE_HEIGHT - 10}px;
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
