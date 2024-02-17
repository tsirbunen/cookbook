/** @jsxImportSource @emotion/react */
import { useContext } from 'react'
import { ViewSizeContext } from '../../app-layout/ViewSizeProvider'
import AppContent from '../../app-layout/AppContent'
import { Page } from '../../navigation/router/router'

const FavoritesPage = () => {
  const { isMobile, maxPanelsCount } = useContext(ViewSizeContext)
  const showMiddlePanel = maxPanelsCount > 1
  const showRightPanel = maxPanelsCount > 2

  return (
    <AppContent
      hasNavBar={!isMobile}
      leftContent={
        <div style={{ backgroundColor: 'pink' }} data-testid={`${Page.FAVORITES}-page`}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>LEFT</h1> <div>content</div>
        </div>
      }
      middleContent={
        showMiddlePanel ? (
          <div style={{ backgroundColor: 'aquamarine' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>MIDDLE</h1>
            <div>content</div>
            <div>content</div>
          </div>
        ) : undefined
      }
      rightContent={
        showRightPanel ? (
          <div style={{ backgroundColor: 'pink' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>RIGHT</h1>
            <div>content</div>
            <div>content</div>
            <div>content</div>
          </div>
        ) : undefined
      }
    />
  )
}

export default FavoritesPage
