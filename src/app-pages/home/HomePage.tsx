/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Page } from '../../navigation/router/router'

const HomePage = () => {
  return (
    <div css={container} data-testid={`${Page.HOME}-page`}>
      <div>HOME</div>
      <p>Content coming later</p>
    </div>
  )
}

export default HomePage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
