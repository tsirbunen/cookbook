import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals'
import { render, screen, fireEvent, act } from '@testing-library/react'
import ViewSizeContextProvider from '../ViewSizeProvider'
import {
  APP_MIN_HEIGHT,
  APP_MIN_WIDTH,
  MAX_ALLOWED_PANELS_COUNT,
  MIN_PANEL_WIDTH,
  SPLIT_VIEW_BREAKPOINT
} from '../../../constants/layout'
import ViewSizeTestUser, {
  currentHeightTestId,
  currentWidthTestId,
  isSplitViewTestId,
  isTooSmallWindowTestId,
  maxPanelsCountTestId
} from './ViesSizeTestUser'

interface TestWindow {
  innerWidth?: number
  innerHeight?: number
}

const testWindow: TestWindow = global

const verifyExpectedValues = ({
  width,
  height,
  isSplitView,
  panelsCount,
  isTooSmall
}: {
  width: number
  height?: number
  isSplitView?: boolean
  panelsCount?: number
  isTooSmall: boolean
}) => {
  const currentWidthText = screen.getByTestId(currentWidthTestId).textContent
  expect(currentWidthText).toBe(width.toString())

  if (height !== undefined) {
    const currentHeightText = screen.getByTestId(currentHeightTestId).textContent
    expect(currentHeightText).toBe(height.toString())
  }

  if (isSplitView !== undefined) {
    const isSplitViewText = screen.getByTestId(isSplitViewTestId).textContent
    expect(isSplitViewText).toBe(isSplitView ? 'true' : 'false')
  }

  if (panelsCount !== undefined) {
    const maxPanelsCountText = screen.getByTestId(maxPanelsCountTestId).textContent
    expect(maxPanelsCountText).toBe(panelsCount.toString())
  }

  const isTooSmallText = screen.getByTestId(isTooSmallWindowTestId).textContent
  expect(isTooSmallText).toBe(isTooSmall ? 'true' : 'false')
}

describe('ViewSizeProvider', () => {
  it('recognizes a resize to split view', async () => {
    testWindow.innerWidth = SPLIT_VIEW_BREAKPOINT - 1
    testWindow.innerHeight = APP_MIN_HEIGHT

    render(
      <ViewSizeContextProvider>
        <ViewSizeTestUser />
      </ViewSizeContextProvider>
    )

    act(() => fireEvent(testWindow as Window, new Event('resize')))
    verifyExpectedValues({
      width: SPLIT_VIEW_BREAKPOINT - 1,
      isSplitView: false,
      isTooSmall: false
    })

    testWindow.innerWidth = SPLIT_VIEW_BREAKPOINT
    act(() => fireEvent(testWindow as Window, new Event('resize')))
    verifyExpectedValues({
      width: SPLIT_VIEW_BREAKPOINT,
      isSplitView: true,
      isTooSmall: false
    })
  })

  it('recognizes a too small window', async () => {
    testWindow.innerWidth = APP_MIN_WIDTH
    testWindow.innerHeight = APP_MIN_HEIGHT

    render(
      <ViewSizeContextProvider>
        <ViewSizeTestUser />
      </ViewSizeContextProvider>
    )

    act(() => fireEvent(testWindow as Window, new Event('resize')))
    verifyExpectedValues({
      width: APP_MIN_WIDTH,
      isSplitView: false,
      isTooSmall: false
    })

    testWindow.innerWidth = APP_MIN_WIDTH - 1
    act(() => fireEvent(testWindow as Window, new Event('resize')))
    verifyExpectedValues({
      width: APP_MIN_WIDTH - 1,
      height: APP_MIN_HEIGHT,
      isSplitView: false,
      isTooSmall: true
    })

    testWindow.innerWidth = APP_MIN_WIDTH
    testWindow.innerHeight = APP_MIN_HEIGHT - 1
    act(() => fireEvent(testWindow as Window, new Event('resize')))
    verifyExpectedValues({
      width: APP_MIN_WIDTH,
      height: APP_MIN_HEIGHT - 1,
      isSplitView: false,
      isTooSmall: true
    })
  })

  it('correctly calculates the number of resizable panels to show', async () => {
    testWindow.innerWidth = MIN_PANEL_WIDTH - 1
    testWindow.innerHeight = APP_MIN_HEIGHT

    render(
      <ViewSizeContextProvider>
        <ViewSizeTestUser />
      </ViewSizeContextProvider>
    )

    verifyExpectedValues({
      width: MIN_PANEL_WIDTH - 1,
      isTooSmall: true,
      panelsCount: 0
    })

    testWindow.innerWidth = MIN_PANEL_WIDTH
    act(() => fireEvent(testWindow as Window, new Event('resize')))
    verifyExpectedValues({
      width: MIN_PANEL_WIDTH,
      isTooSmall: true,
      panelsCount: 1
    })

    testWindow.innerWidth = MIN_PANEL_WIDTH * 2 - 1
    act(() => fireEvent(testWindow as Window, new Event('resize')))
    verifyExpectedValues({
      width: MIN_PANEL_WIDTH * 2 - 1,
      isTooSmall: true,
      panelsCount: 1
    })

    testWindow.innerWidth = MIN_PANEL_WIDTH * 2
    act(() => fireEvent(testWindow as Window, new Event('resize')))
    verifyExpectedValues({
      width: MIN_PANEL_WIDTH * 2,
      isTooSmall: true,
      panelsCount: 2
    })

    testWindow.innerWidth = MIN_PANEL_WIDTH * 3 - 1
    act(() => fireEvent(testWindow as Window, new Event('resize')))
    verifyExpectedValues({
      width: MIN_PANEL_WIDTH * 3 - 1,
      isTooSmall: false,
      panelsCount: 2
    })

    testWindow.innerWidth = MIN_PANEL_WIDTH * 3
    act(() => fireEvent(testWindow as Window, new Event('resize')))
    verifyExpectedValues({
      width: MIN_PANEL_WIDTH * 3,
      isTooSmall: false,
      panelsCount: 3
    })

    testWindow.innerWidth = MIN_PANEL_WIDTH * (MAX_ALLOWED_PANELS_COUNT + 1)
    act(() => fireEvent(testWindow as Window, new Event('resize')))
    verifyExpectedValues({
      width: MIN_PANEL_WIDTH * (MAX_ALLOWED_PANELS_COUNT + 1),
      isTooSmall: false,
      panelsCount: 3
    })
  })
})
