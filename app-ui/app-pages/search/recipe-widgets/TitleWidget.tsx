import { type ChakraProps, Flex, Tooltip } from '@chakra-ui/react'
import { Shades } from '../../../constants/shades'
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

export type TitleWidgetProps = {
  recipe: Recipe
  isPicked: boolean
  showBackground: boolean
  index: number
  confirmNewPosition?: (recipeId: number) => void
  onTargetChanged?: (direction?: 'up' | 'down', index?: number) => void
  navigateToRecipe: () => void
  toggleIsPickedWithSound: () => void
  id: string
  itemHeight?: number
}

const TitleWidget = ({
  recipe,
  isPicked,
  toggleIsPickedWithSound,
  navigateToRecipe,
  showBackground,
  itemHeight,
  id
}: TitleWidgetProps) => {
  return (
    <Flex {...outerCss(isPicked && showBackground, itemHeight)} data-testid={titleRepresentationDataTestId} id={id}>
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
            <TitleWithLink title={recipe.title} url="TODO" />
          </div>
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default TitleWidget

const outerCss = (showBackground: boolean, itemHeight = 40) => {
  return {
    display: 'flex',
    flexDirection: 'row' as ChakraProps['flexDirection'],
    justifyContent: 'start',
    alignItems: 'center',
    color: Shades.VERY_DARK,
    padding: `${showBackground ? 4 : 2}px 8px`,
    borderRadius: 6,
    height: `${itemHeight}px`,
    touchaction: 'none',
    width: '100%',
    flex: 1
  }
}
