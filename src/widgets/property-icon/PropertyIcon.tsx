/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ColorCodes } from '../../theme/theme'
import { TbCooker, TbStar, TbStarFilled } from 'react-icons/tb'
import { IconType } from 'react-icons'

export enum PropertyVariant {
  Favorite = 'Favorite',
  Oven = 'Oven'
}

const propertyIcons: Record<PropertyVariant, { filled: IconType; empty?: IconType }> = {
  [PropertyVariant.Favorite]: { filled: TbStarFilled, empty: TbStar },
  [PropertyVariant.Oven]: { filled: TbCooker }
}

type PropertyIconProps = {
  isSelected: boolean
  property: PropertyVariant
}

const PropertyIcon = ({ property, isSelected }: PropertyIconProps) => {
  const icons = propertyIcons[property]
  const PropertyIcon = isSelected ? icons.filled : icons.empty
  if (!PropertyIcon) return null

  return (
    <div css={containerCss(isSelected)}>
      <PropertyIcon fontSize="1.3em" strokeWidth="2" />
    </div>
  )
}

export default PropertyIcon

const containerCss = (isSelected: boolean) => css`
  width: 28px;
  height: 28px;
  background-color: ${isSelected ? ColorCodes.DARK : ColorCodes.DARK};
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${ColorCodes.VERY_PALE};
  margin-right: 5px;
`
