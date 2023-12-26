/** @jsxImportSource @emotion/react */
import AppLayout from '../../layout/AppLayout'
import { css } from '@emotion/react'

const CookPage = () => {
  return (
    <AppLayout>
      <div css={container}>
        <div>COOKING</div>
        <p>Content coming later</p>
      </div>
    </AppLayout>
  )
}

export default CookPage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
