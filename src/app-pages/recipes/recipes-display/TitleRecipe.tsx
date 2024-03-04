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
  margin-bottom: 2px;
  color: ${ColorCodes.VERY_DARK};
  background-color: ${showBackground ? ColorCodes.PALE : 'transparent'};
  padding: ${showBackground ? 4 : 1}px 6px;
  border-radius: 6px;
`
