/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { usePathname } from 'next/navigation'
import { HEADER_HEIGHT, NAV_BAR_WIDTH } from '../../constants/layout'
import { Shades } from '../../constants/shades'
import { APP_TITLE } from '../../constants/text-content'
import { headerZIndex } from '../../constants/z-indexes'
import { getRouteLabelByPath } from '../../navigation/page-paths'

export const toolsElementId = 'toolsElementId'

/**
 * The header is the topmost component of the app UI. It contains the app title,
 * the current page label, and a menu icon. The menu icon is just an icon without action.
 * The header can also contain a target for a portal into which other components can send
 * JSX content through createPortal. The content is expected to contain action buttons
 * (i.e. toggles) related to page content.
 */
const HeaderWithToggles = () => {
  const path = usePathname()
  const label = getRouteLabelByPath(path)

  return (
    <div css={outerCss(HEADER_HEIGHT)}>
      <div css={middleCss}>
        <div css={innerCss}>
          <div css={locationCss}>
            <div css={titleCss}>{APP_TITLE}</div>
            <div css={pageCss}>{label?.toUpperCase()}</div>
          </div>
          <div css={toolsCss}>
            <div id={toolsElementId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderWithToggles

const outerCss = (height: number) => css`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  padding-left: ${NAV_BAR_WIDTH}px;
  z-index: ${headerZIndex};
  height: ${height}px;
  background-color: ${Shades.VERY_DARK};
`

const middleCss = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: space-between;
`

const innerCss = css`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const locationCss = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-left: 10px;
  width: 100%;
  font-weight: bold;
  padding-left: ${NAV_BAR_WIDTH};
`

const titleCss = css`
  font-size: 1.2em;
  color: ${Shades.MEDIUM};
  font-weight: bold;
`

const pageCss = css`
  font-size: 1.4em;
  color: ${Shades.VERY_PALE};
  margin-top: -5px;
  font-weight: bold;
`

const toolsCss = css`
  margin-right: 10px;
`
