/** @jsxImportSource @emotion/react */
import RecipeCard from './RecipePhotoCard'
import { css } from '@emotion/react'

const RecipesPhotoCardsView = () => {
  const cardIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  return (
    <div css={grid}>
      {cardIndexes.map((index) => {
        return <RecipeCard key={`card_index-${index}`} />
      })}
    </div>
  )
}

export default RecipesPhotoCardsView

const grid = css`
  display: flex;
  flex-wrap: wrap;
`
