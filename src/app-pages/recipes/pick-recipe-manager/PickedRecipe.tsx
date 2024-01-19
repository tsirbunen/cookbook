/** @jsxImportSource @emotion/react */

import { ColorCodes } from '../../../theme/theme'
import CheckboxCustomized from '../../../components/checkbox/CheckboxCustomized'
import { css } from '@emotion/react'

type PickedRecipeProps = {
  title: string
  onChange: () => void
}

const PickedRecipe = ({ title, onChange }: PickedRecipeProps) => {
  return (
    <div css={container}>
      <div css={pickerContainer}>
        <CheckboxCustomized isChecked={true} onChange={onChange} />
      </div>
      <div css={titleContainer}>{title}</div>
    </div>
  )
}

export default PickedRecipe

const container = css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-left: 5px;
  margin-bottom: 5px;
`

const pickerContainer = css`
  margin-right: 10px;
`

const titleContainer = css`
  color: ${ColorCodes.VERY_DARK};
  font-weight: bold;
  font-size: 0.9em;
  margin-right: 10px;
  &:hover {
    text-decoration: underline;
  }
`
