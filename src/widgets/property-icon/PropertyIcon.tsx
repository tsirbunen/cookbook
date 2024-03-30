/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ColorCodes } from '../../theme/theme'
import { TbCooker, TbStar, TbStarFilled, TbTag } from 'react-icons/tb'
import { FaTag } from 'react-icons/fa6'
import { IconType } from 'react-icons'

export enum PropertyVariant {
  Favorite = 'Favorite',
  Oven = 'Oven',
  Tag = 'Tag'
}

const propertyIcons: Record<PropertyVariant, { filled: IconType; empty?: IconType }> = {
  [PropertyVariant.Favorite]: { filled: TbStarFilled, empty: TbStar },
  [PropertyVariant.Oven]: { filled: TbCooker },
  [PropertyVariant.Tag]: { filled: FaTag, empty: TbTag }
}

type PropertyIconProps = {
  isSelected: boolean
  property: PropertyVariant
  isCentered?: boolean
}

const PropertyIcon = ({ property, isSelected, isCentered = false }: PropertyIconProps) => {
  const icons = propertyIcons[property]
  const PropertyIcon = isSelected ? icons.filled : icons.empty
  if (!PropertyIcon) return null

  return (
    <div css={containerCss(isSelected, isCentered)}>
      <PropertyIcon fontSize="1.3em" strokeWidth="2" />
    </div>
  )
}

export default PropertyIcon

const containerCss = (isSelected: boolean, isCentered: boolean) => css`
  width: 28px;
  height: 28px;
  background-color: ${isSelected ? ColorCodes.DARK : ColorCodes.DARK};
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${ColorCodes.VERY_PALE};
  margin-right: ${isCentered ? 3 : 7}px;
  margin-left: ${isCentered ? 3 : 0}px;
`
