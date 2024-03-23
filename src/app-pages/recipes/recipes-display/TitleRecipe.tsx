/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

import { ColorCodes } from '../../../theme/theme'
import CheckboxWithTheme from '../../../theme/checkboxes/CheckboxWithTheme'
import TitleWithLink from '../../../widgets/titles/TitleWithLink'
import { Recipe } from '../../../types/graphql-schema-types.generated'

export const titleRepresentationDataTestId = 'title-representation'

export type TitleRecipeProps = {
  recipe: Recipe
  onPickRecipeChanged: () => void
  isPicked: boolean
  showBackground: boolean
  index: number
  confirmNewPosition?: (recipeId: number) => void
  onTargetChanged?: (direction?: 'up' | 'down', index?: number) => void
}

const TitleRecipe = ({ recipe, isPicked, onPickRecipeChanged, showBackground }: TitleRecipeProps) => {
  const { title } = recipe

  return (
    <div css={outerCss(isPicked && showBackground)} data-testid={titleRepresentationDataTestId}>
      <CheckboxWithTheme isChecked={isPicked} onChange={onPickRecipeChanged} />

      <TitleWithLink title={title} url="TODO" />
    </div>
  )
}

export default TitleRecipe

const outerCss = (showBackground: boolean) => css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  color: ${ColorCodes.VERY_DARK};
  padding: ${showBackground ? 4 : 1}px 6px;
  border-radius: 6px;
  height: ${40}px;
  touch-action: none;
  width: 100%;
  flex: 1;
`
