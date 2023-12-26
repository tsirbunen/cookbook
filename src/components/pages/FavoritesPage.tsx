/** @jsxImportSource @emotion/react */
import AppLayout from '../../layout/AppLayout'
import { css } from '@emotion/react'

const FavoritesPage = () => {
  return (
    <AppLayout>
      <div css={container}>
        <div>FAVORITES</div>
        <p>Content coming later</p>
      </div>
    </AppLayout>
  )
}

export default FavoritesPage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
