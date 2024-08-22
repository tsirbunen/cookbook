/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Title, { TitleVariant } from '../../../../widgets/titles/Title'

export const recipeTitle = 'recipe-title'

type RecipeTitleProps = {
  title: string
}

const RecipeTitle = ({ title }: RecipeTitleProps) => {
  return (
    <div css={container} data-testid={recipeTitle}>
      <Title title={title} variant={TitleVariant.Medium} />
    </div>
  )
}

export default RecipeTitle

const container = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  margin-left: 50px;
  margin-right: 50px;
  padding-top: 15px;
  text-align: center;
`
