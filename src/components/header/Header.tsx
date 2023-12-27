/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { ColorCodes } from '../../theme/theme'
import MenuIconWithoutAction from './MenuIconWithoutAction'
import NavigationDrawer from '../../navigation/navigation-drawer/NavigationDrawer'
import { appTitle } from '../../../app/page'

type HeaderProps = {
  isMobile: boolean
}

export const headerHeight = 50

/**
 * The header is the topmost component of the app UI. It contains the app title and
 * a menu icon. If the use mode is mobile, then the menu icon can be clicked to open
 * a navigation drawer. Otherwise the menu icon is just an icon without action.
 */
const Header = ({ isMobile }: HeaderProps) => {
  return (
    <div css={outerContainer}>
      <div css={container}>
        {isMobile ? <NavigationDrawer /> : <MenuIconWithoutAction />}
        <div css={titleContainer}>{appTitle}</div>
      </div>
    </div>
  )
}

export default Header

const outerContainer = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: start;
  align-content: center;
  width: 100%;
`

const container = css`
  display: flex;
  flex-direction: row;
  align-content: center;
  width: 100%;
  height: ${headerHeight}px;
  background-color: ${ColorCodes.MEDIUM};
`

const titleContainer = css`
  display: flex;
  flex-direction: column;
  align-content: center;
  height: 100%;
  justify-content: center;
  margin-left: 20px;
  font-size: 1.5em;
  color: ${ColorCodes.VERY_PALE};
  font-weight: bold;
`
