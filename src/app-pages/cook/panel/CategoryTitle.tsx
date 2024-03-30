/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { ColorCodes } from '../../../theme/theme'

type CategoryTitleProps = {
  category: string
}

const CategoryTitle = ({ category }: CategoryTitleProps) => {
  return (
    <div css={container}>
      <Title title={category} variant={TitleVariant.Small} color={ColorCodes.MEDIUM} />
    </div>
  )
}

export default CategoryTitle

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
`
