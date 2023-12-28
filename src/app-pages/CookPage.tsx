/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Page } from '../navigation/router/router'
import { useContext } from 'react'
import { RecipeServiceContext } from '../recipes-service/RecipeServiceProvider'

const CookPage = () => {
  const { pingStatus } = useContext(RecipeServiceContext)

  return (
    <div css={container} data-cy={`${Page.COOK}-page`}>
      <div>COOKING</div>
      <p>Content coming later</p>
      <p>{`PING STATUS: ${pingStatus}`}</p>
    </div>
  )
}

export default CookPage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
