import { useContext } from 'react'
import AppLayout from './layout/AppLayout'
import ViewSizeContextProvider, { ViewMode, ViewSizeContext } from './contexts/ViewSizeContext'

const App = () => {
  return (
    <ViewSizeContextProvider>
      <AppContent />
    </ViewSizeContextProvider>
  )
}

const AppContent = () => {
  const { viewMode, maxPanelsCount } = useContext(ViewSizeContext)

  const tooSmallView = maxPanelsCount === 0
  if (tooSmallView) {
    return <div>TOO SMALL VIEW !</div>
  }

  const showNavBar = viewMode !== ViewMode.MOBILE
  const showMiddlePanel = maxPanelsCount > 1
  const showRightPanel = maxPanelsCount > 2

  return (
    <AppLayout
      header={<div>COOKBOOK</div>}
      navBar={showNavBar ? <div>N</div> : undefined}
      leftContent={<div>LEFT</div>}
      middleContent={showMiddlePanel ? <div>MIDDLE</div> : undefined}
      rightContent={showRightPanel ? <div>RIGHT</div> : undefined}
    />
  )
}

export default App
