import { useContext, useEffect, useState } from 'react'
import ResizablePanel from './ResizablePanel'
import { ViewSizeContext } from '../view-size-service/ViewSizeProvider'
import { NAV_BAR_WIDTH } from '../../constants/layout'
import { calculateNewPanelWidths, getEvenPanelWidths, getPanelsCount, panelWidthsAreAllowed } from './utils'

type MultiResizablePanelsViewProps = {
  leftContent: JSX.Element
  middleContent?: JSX.Element
  rightContent?: JSX.Element
}

/**
 * Component that takes care of positioning main content on screen as guided by the window width.
 * There might be a vertical navigation bar to the left of this component. App main content
 * can contain be 1-3 panels (arranged horizontally into a row). The widths of the panels
 * can be adjusted within certain limits with resizer elements and by adjusting the window width.
 */
const MultiResizablePanelsView = (props: MultiResizablePanelsViewProps) => {
  const { leftContent, middleContent, rightContent } = props
  const { windowWidth } = useContext(ViewSizeContext)
  const count = getPanelsCount([leftContent, middleContent, rightContent])
  const [panelsCount, setPanelsCount] = useState(count)
  const initialWidths = getEvenPanelWidths(windowWidth.current, panelsCount)
  const [leftPanelWidth, setLeftPanelWidth] = useState(initialWidths.left)
  const [middlePanelWidth, setMiddlePanelWidth] = useState(initialWidths.middle)

  useEffect(() => {
    const panelsCountHasChanged = count !== panelsCount

    const newWidths = calculateNewPanelWidths({
      windowWidth,
      newPanelsCount: count,
      panelsCountHasChanged,
      currentWidths: {
        left: leftPanelWidth,
        middle: getMiddlePanelWidth(count),
        right: getRightPanelWidth(count)
      }
    })

    const newLeftWidth = newWidths.left
    const newMiddleWidth = count > 2 ? newWidths.middle : undefined

    if (newLeftWidth) setLeftPanelWidth(newLeftWidth)
    if (newMiddleWidth) setMiddlePanelWidth(newMiddleWidth)
    if (panelsCountHasChanged) setPanelsCount(count)

    // We want to perform these calculations ONLY when the user adjusts
    // the window width or the count of the content components changes!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, windowWidth])

  const onResizeLeftPanel = (deltaX: number) => {
    setLeftPanelWidth((currentLeftWidth) => {
      const newLeftWidth = currentLeftWidth + deltaX
      if (!panelWidthsAreAllowed(newLeftWidth, middlePanelWidth, panelsCount, windowWidth, Boolean(rightContent)))
        return currentLeftWidth
      return newLeftWidth
    })
  }

  const onResizeMiddlePanel = (deltaX: number) => {
    setMiddlePanelWidth((currentMiddleWidth) => {
      const newMiddleWidth = currentMiddleWidth + deltaX
      if (!panelWidthsAreAllowed(leftPanelWidth, newMiddleWidth, panelsCount, windowWidth, Boolean(rightContent)))
        return currentMiddleWidth
      return newMiddleWidth
    })
  }

  const getMiddlePanelWidth = (panels: number) => {
    if (panels === 3) return middlePanelWidth
    return Math.min(windowWidth.current - NAV_BAR_WIDTH - leftPanelWidth)
  }

  const getRightPanelWidth = (panels: number) => {
    if (panels < 3) return 0
    return Math.min(windowWidth.current - NAV_BAR_WIDTH - leftPanelWidth - middlePanelWidth)
  }

  const showLeftResizeElement = Boolean(middleContent)
  const showMiddleResizeElement = Boolean(rightContent)

  return (
    <>
      <ResizablePanel
        width={leftPanelWidth}
        onResize={showLeftResizeElement ? onResizeLeftPanel : undefined}
        key={'panel-left'}
      >
        {leftContent}
      </ResizablePanel>

      {middleContent ? (
        <ResizablePanel
          width={getMiddlePanelWidth(panelsCount)}
          onResize={showMiddleResizeElement ? onResizeMiddlePanel : undefined}
          key={'panel-middle'}
        >
          {middleContent}
        </ResizablePanel>
      ) : null}

      {rightContent ? (
        <ResizablePanel width={getRightPanelWidth(panelsCount)} key={'panel-right'}>
          {rightContent}
        </ResizablePanel>
      ) : null}
    </>
  )
}

export default MultiResizablePanelsView
