/** @jsxImportSource @emotion/react */
import AppLayout from '../layout/AppLayout'
import { css } from '@emotion/react'
import { Page } from '../navigation/router/router'

const WizardPage = () => {
  return (
    <AppLayout>
      <div css={container} data-cy={`${Page.WIZARD}-page`}>
        <div>WIZARD</div>
        <p>Content coming later</p>
      </div>
    </AppLayout>
  )
}

export default WizardPage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
