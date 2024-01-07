/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import RecipeSummary from './RecipeSummary'

const RecipesSummariesView = () => {
  const cardIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  return (
    <div css={container}>
      {cardIndexes.map((index) => {
        return <RecipeSummary key={`list_index-${index}`} />
      })}
    </div>
  )
}

export default RecipesSummariesView

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  max-width: 750px;
`
