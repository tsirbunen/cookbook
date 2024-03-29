/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Page } from '../../navigation/router/router'

const FavoritesPage = () => {
  return (
    <div css={container} data-testid={`${Page.FAVORITES}-page`}>
      <div>SETTINGS</div>
      <p>Content coming later</p>
    </div>
  )
}

export default FavoritesPage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
