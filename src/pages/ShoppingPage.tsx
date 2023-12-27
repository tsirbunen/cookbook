/** @jsxImportSource @emotion/react */
import AppLayout from '../layout/AppLayout'
import { css } from '@emotion/react'
import { Page } from '../navigation/router/router'

const ShoppingPage = () => {
  return (
    <AppLayout>
      <div css={container} data-cy={`${Page.SHOPPING}-page`}>
        <div>SHOPPING</div>
        <p>Content coming later</p>
      </div>
    </AppLayout>
  )
}

export default ShoppingPage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
