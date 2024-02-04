/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ColorCodes } from '../../../../theme/theme'
import CheckboxWithTheme from '../../../../theme/checkboxes/CheckboxWithTheme'

export type RecipeTitleProps = {
  id: number
  title: string
  category: string
  onPickRecipeChanged: (recipeId: number, category: string) => void
  isPicked: boolean
}

const RecipeTitle = ({ id, title, isPicked, onPickRecipeChanged, category }: RecipeTitleProps) => {
  return (
    <div css={container(isPicked)}>
      <div css={pickerContainer}>
        <CheckboxWithTheme isChecked={isPicked} onChange={() => onPickRecipeChanged(id, category)} />
      </div>
      <div css={titleContainer}>{title}</div>
    </div>
  )
}

export default RecipeTitle

const container = (isPicked: boolean) => css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-left: 5px;
  margin-bottom: 2px;
  color: ${ColorCodes.VERY_DARK};
  background-color: ${isPicked ? ColorCodes.PALE : 'transparent'};
  padding: 4px 6px;
  border-radius: 6px;
`

const pickerContainer = css`
  margin-right: 10px;
`

const titleContainer = css`
  font-weight: bold;
  font-size: 0.9em;
  margin-right: 10px;
  &:hover {
    text-decoration: underline;
  }
`
