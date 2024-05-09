/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ColorCodes } from '../../../theme/theme'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import RecipePropertyIcons from '../../../widgets/property-icon/RecipePropertyIcons'
import { SoundServiceContext, SoundType } from '../../../sounds/SoundProvider'
import { useContext } from 'react'
import CustomDivider from '../../../widgets/divider/CustomDivider'
import ImageWithFallback, { FallbackIcon } from '../../../widgets/image-with-fallback/ImageWithFallback'

export const summaryRepresentationDataTestId = 'summary-representation'

export type SummaryRecipeProps = {
  recipe: Recipe
  onPickRecipeChanged: () => void
  isPicked: boolean
  isFavorite?: boolean
  isFirst?: boolean
}

const imageWidth = 110
const imageHeight = 120
const borderRadius = 6
const isPickedBorderWidth = 10

const SummaryRecipe = ({ recipe, onPickRecipeChanged, isPicked, isFavorite, isFirst }: SummaryRecipeProps) => {
  const { playSound } = useContext(SoundServiceContext)

  const toggleIsPickedWithSound = () => {
    const soundType = isPicked ? SoundType.NEGATIVE : SoundType.POSITIVE
    playSound(soundType)
    onPickRecipeChanged()
  }

  const { title, tags, ovenNeeded, language, photos } = recipe
  const mainPhotoUrl = (photos ?? []).find((photo) => photo.isMainPhoto)?.url

  const tagsCombined = (tags ?? []).map(({ tag }) => `#${tag.toUpperCase()}`).join(' ')

  return (
    <div>
      {isFirst ? null : <CustomDivider marginTop="0px" marginBottom="0px" />}

      <div css={container} data-testid={summaryRepresentationDataTestId}>
        <div css={imageContainer(isPicked)} onClick={toggleIsPickedWithSound}>
          <ImageWithFallback
            mainPhotoUrl={mainPhotoUrl}
            fallbackIcon={FallbackIcon.FOOD}
            borderRadius={`${borderRadius}px`}
            imageHeight={isPicked ? imageHeight - 2 * isPickedBorderWidth : imageHeight}
            imageWidth={isPicked ? imageWidth - 2 * isPickedBorderWidth : imageWidth}
            imageAlt={recipe.title}
          />
        </div>

        <div css={infoContainer} onClick={toggleIsPickedWithSound}>
          <div css={titleContainer}>{title}</div>

          <div css={tagsContainer}>
            <div>{tagsCombined}</div>
          </div>

          <RecipePropertyIcons
            isFavorite={isFavorite ?? false}
            ovenNeeded={ovenNeeded}
            hasTags={tags ? tags.length > 0 : false}
            justifyContent="start"
          />

          <div css={languageCss}>{language?.language.toUpperCase()}</div>
        </div>
      </div>
    </div>
  )
}

export default SummaryRecipe

const container = css`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: start;
  padding-bottom: 10px;
  position: relative;
  padding-top: 10px;
`

const imageContainer = (isPicked: boolean) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${imageWidth}px;
  height: ${imageHeight}px;
  margin-right: 15px;
  background-color: ${isPicked ? ColorCodes.VERY_DARK : 'transparent'};
  border-radius: ${borderRadius}px;
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
  margin-bottom: 5px;
`

const languageCss = css`
  color: ${ColorCodes.SLIGHTLY_DARK};
  font-size: 0.7em;
  font-weight: bold;
  background-color: ${ColorCodes.VERY_PALE};
  margin-top: 8px;
  border-radius: 4px;
  padding: 1px 3px;
`
