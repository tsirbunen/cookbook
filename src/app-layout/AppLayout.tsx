/** @jsxImportSource @emotion/react */
'use client'
import { useContext } from 'react'
import { css } from '@emotion/react'
import Header from '../components/header/Header'

import { ViewSizeContext } from '../app-layout/ViewSizeProvider'
import ErrorPage from '../navigation/router/ErrorPage'
import NavigationBar from '../navigation/navigation-bar/NavigationBar'
import { usePathname } from 'next/navigation'

const tooSmallWIndowMessage = 'Too small window...'
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
    return <ErrorPage message={tooSmallWIndowMessage} />
  }

  if (pathname === root) {
    return <div css={app}>{children}</div>
  }

  return (
    <div css={app}>
      <Header isMobile={isMobile} />

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
  flex-wrap: wrap;
  justify-content: start;
  align-content: start;
`

const content = css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: center;
  width: 100%;
`
