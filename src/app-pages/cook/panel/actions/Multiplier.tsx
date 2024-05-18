/** @jsxImportSource @emotion/react */

import { innerCss, outerCss } from './common-styles'

const Multiplier = ({ multiplier }: { multiplier: number }) => {
  const displayText = `${toFixedWithoutZeros(multiplier)} X`

  return (
    <div css={outerCss}>
      <div css={innerCss}>{displayText}</div>
    </div>
  )
}

export default Multiplier

const toFixedWithoutZeros = (value: number) => {
  const precision = getPrecision(value)
  return `${Number.parseFloat(value.toFixed(precision))}`
}

const getPrecision = (value: number) => {
  if (value > 10) return 0
  if (value > 2) return 1
  return 2
}
