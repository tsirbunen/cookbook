/** @jsxImportSource @emotion/react */
'use client'
import { useContext } from 'react'
import { css } from '@emotion/react'
import HeaderWithOptionalToggles from '../widgets/header-with-optional-toggles/HeaderWithOptionalToggles'

import { ViewSizeContext } from '../app-layout/ViewSizeProvider'
import ErrorPage from '../navigation/router/ErrorPage'
import NavigationBar from '../navigation/navigation-bar/NavigationBar'
import { usePathname } from 'next/navigation'

const tooSmallWindowMessage = 'Too small window...'
const root = '/'

type AppLayoutProps = {
  children: JSX.Element | React.ReactNode
}

/**
 * Component that takes care of the app layout as a whole: At the top there is a header. If the app is
 * not used in mobile mode, then there is a vertical navigation bar to the left of the main content.
 * The main content is the children passed to the layout component (and the children vary depending on
 * which page the user has navigated to).
 */
const AppLayout = ({ children }: AppLayoutProps) => {
  const { isMobile, isTooSmallWindow } = useContext(ViewSizeContext)
  const pathname = usePathname()

  if (isTooSmallWindow) {
    return <ErrorPage message={tooSmallWindowMessage} />
  }

  if (pathname === root) {
    return <div css={app}>{children}</div>
  }

  return (
    <div css={app}>
      <HeaderWithOptionalToggles />

      <div css={content}>
        <NavigationBar isMobile={isMobile} />
        {children}
      </div>
    </div>
  )
}

export default AppLayout

const app = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: start;
  flex: 1;
  height: 100vh;
  width: 100vw;
`

const content = css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: center;
  width: 100%;
  height: 100%;
`
