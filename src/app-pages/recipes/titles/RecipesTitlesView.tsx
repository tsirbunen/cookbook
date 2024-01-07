/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import RecipeTitle from './RecipeTitle'

const RecipesTitlesView = () => {
  const cardIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  return (
    <div css={container}>
      {cardIndexes.map((index) => {
        return <RecipeTitle key={`card_index-${index}`} />
      })}
    </div>
  )
}

export default RecipesTitlesView

const container = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`
