/** @jsxImportSource @emotion/react */
import AppLayout from '../../layout/AppLayout'
import { css } from '@emotion/react'

const RecipesPage = () => {
  return (
    <AppLayout>
      <div css={container}>
        <div>RECIPES</div>
        <p>Content coming later</p>
      </div>
    </AppLayout>
  )
}

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`

export default RecipesPage
