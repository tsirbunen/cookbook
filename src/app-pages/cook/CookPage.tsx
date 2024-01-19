/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Page } from '../../navigation/router/router'
// import { useContext } from 'react'
// import { RecipeServiceContext } from '../recipes-service/RecipeServiceProvider'
// import { useQuery } from '@apollo/client'
// import { AllRecipesDocument, AllRecipesQuery, AllRecipesQueryVariables } from '../recipes-service/queries.generated'

const CookPage = () => {
  // const { pingStatus } = useContext(RecipeServiceContext)

  return (
    <div css={container} data-cy={`${Page.COOK}-page`}>
      <div>COOKING</div>
      <p>Content coming later</p>
      {/* <p>{`PING STATUS: ${pingStatus}`}</p> */}
      {/* <Testing /> */}
    </div>
  )
}

export default CookPage

const container = css`
  margin-top: 30px;
  margin-left: 30px;
`
// const Testing = () => {
//   const { loading, error, data } = useQuery<AllRecipesQuery, AllRecipesQueryVariables>(AllRecipesDocument)

//   const allRecipesResult = loading ? 'loading...' : error ? 'ERROR' : data?.allRecipes.length ?? 0

//   return (
//     <div>
//       <p>{allRecipesResult}</p>
//     </div>
//   )
// }
