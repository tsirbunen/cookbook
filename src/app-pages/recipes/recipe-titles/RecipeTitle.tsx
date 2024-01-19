/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ColorCodes } from '../../../theme/theme'
import CheckboxCustomized from '../../../components/checkbox/CheckboxCustomized'

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
        <CheckboxCustomized isChecked={isPicked} onChange={() => onPickRecipeChanged(id, category)} />
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
  background-color: ${isPicked ? ColorCodes.MEDIUM : 'transparent'};
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
