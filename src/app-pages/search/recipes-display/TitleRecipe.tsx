import { type ChakraProps, Flex, Tooltip } from '@chakra-ui/react'
import { useContext } from 'react'
import { Shades } from '../../../constants/shades'
import { SoundServiceContext, SoundType } from '../../../sounds/SoundProvider'
import CheckboxWithTheme from '../../../theme/checkboxes/CheckboxWithTheme'
import type { Recipe } from '../../../types/graphql-schema-types.generated'
import { tooltipCss } from '../../../utils/styles'
import TitleWithLink from '../../../widgets/titles/TitleWithLink'
import {
  clickToRemoveSelectionTooltipLabel,
  clickToSelectTooltipLabel,
  clickToStartCookingTooltipLabel
} from './labels'

export const titleRepresentationDataTestId = 'title-representation'

export type TitleRecipeProps = {
  recipe: Recipe
  onPickRecipeChanged: () => void
  isPicked: boolean
  showBackground: boolean
  index: number
  confirmNewPosition?: (recipeId: number) => void
  onTargetChanged?: (direction?: 'up' | 'down', index?: number) => void
  navigateToRecipe: () => void
}

const TitleRecipe = ({ recipe, isPicked, onPickRecipeChanged, navigateToRecipe, showBackground }: TitleRecipeProps) => {
  const { playSound } = useContext(SoundServiceContext)

  const toggleIsPickedWithSound = () => {
    const soundType = isPicked ? SoundType.NEGATIVE : SoundType.POSITIVE
    playSound(soundType)
    onPickRecipeChanged()
  }

  const { title } = recipe

  return (
    <Flex {...outerCss(isPicked && showBackground)} data-testid={titleRepresentationDataTestId}>
      <Tooltip
        label={isPicked ? clickToRemoveSelectionTooltipLabel : clickToSelectTooltipLabel}
        {...tooltipCss}
        placement="bottom-start"
      >
        <div>
          <CheckboxWithTheme isChecked={isPicked} onChange={toggleIsPickedWithSound} />
        </div>
      </Tooltip>

      <Flex onKeyDown={navigateToRecipe} onClick={navigateToRecipe}>
        <Tooltip label={clickToStartCookingTooltipLabel} {...tooltipCss} placement="bottom-start">
          <div>
            <TitleWithLink title={title} url="TODO" />
          </div>
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default TitleRecipe

const outerCss = (showBackground: boolean) => {
  return {
    display: 'flex',
    flexDirection: 'row' as ChakraProps['flexDirection'],
    justifyContent: 'start',
    alignItems: 'center',
    color: Shades.VERY_DARK,
    padding: `${showBackground ? 4 : 2}px 8px`,
    borderRadius: 6,
    height: 40,
    touchaction: 'none',
    width: '100%',
    flex: 1
  }
}
