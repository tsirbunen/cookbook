/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Page } from '../navigation/router/router'

const CookPage = () => {
  return (
    <div css={container} data-cy={`${Page.COOK}-page`}>
      <div>COOKING</div>
      <p>Content coming later</p>
    </div>
  )
}

export default CookPage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
