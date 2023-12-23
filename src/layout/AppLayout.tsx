/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useContext, useEffect, useState } from 'react'
import Panel from './Panel'
import {
  ViewSizeContext,
  navBarWidth,
  minPanelWidth,
  maxPanelWidth,
  WindowWidth
} from '../contexts/ViewSizeContext'

type AppLayoutProps = {
  header: JSX.Element
  navBar?: JSX.Element
  leftContent: JSX.Element
  middleContent?: JSX.Element
  rightContent?: JSX.Element
}

/**
 * Component that takes care of positioning content on screen as guided by the window width.
 * The app contains a header component at the top, and a main container below it.
 * The main container can have a vertical navigation bar as the leftmost component, and then
 * to the right of the navigation bar, there can be 1-3 panels. The widths of the panels
 * can be adjusted within certain limits with resizer elements or by adjusting window width.
 */
const AppLayout = (props: AppLayoutProps) => {
  const { header, navBar, leftContent, middleContent, rightContent } = props
  const { windowWidth } = useContext(ViewSizeContext)
  const count = getPanelsCount([leftContent, middleContent, rightContent])
  const [panelsCount, setPanelsCount] = useState(count)
  const initialWidths = getEvenPanelWidths(windowWidth.current, panelsCount, Boolean(navBar))
  const [leftPanelWidth, setLeftPanelWidth] = useState(initialWidths.left)
  const [middlePanelWidth, setMiddlePanelWidth] = useState(initialWidths.middle)

  useEffect(() => {
    let newLeftWidth, newMiddleWidth
    const panelsCountHasChanged = count !== panelsCount

    const newWidths = calculateAdjustedNewPanelWidths({
      windowWidth,
      newPanelsCount: count,
      panelsCountHasChanged,
      hasNavBar: Boolean(navBar),
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
  }, [count, windowWidth, navBar])

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
      let middleWouldBeWidth = windowWidth.current - navBarWidth - widthLeft
      const middleIsOk = panelWidthIsInRange(middleWouldBeWidth)
      return leftIsOk && middleIsOk
    }

    const middleIsOk = panelWidthIsInRange(widthMiddle)
    let rightWouldBeWidth = windowWidth.current - navBarWidth - widthLeft - widthMiddle
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
    return Math.min(
      windowWidth.current - navBarWidth - leftPanelWidth - middlePanelWidth,
      maxPanelWidth
    )
  }

  const showLeftResizeElement = Boolean(middleContent)
  const showMiddleResizeElement = Boolean(rightContent)

  return (
    <div>
      <div css={appContainer}>
        <div css={headerContainer}>{header}</div>

        <div css={mainContainer}>
          {navBar ? navBar : null}

          <Panel
            width={leftPanelWidth}
            onResize={showLeftResizeElement ? onResizeLeftPanel : undefined}
          >
            {leftContent}
          </Panel>

          {middleContent ? (
            <Panel
              width={getMiddlePanelWidth(panelsCount)}
              onResize={showMiddleResizeElement ? onResizeMiddlePanel : undefined}
            >
              {middleContent}
            </Panel>
          ) : null}

          {rightContent ? (
            <Panel width={getRightPanelWidth(panelsCount)}>{rightContent}</Panel>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default AppLayout

const getPanelsCount = (panels: Array<JSX.Element | undefined>) => {
  return panels.filter(Boolean).length
}

const getEvenPanelWidths = (windowWidth: number, panelsCount: number, hasNavBar: boolean) => {
  const singlePanelWidth = hasNavBar
    ? Math.min((windowWidth - navBarWidth) / panelsCount, maxPanelWidth)
    : windowWidth

  return {
    left: singlePanelWidth,
    middle: panelsCount > 2 ? singlePanelWidth : 0
  }
}

type WithCalculationParams = {
  windowWidth: WindowWidth
  newPanelsCount: number
  panelsCountHasChanged: boolean
  hasNavBar: boolean
  currentWidths: {
    left: number
    middle: number
    right: number
  }
}

const calculateAdjustedNewPanelWidths = (params: WithCalculationParams) => {
  const { windowWidth, newPanelsCount, panelsCountHasChanged, hasNavBar, currentWidths } = params

  if (panelsCountHasChanged) {
    return getEvenPanelWidths(windowWidth.current, newPanelsCount, hasNavBar)
  }

  let changeToAllocate = windowWidth.current - windowWidth.previous
  let sign = changeToAllocate > 0 ? 1 : -1
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
    const rightChange = includeRight
      ? sign * getSmallerAbsoluteValue(rightMaxChange, changePerPanel)
      : 0

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

const appContainer = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: start;
  align-content: start;
`

const headerContainer = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: start;
  align-content: center;
  height: 50px;
  width: 100%;
`

const mainContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: center;
  width: 100%;
`
