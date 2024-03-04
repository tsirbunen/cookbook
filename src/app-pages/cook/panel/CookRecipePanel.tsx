/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import { Recipe } from '../../../types/graphql-schema-types.generated'

type RecipePanelProps = {
  recipe: Recipe
}

const CookRecipePanel = ({ recipe }: RecipePanelProps) => {
  const items = []
  const count = recipe.title === '1: Truly delicious falafels' ? 100 : 25
  for (let i = 0; i < count; i++) {
    items.push(<div key={i}>Test item {i}</div>)
  }
  return (
    <div css={container}>
      {recipe.title}
      {items}
    </div>
  )
}

export default CookRecipePanel

const container = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`
