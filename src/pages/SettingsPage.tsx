/** @jsxImportSource @emotion/react */
import AppLayout from '../layout/AppLayout'
import { css } from '@emotion/react'
import { Page } from '../navigation/router/router'

const SettingsPage = () => {
  return (
    <AppLayout>
      <div css={container} data-cy={`${Page.SETTINGS}-page`}>
        <div>SETTINGS</div>
        <p>Content coming later</p>
      </div>
    </AppLayout>
  )
}

export default SettingsPage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
