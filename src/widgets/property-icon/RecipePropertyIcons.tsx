/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react'
import PropertyIcon, { PropertyVariant } from './PropertyIcon'

type RecipePropertyIconsProps = {
  isFavorite: boolean
  ovenNeeded: boolean
  hasTags: boolean
  justifyContent: 'center' | 'start'
}

const RecipePropertyIcons = ({ isFavorite, ovenNeeded, hasTags, justifyContent }: RecipePropertyIconsProps) => {
  return (
    <div css={bottomContainer(justifyContent)}>
      <PropertyIcon property={PropertyVariant.Favorite} isSelected={isFavorite} />
      <PropertyIcon property={PropertyVariant.Oven} isSelected={ovenNeeded} />
      <PropertyIcon property={PropertyVariant.Tag} isSelected={hasTags} />
    </div>
  )
}

export default RecipePropertyIcons

const bottomContainer = (justifyContent: 'center' | 'start') => css`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: ${justifyContent};
`
