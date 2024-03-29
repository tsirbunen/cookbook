/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Page } from '../../navigation/router/router'

const WizardPage = () => {
  return (
    <div css={container} data-testid={`${Page.WIZARD}-page`}>
      <div>WIZARD</div>
      <p>Content coming later</p>
    </div>
  )
}

export default WizardPage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
