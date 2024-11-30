/* eslint-disable @next/next/no-img-element */

import { type ChakraProps, Flex, Tooltip } from '@chakra-ui/react'
import { useContext } from 'react'
import { Shades } from '../../../constants/shades'
import { SoundServiceContext, SoundType } from '../../../sounds/SoundProvider'
import CheckboxWithTheme from '../../../theme/checkboxes/CheckboxWithTheme'
import type { Recipe } from '../../../types/graphql-schema-types.generated'
import { tooltipCss } from '../../../utils/styles'
import CustomDivider from '../../../widgets/divider/CustomDivider'
import ImageWithFallback, { FallbackIcon } from '../../../widgets/image-with-fallback/ImageWithFallback'
import RecipePropertyIcons from '../../../widgets/property-icon/RecipePropertyIcons'
import {
  clickToRemoveSelectionTooltipLabel,
  clickToSelectTooltipLabel,
  clickToStartCookingTooltipLabel
} from './labels'

export const summaryRepresentationDataTestId = 'summary-representation'

export type SummaryRecipeProps = {
  recipe: Recipe
  onPickRecipeChanged: () => void
  isPicked: boolean
  isFavorite?: boolean
  index: number
  navigateToRecipe: () => void
}

const imageWidth = 110
const imageHeight = 120
const borderRadius = 6

const SummaryRecipe = ({
  recipe,
  onPickRecipeChanged,
  isPicked,
  isFavorite,
  navigateToRecipe,
  index
}: SummaryRecipeProps) => {
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
    <Flex {...outerCss}>
      {index === 0 ? null : <CustomDivider marginTop="0px" marginBottom="0px" />}

      <Flex {...innerCss} data-testid={summaryRepresentationDataTestId}>
        <Flex {...imageBoxCss(isPicked)} onKeyDown={toggleIsPickedWithSound} onClick={toggleIsPickedWithSound}>
          <ImageWithFallback
            mainPhotoUrl={mainPhotoUrl}
            fallbackIcon={FallbackIcon.FOOD}
            borderRadius={`${borderRadius}px`}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
            imageAlt={recipe.title}
          />
        </Flex>
        <Flex {...middleCss}>
          <Flex {...titleBoxCss} onKeyDown={navigateToRecipe} onClick={navigateToRecipe}>
            <Tooltip label={clickToStartCookingTooltipLabel} {...tooltipCss} placement="bottom-start">
              {title}
            </Tooltip>
          </Flex>

          <Tooltip
            label={isPicked ? clickToRemoveSelectionTooltipLabel : clickToSelectTooltipLabel}
            {...tooltipCss}
            offset={[-50, -50]}
          >
            <Flex {...infoBoxCss} onKeyDown={toggleIsPickedWithSound} onClick={toggleIsPickedWithSound}>
              <Flex {...tagsBoxCss}>
                <Flex>{tagsCombined}</Flex>
              </Flex>

              <RecipePropertyIcons
                isFavorite={isFavorite ?? false}
                ovenNeeded={ovenNeeded}
                hasTags={tags ? tags.length > 0 : false}
                justifyContent="start"
              />

              <Flex {...languageBoxCss}>{language?.language.toUpperCase()}</Flex>
            </Flex>
          </Tooltip>
        </Flex>
        <Flex>{isPicked ? <CheckboxWithTheme isChecked={isPicked} onChange={toggleIsPickedWithSound} /> : null}</Flex>
      </Flex>
    </Flex>
  )
}

export default SummaryRecipe

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection']
}

const middleCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  flex: 1
}

const innerCss = {
  display: 'flex' as ChakraProps['display'],
  flex: 1,
  width: '100%',
  flexDirection: 'row' as ChakraProps['flexDirection'],
  justifyContent: 'start',
  paddingBottom: '10px',
  position: 'relative' as ChakraProps['position'],
  paddingTop: '10px'
}

const imageBoxCss = (isPicked: boolean) => {
  return {
    width: `${imageWidth}px`,
    height: `${imageHeight}px`,
    borderRadius: `${borderRadius}px`,
    marginRight: '15px',
    backgroundColor: isPicked ? Shades.VERY_DARK : 'transparent',
    flexDirection: 'column' as ChakraProps['flexDirection']
  }
}

const infoBoxCss = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column' as ChakraProps['flexDirection'],
  justifyContent: 'start',
  alignItems: 'start'
}

const titleBoxCss = {
  color: Shades.VERY_DARK,
  fontWeight: 'bold',
  fontSize: '0.9em',
  marginBottom: '5px',
  lineHeight: '1.2em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  _hover: {
    textDecoration: 'underline'
  }
}

const tagsBoxCss = {
  color: Shades.MEDIUM,
  fontSize: '0.7em',
  fontWeight: 'bold',
  marginBottom: '5px'
}

const languageBoxCss = {
  color: Shades.SLIGHTLY_DARK,
  fontSize: '0.7em',
  fontWeight: 'bold',
  backgroundColor: Shades.VERY_PALE,
  marginTop: '8px',
  borderRadius: '4px',
  padding: '1px 3px'
}
