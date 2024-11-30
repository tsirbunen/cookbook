/** @jsxImportSource @emotion/react */
'use client'
import { css } from '@emotion/react'
import { useContext } from 'react'
import HeaderWithToggles from '../../widgets/header-with-optional-toggles/HeaderWithToggles'

import { usePathname } from 'next/navigation'
import NavigationBar from '../../navigation/NavigationBar'
import ErrorPage from '../../widgets/error-page/ErrorPage'
import { ViewSizeContext } from '../view-size-service/ViewSizeProvider'

const tooSmallWindowMessage = 'Not available for such a small window yet'
const root = '/'

type MainAppLayoutProps = {
  children: JSX.Element | React.ReactNode
}

/**
 * Component that takes care of the app layout as a whole: At the top there is a header. If the app is
 * not used in mobile mode, then there is a vertical navigation bar to the left of the main content.
 * The main content is the children passed to the layout component (and the children vary depending on
 * which page the user has navigated to).
 */
const MainAppLayout = ({ children }: MainAppLayoutProps) => {
  const { isTooSmallWindow } = useContext(ViewSizeContext)

  const pathname = usePathname()

  if (isTooSmallWindow) {
    return <ErrorPage message={tooSmallWindowMessage} />
  }

  if (pathname === root) {
    return <div css={app}>{children}</div>
  }

  return (
    <div css={app}>
      <HeaderWithToggles />

      <div css={content}>
        <NavigationBar isTooSmallWindow={isTooSmallWindow} />
        {children}
      </div>
    </div>
  )
}

export default MainAppLayout

const app = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: start;
  flex: 1;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
`

const content = css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: center;
  width: 100%;
  height: 100%;
`
