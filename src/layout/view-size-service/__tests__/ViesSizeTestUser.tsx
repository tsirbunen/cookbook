import { ViewSizeContext } from '../ViewSizeProvider'
import { useContext } from 'react'

export const currentWidthTestId = 'current-width'
export const isSplitViewTestId = 'is-split-view'
export const maxPanelsCountTestId = 'max-panels-count'
export const currentHeightTestId = 'current-height'
export const isTooSmallWindowTestId = 'is-too-small-window'

const ViewSizeTestUser = () => {
  const { windowWidth, windowHeight, maxPanelsCount, isTooSmallWindow, isSplitView } = useContext(ViewSizeContext)
  return (
    <div>
      <p data-testid={currentWidthTestId}>{windowWidth.current}</p>
      <p data-testid={currentHeightTestId}>{windowHeight}</p>
      <p data-testid={isSplitViewTestId}>{isSplitView ? 'true' : 'false'}</p>
      <p data-testid={maxPanelsCountTestId}>{maxPanelsCount}</p>
      <p data-testid={isTooSmallWindowTestId}>{isTooSmallWindow ? 'true' : 'false'}</p>
    </div>
  )
}

export default ViewSizeTestUser
