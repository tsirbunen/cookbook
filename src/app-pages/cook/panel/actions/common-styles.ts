import { css } from '@emotion/react'
import { Shades } from '../../../../constants/shades'

export const outerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-top: -3px;
`
export const innerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${Shades.DARK};
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
