'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { getPageHeaderHasToolsByPath } from '../../navigation/router/router'
import { navBarWidth, splitViewBreakpoint } from '../../constants/constants'

export const minPanelWidth = 250
export const maxPanelWidth = 2000 //1000
const appMinWidth = 375
const appMinHeight = 650
const mobileNarrowBreakpoint = 430
const narrowMediumBreakpoint = navBarWidth + 2 * minPanelWidth
const mediumLargeBreakpoint = narrowMediumBreakpoint + minPanelWidth
export const headerWithToolsBreakpoint = 625
export const headerHeightRegular = 50
export const headerHeightWithTools = 80
export const headerHeightWithToolsDoubleLine = 110
export const narrowHeaderBreakpoint = 625

export enum ViewMode {
  MOBILE = 'MOBILE',
  NARROW = 'NARROW',
  MEDIUM = 'MEDIUM',
  WIDE = 'WIDE',
  VERY_WIDE = 'VERY_WIDE'
}

export type WindowWidth = {
  previous: number
  current: number
}

export type ViewSize = {
  windowWidth: WindowWidth
  windowHeight: number
  viewMode: ViewMode
  maxPanelsCount: number
  isMobile: boolean
  isTooSmallWindow: boolean
  isSplitView: boolean
  isHeaderWithTools: (path: string) => boolean
  headerHeight: number
  isDoubleLineHeader: boolean
  isNarrowHeader: boolean
}

export const ViewSizeContext = createContext<ViewSize>({} as ViewSize)

/**
 * Context provider holding data on window dimensions: the actual view width in pixels (plus
 * the previous view width), window height, whether the window is mobile, narrow, medium or large,
 * how many panels can be shown (with current window width) horizontally, or if the window is
 * too small to viewed at all.
 */
const ViewSizeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [windowWidth, setWindowWidth] = useState<WindowWidth>(getInitialWidth(window))
  const [viewMode, setViewMode] = useState(getViewMode(window.innerWidth))
  const [maxPanelsCount, setMaxPanelsCount] = useState(getMaxPanelsCount(window.innerWidth))

  const onWindowResize = useCallback(() => {
    const width = window.innerWidth

    setWindowWidth(({ previous: _, current }) => {
      return { previous: current, current: width }
    })
    setViewMode(getViewMode(width))
    setMaxPanelsCount(getMaxPanelsCount(width))

    const height = window.innerHeight
    if (height !== windowHeight) setWindowHeight(height)
  }, [windowHeight])

  useEffect(() => {
    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
    // Note: We only want to add the event listener once!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isHeaderWithTools = (path: string) => {
    return getPageHeaderHasToolsByPath(path) ?? false
  }

  const isMobile = viewMode === ViewMode.MOBILE
  const isTooSmallWindow = maxPanelsCount === 0 || windowHeight < appMinHeight
  const isSplitView = windowWidth.current >= splitViewBreakpoint
  const isDoubleLineHeader = windowWidth.current < headerWithToolsBreakpoint
  const isNarrowHeader = windowWidth.current < narrowHeaderBreakpoint
  const headerHeight = isNarrowHeader || isMobile ? headerHeightWithToolsDoubleLine : headerHeightWithTools

  return (
    <ViewSizeContext.Provider
      value={{
        windowWidth,
        viewMode,
        maxPanelsCount,
        windowHeight,
        isMobile,
        isTooSmallWindow,
        isSplitView,
        isHeaderWithTools,
        headerHeight,
        isDoubleLineHeader,
        isNarrowHeader
      }}
    >
      {children}
    </ViewSizeContext.Provider>
  )
}

export default ViewSizeContextProvider

const getInitialWidth = (window: Window) => {
  return {
    previous: window.innerWidth,
    current: window.innerWidth
  }
}

const getViewMode = (width: number) => {
  if (width > splitViewBreakpoint) return ViewMode.VERY_WIDE
  if (width > mediumLargeBreakpoint) return ViewMode.WIDE
  if (width > narrowMediumBreakpoint) return ViewMode.MEDIUM
  if (width > mobileNarrowBreakpoint) return ViewMode.NARROW
  return ViewMode.MOBILE
}

const getMaxPanelsCount = (windowWidth: number) => {
  if (windowWidth < appMinWidth) return 0
  if (windowWidth <= narrowMediumBreakpoint) return 1
  if (windowWidth <= mediumLargeBreakpoint) return 2
  return 3
}
