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
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  margin-left: 25px;
  margin-right: 25px;
  padding-top: 15px;
  text-align: center;
`
