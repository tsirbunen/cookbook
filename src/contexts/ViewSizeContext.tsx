import { createContext, useEffect, useState } from 'react'

export const navBarWidth = 60
export const minPanelWidth = 250
export const maxPanelWidth = 1000
const appMinWidth = 375
const mobileNarrowBreakpoint = 430
const narrowMediumBreakpoint = navBarWidth + 2 * minPanelWidth
const mediumLargeBreakpoint = narrowMediumBreakpoint + minPanelWidth

export enum ViewMode {
  MOBILE = 'MOBILE',
  NARROW = 'NARROW',
  MEDIUM = 'MEDIUM',
  WIDE = 'WIDE'
}

export type WindowWidth = {
  previous: number
  current: number
}

export type ViewSize = {
  windowWidth: WindowWidth
  viewMode: ViewMode
  maxPanelsCount: number
}

export const ViewSizeContext = createContext<ViewSize>({} as ViewSize)

/**
 * Context provider holding data on window dimensions: the actual view width in pixels (plus
 * the previous view width), whether the window is narrow, medium or large in width, and
 * how many panels can be shown (with current window width) horizontally.
 */
const ViewSizeContextProvider = ({ children }: { children: JSX.Element }) => {
  const [windowWidth, setWindowWidth] = useState<WindowWidth>(getInitialWidth(window))
  const [viewMode, setViewMode] = useState(getViewMode(window.innerWidth))
  const [maxPanelsCount, setMaxPanelsCount] = useState(getMaxPanelsCount(window.innerWidth))

  useEffect(() => {
    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])

  const onWindowResize = () => {
    const width = window.innerWidth
    setWindowWidth(({ previous, current }) => {
      return { previous: current, current: width }
    })
    setViewMode(getViewMode(width))
    setMaxPanelsCount(getMaxPanelsCount(width))
  }

  return (
    <ViewSizeContext.Provider value={{ windowWidth, viewMode, maxPanelsCount }}>
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
