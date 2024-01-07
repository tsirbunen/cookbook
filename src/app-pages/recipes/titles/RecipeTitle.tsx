/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ColorCodes } from '../../../theme/theme'
import PickRecipe from '../../../components/checkbox/CheckboxCustomized'

const RecipeTitle = () => {
  const isFavorite = Math.random() > 0.5
  const title = isFavorite
    ? 'Lemon pie with Swiss meringue topping'
    : 'Really delicious Lemon pie with Swiss meringue topping'

  return (
    <div css={container}>
      <div css={pickerContainer}>
        <PickRecipe />
      </div>
      <div css={titleContainer}>{title}</div>
    </div>
  )
}

export default RecipeTitle

const container = css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-left: 5px;
  margin-bottom: 10px;
`

const pickerContainer = css`
  margin-right: 10px;
`

const titleContainer = css`
  color: ${ColorCodes.VERY_DARK};
  font-weight: bold;
  font-size: 0.9em;
  margin-right: 10px;
  &:hover {
    text-decoration: underline;
  }
`
