'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { getPageHeaderHasToolsByPath } from '../../navigation/router/router'
import {
  APP_MIN_HEIGHT,
  APP_MIN_WIDTH,
  HEADER_HEIGHT_WITH_TOOLS,
  HEADER_HEIGHT_WITH_TOOLS_DOUBLE_LINE,
  HEADER_WITH_TOOLS_BREAKPOINT,
  MEDIUM_LARGE_BREAKPOINT,
  NARROW_HEADER_BREAKPOINT,
  NARROW_MEDIUM_BREAKPOINT,
  SPLIT_VIEW_BREAKPOINT
} from '../../constants/layout'

export enum ViewMode {
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

  const isTooSmallWindow = maxPanelsCount === 0 || windowHeight < APP_MIN_HEIGHT
  const isSplitView = windowWidth.current >= SPLIT_VIEW_BREAKPOINT
  const isDoubleLineHeader = windowWidth.current < HEADER_WITH_TOOLS_BREAKPOINT
  const isNarrowHeader = windowWidth.current < NARROW_HEADER_BREAKPOINT
  const headerHeight = isNarrowHeader ? HEADER_HEIGHT_WITH_TOOLS_DOUBLE_LINE : HEADER_HEIGHT_WITH_TOOLS

  return (
    <ViewSizeContext.Provider
      value={{
        windowWidth,
        viewMode,
        maxPanelsCount,
        windowHeight,
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
  if (width > SPLIT_VIEW_BREAKPOINT) return ViewMode.VERY_WIDE
  if (width > MEDIUM_LARGE_BREAKPOINT) return ViewMode.WIDE
  if (width > NARROW_MEDIUM_BREAKPOINT) return ViewMode.MEDIUM
  return ViewMode.NARROW
}

const getMaxPanelsCount = (windowWidth: number) => {
  if (windowWidth < APP_MIN_WIDTH) return 0
  if (windowWidth <= NARROW_MEDIUM_BREAKPOINT) return 1
  if (windowWidth <= MEDIUM_LARGE_BREAKPOINT) return 2
  return 3
}
