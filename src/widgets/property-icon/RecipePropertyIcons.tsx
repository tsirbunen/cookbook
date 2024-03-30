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
  const isCentered = justifyContent === 'center'
  return (
    <div css={bottomContainer(justifyContent)}>
      <PropertyIcon property={PropertyVariant.Favorite} isSelected={isFavorite} isCentered={isCentered} />
      <PropertyIcon property={PropertyVariant.Oven} isSelected={ovenNeeded} isCentered={isCentered} />
      <PropertyIcon property={PropertyVariant.Tag} isSelected={hasTags} isCentered={isCentered} />
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
