import { MIN_PANEL_WIDTH, NAV_BAR_WIDTH } from '../../constants/layout'
import { WindowWidth } from '../view-size-service/ViewSizeProvider'

type PanelCalculationParams = CorePanelCalculationParams & {
  panelsCountHasChanged: boolean
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

export const getPanelsCount = (panels: Array<JSX.Element | undefined>) => {
  return panels.filter(Boolean).length
}

const panelWidthIsAllowed = (width: number) => MIN_PANEL_WIDTH <= width

export const panelWidthsAreAllowed = (
  widthLeft: number,
  widthMiddle: number,
  panelsCount: number,
  windowWidth: WindowWidth,
  hasRightContent: boolean
) => {
  const leftIsOk = panelWidthIsAllowed(widthLeft)
  if (panelsCount === 1) return leftIsOk

  const middleWidthIsNotExplicitlySet = !hasRightContent
  if (middleWidthIsNotExplicitlySet) {
    const middleWouldBeWidth = windowWidth.current - NAV_BAR_WIDTH - widthLeft
    const middleWouldBeOk = panelWidthIsAllowed(middleWouldBeWidth)
    return leftIsOk && middleWouldBeOk
  }

  const middleIsOk = panelWidthIsAllowed(widthMiddle)
  const rightWouldBeWidth = windowWidth.current - NAV_BAR_WIDTH - widthLeft - widthMiddle
  const rightWouldBeOk = panelWidthIsAllowed(rightWouldBeWidth)
  return leftIsOk && middleIsOk && rightWouldBeOk
}

export const calculateNewPanelWidths = (params: PanelCalculationParams) => {
  const { windowWidth, newPanelsCount, panelsCountHasChanged, currentWidths } = params

  return panelsCountHasChanged
    ? getEvenPanelWidths(windowWidth.current, newPanelsCount)
    : calculateAdjustedNewPanelWidths({ windowWidth, newPanelsCount, currentWidths })
}

export const getEvenPanelWidths = (windowWidth: number, panelsCount: number) => {
  const singlePanelWidth = (windowWidth - NAV_BAR_WIDTH) / panelsCount

  return {
    left: singlePanelWidth,
    middle: panelsCount > 2 ? singlePanelWidth : 0
  }
}

export const calculateAdjustedNewPanelWidths = (params: CorePanelCalculationParams) => {
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

export const getMaxChange = (widthsIncrease: boolean, panelWidth: number) => {
  if (widthsIncrease) return panelWidth > 10000 ? 0 : 10000 - panelWidth
  return panelWidth > MIN_PANEL_WIDTH ? MIN_PANEL_WIDTH - panelWidth : 0
}

export const getSmallerAbsoluteValue = (firstValue: number, secondValue: number) => {
  return Math.min(Math.abs(firstValue), Math.abs(secondValue))
}
