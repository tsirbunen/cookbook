import { useContext, useEffect, useState } from 'react'
import Panel from '../layout-widgets/Panel'
import { ViewSizeContext, minPanelWidth, maxPanelWidth, WindowWidth } from '../view-size-service/ViewSizeProvider'
import { navBarWidth } from '../../constants/constants'

export const maxAllowedPanelsCount = 3

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
  const { windowWidth, isMobile } = useContext(ViewSizeContext)
  const count = getPanelsCount([leftContent, middleContent, rightContent])
  const [panelsCount, setPanelsCount] = useState(count)
  const initialWidths = getEvenPanelWidths(windowWidth.current, panelsCount, !isMobile)
  const [leftPanelWidth, setLeftPanelWidth] = useState(initialWidths.left)
  const [middlePanelWidth, setMiddlePanelWidth] = useState(initialWidths.middle)

  useEffect(() => {
    let newLeftWidth = undefined
    let newMiddleWidth = undefined
    const panelsCountHasChanged = count !== panelsCount

    const newWidths = calculateNewPanelWidths({
      windowWidth,
      newPanelsCount: count,
      panelsCountHasChanged,
      hasNavBar: !isMobile,
      currentWidths: {
        left: leftPanelWidth,
        middle: getMiddlePanelWidth(count),
        right: getRightPanelWidth(count)
      }
    })
    newLeftWidth = newWidths.left
    if (count > 2) newMiddleWidth = newWidths.middle

    if (newLeftWidth) setLeftPanelWidth(newLeftWidth)
    if (newMiddleWidth) setMiddlePanelWidth(newMiddleWidth)
    if (panelsCountHasChanged) setPanelsCount(count)

    // We want to perform these calculations ONLY when the user adjusts
    // the window width or the count of the content components changes!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, windowWidth, isMobile])

  const onResizeLeftPanel = (deltaX: number) => {
    setLeftPanelWidth((currentLeftWidth) => {
      const newLeftWidth = currentLeftWidth + deltaX
      if (!panelWidthsAreAllowed(newLeftWidth, middlePanelWidth)) return currentLeftWidth
      return newLeftWidth
    })
  }

  const onResizeMiddlePanel = (deltaX: number) => {
    setMiddlePanelWidth((currentMiddleWidth) => {
      const newMiddleWidth = currentMiddleWidth + deltaX
      if (!panelWidthsAreAllowed(leftPanelWidth, newMiddleWidth)) return currentMiddleWidth
      return newMiddleWidth
    })
  }

  const panelWidthsAreAllowed = (widthLeft: number, widthMiddle: number) => {
    const leftIsOk = panelWidthIsInRange(widthLeft)
    if (panelsCount === 1) return leftIsOk

    const middleWidthIsNotExplicitlySet = !Boolean(rightContent)
    if (middleWidthIsNotExplicitlySet) {
      const middleWouldBeWidth = windowWidth.current - navBarWidth - widthLeft
      const middleIsOk = panelWidthIsInRange(middleWouldBeWidth)
      return leftIsOk && middleIsOk
    }

    const middleIsOk = panelWidthIsInRange(widthMiddle)
    const rightWouldBeWidth = windowWidth.current - navBarWidth - widthLeft - widthMiddle
    const rightIsOk = panelWidthIsInRange(rightWouldBeWidth)
    return leftIsOk && middleIsOk && rightIsOk
  }

  const panelWidthIsInRange = (width: number) => minPanelWidth <= width && width <= maxPanelWidth

  const getMiddlePanelWidth = (panels: number) => {
    if (panels === 3) return middlePanelWidth
    return Math.min(windowWidth.current - navBarWidth - leftPanelWidth, maxPanelWidth)
  }

  const getRightPanelWidth = (panels: number) => {
    if (panels < 3) return 0
    return Math.min(windowWidth.current - navBarWidth - leftPanelWidth - middlePanelWidth, maxPanelWidth)
  }

  const showLeftResizeElement = Boolean(middleContent)
  const showMiddleResizeElement = Boolean(rightContent)

  return (
    // <div style={{ overflowX: 'hidden', flex: 1, flexDirection: 'row' }}>
    <>
      <Panel width={leftPanelWidth} onResize={showLeftResizeElement ? onResizeLeftPanel : undefined} key={'panel-left'}>
        {leftContent}
      </Panel>

      {middleContent ? (
        <Panel
          width={getMiddlePanelWidth(panelsCount)}
          onResize={showMiddleResizeElement ? onResizeMiddlePanel : undefined}
          key={'panel-middle'}
        >
          {middleContent}
        </Panel>
      ) : null}

      {rightContent ? (
        <Panel width={getRightPanelWidth(panelsCount)} key={'panel-right'}>
          {rightContent}
        </Panel>
      ) : null}
    </>
    // </div>
  )
}

export default MultiResizablePanelsView

const getPanelsCount = (panels: Array<JSX.Element | undefined>) => {
  return panels.filter(Boolean).length
}

const getEvenPanelWidths = (windowWidth: number, panelsCount: number, hasNavBar: boolean) => {
  const singlePanelWidth = hasNavBar ? Math.min((windowWidth - navBarWidth) / panelsCount, maxPanelWidth) : windowWidth

  return {
    left: singlePanelWidth,
    middle: panelsCount > 2 ? singlePanelWidth : 0
  }
}

type PanelCalculationParams = CorePanelCalculationParams & {
  panelsCountHasChanged: boolean
  hasNavBar: boolean
}

type CorePanelCalculationParams = {
  windowWidth: WindowWidth
  newPanelsCount: number
  currentWidths: {
    left: number
    middle: number
    right: number
  }
}

const calculateNewPanelWidths = (params: PanelCalculationParams) => {
  const { windowWidth, newPanelsCount, panelsCountHasChanged, hasNavBar, currentWidths } = params
  return panelsCountHasChanged
    ? getEvenPanelWidths(windowWidth.current, newPanelsCount, hasNavBar)
    : calculateAdjustedNewPanelWidths({ windowWidth, newPanelsCount, currentWidths })
}

const calculateAdjustedNewPanelWidths = (params: CorePanelCalculationParams) => {
  const { windowWidth, newPanelsCount, currentWidths } = params
  let changeToAllocate = windowWidth.current - windowWidth.previous
  const sign = changeToAllocate > 0 ? 1 : -1
  const widthsIncrease = changeToAllocate > 0
  let { left, middle, right } = currentWidths

  const leftMaxChange = getMaxChange(widthsIncrease, left)
  const middleMaxChange = getMaxChange(widthsIncrease, middle)
  const rightMaxChange = getMaxChange(widthsIncrease, right)
  const includeRight = newPanelsCount === 3

  for (let i = newPanelsCount; i > 0; i--) {
    const changePerPanel = changeToAllocate / i

    const leftChange = sign * getSmallerAbsoluteValue(leftMaxChange, changePerPanel)
    const middleChange = sign * getSmallerAbsoluteValue(middleMaxChange, changePerPanel)
    const rightChange = includeRight ? sign * getSmallerAbsoluteValue(rightMaxChange, changePerPanel) : 0

    changeToAllocate -= leftChange + middleChange + rightChange
    left += leftChange
    middle += middleChange
    right += rightChange
  }

  return { left, middle }
}

const getMaxChange = (widthsIncrease: boolean, panelWidth: number) => {
  if (widthsIncrease) return panelWidth > maxPanelWidth ? 0 : maxPanelWidth - panelWidth
  return panelWidth > minPanelWidth ? minPanelWidth - panelWidth : 0
}

const getSmallerAbsoluteValue = (firstValue: number, secondValue: number) => {
  return Math.min(Math.abs(firstValue), Math.abs(secondValue))
}
