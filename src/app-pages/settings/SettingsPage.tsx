/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Page } from '../../navigation/router/router'

const SettingsPage = () => {
  return (
    <div css={container} data-testid={`${Page.SETTINGS}-page`}>
      <div>SETTINGS</div>
      <p>Content coming later</p>
    </div>
  )
}

export default SettingsPage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
