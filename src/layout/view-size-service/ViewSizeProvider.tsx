'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { APP_MIN_HEIGHT, APP_MIN_WIDTH, MIN_PANEL_WIDTH, SPLIT_VIEW_BREAKPOINT } from '../../constants/layout'

export type WindowWidth = {
  previous: number
  current: number
}

export type ViewSize = {
  windowWidth: WindowWidth
  windowHeight: number
  maxPanelsCount: number
  isTooSmallWindow: boolean
  isSplitView: boolean
}

export const ViewSizeContext = createContext<ViewSize>({} as ViewSize)

/**
 * Context provider holding data on window dimensions: the actual view width in pixels (plus
 * the previous view width), window height, whether the window is split view or not,
 * how many panels can be shown (with current window width) horizontally, or if the window is
 * too small to viewed at all.
 */
const ViewSizeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [windowWidth, setWindowWidth] = useState<WindowWidth>(getInitialWidth(window))
  const [maxPanelsCount, setMaxPanelsCount] = useState(getMaxPanelsCount(window.innerWidth))

  const onWindowResize = useCallback(() => {
    const width = window.innerWidth

    setWindowWidth(({ previous: _, current }) => {
      return { previous: current, current: width }
    })

    setMaxPanelsCount(getMaxPanelsCount(width))

    const height = window.innerHeight
    if (height !== windowHeight) setWindowHeight(height)
  }, [windowHeight])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only run once
  useEffect(() => {
    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
    // Note: We only want to add the event listener once!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isTooSmallWindow = windowWidth.current < APP_MIN_WIDTH || windowHeight < APP_MIN_HEIGHT
  const isSplitView = windowWidth.current >= SPLIT_VIEW_BREAKPOINT

  return (
    <ViewSizeContext.Provider
      value={{
        windowWidth,
        maxPanelsCount,
        windowHeight,
        isTooSmallWindow,
        isSplitView
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

const getMaxPanelsCount = (windowWidth: number) => {
  if (windowWidth < MIN_PANEL_WIDTH) return 0
  if (windowWidth < 2 * MIN_PANEL_WIDTH) return 1
  if (windowWidth < 3 * MIN_PANEL_WIDTH) return 2
  return 3
}
