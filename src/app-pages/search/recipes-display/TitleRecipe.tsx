/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

import { useContext } from 'react'
import { Shades } from '../../../constants/shades'
import { SoundServiceContext, SoundType } from '../../../sounds/SoundProvider'
import CheckboxWithTheme from '../../../theme/checkboxes/CheckboxWithTheme'
import type { Recipe } from '../../../types/graphql-schema-types.generated'
import TitleWithLink from '../../../widgets/titles/TitleWithLink'

export const titleRepresentationDataTestId = 'title-representation'

export type TitleRecipeProps = {
  recipe: Recipe
  onPickRecipeChanged: () => void
  isPicked: boolean
  showBackground: boolean
  index: number
  confirmNewPosition?: (recipeId: number) => void
  onTargetChanged?: (direction?: 'up' | 'down', index?: number) => void
}

const TitleRecipe = ({ recipe, isPicked, onPickRecipeChanged, showBackground }: TitleRecipeProps) => {
  const { playSound } = useContext(SoundServiceContext)

  const toggleIsPickedWithSound = () => {
    const soundType = isPicked ? SoundType.NEGATIVE : SoundType.POSITIVE
    playSound(soundType)
    onPickRecipeChanged()
  }

  const { title } = recipe

  return (
    <div css={outerCss(isPicked && showBackground)} data-testid={titleRepresentationDataTestId}>
      <CheckboxWithTheme isChecked={isPicked} onChange={toggleIsPickedWithSound} />

      <TitleWithLink title={title} url="TODO" />
    </div>
  )
}

export default TitleRecipe

const outerCss = (showBackground: boolean) => css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  color: ${Shades.VERY_DARK};
  padding: ${showBackground ? 4 : 1}px 6px;
  border-radius: 6px;
  height: ${40}px;
  touch-action: none;
  width: 100%;
  flex: 1;
`
