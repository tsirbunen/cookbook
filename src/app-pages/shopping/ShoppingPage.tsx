/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Page } from '../../navigation/router/router'

const ShoppingPage = () => {
  return (
    <div css={container} data-testid={`${Page.SHOPPING}-page`}>
      <div>SHOPPING</div>
      <p>Content coming later</p>
    </div>
  )
}

export default ShoppingPage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
