/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import { Recipe } from '../../../types/graphql-schema-types.generated'

import RecipeTitle from './RecipeTitle'
import RecipePhotos from './RecipePhotos'

type RecipePanelProps = {
  recipe?: Recipe
}

const CookRecipePanel = ({ recipe }: RecipePanelProps) => {
  if (!recipe) return null

  const items = []
  const count = recipe.title === '1: Truly delicious falafels' ? 100 : 50
  for (let i = 0; i < count; i++) {
    items.push(<div key={i}>Test item {i}</div>)
  }
  return (
    <div css={container}>
      <RecipePhotos title={recipe.title} />
      <RecipeTitle title={recipe.title} />

      {items}
    </div>
  )
}

export default CookRecipePanel

const container = css`
  width: 100%;
`
