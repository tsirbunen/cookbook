/** @jsxImportSource @emotion/react */
import AppLayout from '../../layout/AppLayout'
import { css } from '@emotion/react'

const SettingsPage = () => {
  return (
    <AppLayout>
      <div css={container}>
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
