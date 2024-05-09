import { css } from '@emotion/react'
import { ColorCodes } from '../../../../theme/theme'

export const outerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 3px;
  border-radius: 4px;
`
export const innerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${ColorCodes.VERY_DARK};
  color: ${ColorCodes.VERY_PALE};
  padding: 0px 5px 0px 5px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.8em;
`

export const timeInnerCss = css`
  ${innerCss}
  min-width: 45px;
  padding: 0px 3px 0px 3px;
`
