import { type ChakraProps, Flex, Tooltip } from '@chakra-ui/react'
import { useContext } from 'react'
import { Shades } from '../../../constants/shades'
import { SoundServiceContext, SoundType } from '../../../sounds/SoundProvider'
import type { Recipe } from '../../../types/graphql-schema-types.generated'
import { tooltipCss } from '../../../utils/styles'
import ImageWithFallback, { FallbackIcon } from '../../../widgets/image-with-fallback/ImageWithFallback'
import {
  clickToRemoveSelectionTooltipLabel,
  clickToSelectTooltipLabel,
  clickToStartCookingTooltipLabel
} from './labels'

export const photoRepresentationDataTestId = 'card-representation'

const CARD_HEIGHT = 175
const SPACING = 10
const BORDER_RADIUS = 8
const IMAGE_HEIGHT = 150
const CARD_WIDTH = 170

export type RecipeForPhotoCardProps = {
  recipe: Recipe
  onPickRecipeChanged: () => void
  isPicked: boolean
  index: number
  navigateToRecipe: () => void
}

const PhotoCardRecipe = ({
  recipe,
  onPickRecipeChanged,
  isPicked,
  navigateToRecipe,
  index
}: RecipeForPhotoCardProps) => {
  const { playSound } = useContext(SoundServiceContext)

  const toggleIsPickedWithSound = () => {
    const soundType = isPicked ? SoundType.NEGATIVE : SoundType.POSITIVE
    playSound(soundType)
    onPickRecipeChanged()
  }

  const mainPhotoUrl = (recipe.photos ?? []).find((photo) => photo.isMainPhoto)?.url

  return (
    <Flex {...outerCss(isPicked)} data-testid={photoRepresentationDataTestId}>
      <Tooltip
        label={isPicked ? clickToRemoveSelectionTooltipLabel : clickToSelectTooltipLabel}
        {...tooltipCss}
        offset={[0, -IMAGE_HEIGHT / 2]}
      >
        <div>
          <ImageWithFallback
            mainPhotoUrl={mainPhotoUrl}
            fallbackIcon={FallbackIcon.FOOD}
            borderRadius={isPicked ? `${BORDER_RADIUS}px ${BORDER_RADIUS}px 0px 0px` : '0px'}
            imageHeight={IMAGE_HEIGHT}
            imageWidth={CARD_WIDTH}
            onClick={toggleIsPickedWithSound}
            imageAlt={recipe.title}
            index={index}
          />
        </div>
      </Tooltip>

      <Flex {...titleBoxCss(isPicked)} onKeyDown={navigateToRecipe} onClick={navigateToRecipe}>
        <Tooltip label={clickToStartCookingTooltipLabel} {...tooltipCss} placement="bottom-start">
          {recipe.title}
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default PhotoCardRecipe

const outerCss = (isPicked: boolean) => {
  return {
    width: `${CARD_WIDTH}px`,
    height: `${CARD_HEIGHT}px`,
    borderRadius: `${BORDER_RADIUS}px`,
    marginRight: '3px',
    marginLeft: '3px',
    marginBottom: `${SPACING}px`,
    position: 'relative' as ChakraProps['position'],
    backgroundColor: isPicked ? Shades.VERY_DARK : 'transparent',
    flexDirection: 'column' as ChakraProps['flexDirection']
  }
}

const titleBoxCss = (isPicked: boolean) => {
  return {
    color: isPicked ? Shades.VERY_PALE : Shades.VERY_DARK,
    fontWeight: 'bold',
    fontSize: '12px',
    height: `${CARD_HEIGHT - IMAGE_HEIGHT - 10}px`,
    marginLeft: '6px',
    marginRight: '2px',
    marginTop: '3px',
    overflow: 'hidden',
    _hover: {
      textDecoration: 'underline'
    }
  }
}
