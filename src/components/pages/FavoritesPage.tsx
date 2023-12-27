/** @jsxImportSource @emotion/react */
import AppLayout from '../../layout/AppLayout'
import { css } from '@emotion/react'
import { Page } from '../navigation/router/router'

const FavoritesPage = () => {
  return (
    <AppLayout>
      <div css={container} data-cy={`${Page.FAVORITES}-page`}>
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
