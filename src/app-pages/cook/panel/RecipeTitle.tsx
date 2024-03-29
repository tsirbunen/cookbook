/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Title, { TitleVariant } from '../../../widgets/titles/Title'

type RecipeTitleProps = {
  title: string
}

const RecipeTitle = ({ title }: RecipeTitleProps) => {
  return (
    <div css={container}>
      <Title title={title} variant={TitleVariant.Medium} />
    </div>
  )
}

export default RecipeTitle

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
`
