import { expect } from '@jest/globals'
import {
  calculateAdjustedNewPanelWidths,
  calculateNewPanelWidths,
  getEvenPanelWidths,
  getMaxChange,
  getSmallerAbsoluteValue,
  panelWidthsAreAllowed
} from '../utils'
import { MIN_PANEL_WIDTH, NAV_BAR_WIDTH } from '../../../constants/layout'

describe('Resizable panels view calculations:', () => {
  describe('panelWidthsAreAllowed should return correct result', () => {
    test('when there is only one panel and its width is in range', () => {
      const windowWidth = { current: MIN_PANEL_WIDTH + NAV_BAR_WIDTH, previous: 306 + NAV_BAR_WIDTH }
      expect(panelWidthsAreAllowed(MIN_PANEL_WIDTH, 0, 1, windowWidth, false)).toBe(true)
    })

    test('when there is only one panel and its width is not in range', () => {
      const windowWidth = { current: 299 + NAV_BAR_WIDTH, previous: 306 + NAV_BAR_WIDTH }
      expect(panelWidthsAreAllowed(299, 0, 1, windowWidth, false)).toBe(false)
    })

    test('when there are two panels and their widths are in range', () => {
      const windowWidth = { current: 600 + NAV_BAR_WIDTH, previous: 606 + NAV_BAR_WIDTH }
      expect(panelWidthsAreAllowed(MIN_PANEL_WIDTH, MIN_PANEL_WIDTH, 2, windowWidth, false)).toBe(true)
    })

    test('when there are two panels and their widths are not in range', () => {
      const windowWidth = { current: 598 + NAV_BAR_WIDTH, previous: 606 + NAV_BAR_WIDTH }
      expect(panelWidthsAreAllowed(MIN_PANEL_WIDTH, MIN_PANEL_WIDTH - 2, 2, windowWidth, false)).toBe(false)
    })

    test('when there are three panels and their widths are in range', () => {
      const windowWidth = { current: 900 + NAV_BAR_WIDTH, previous: 906 + NAV_BAR_WIDTH }
      expect(panelWidthsAreAllowed(MIN_PANEL_WIDTH, MIN_PANEL_WIDTH, 3, windowWidth, true)).toBe(true)
    })

    test('when there are three panels and their widths are not in range', () => {
      const windowWidth = { current: 900 + NAV_BAR_WIDTH, previous: 906 + NAV_BAR_WIDTH }
      expect(panelWidthsAreAllowed(MIN_PANEL_WIDTH, MIN_PANEL_WIDTH - 2, 3, windowWidth, true)).toBe(false)
    })
  })

  describe('calculateNewPanelWidths returns correct panel widths', () => {
    it('when panel count has changed', () => {
      const params = {
        windowWidth: { current: 900 + NAV_BAR_WIDTH, previous: 888 + NAV_BAR_WIDTH },
        newPanelsCount: 3,
        panelsCountHasChanged: true,
        currentWidths: { left: 444, middle: 444, right: 0 }
      }

      const { left, middle } = calculateNewPanelWidths(params)
      expect(left).toBe(300)
      expect(middle).toBe(300)
    })

    it('when panel count has not changed', () => {
      const params = {
        windowWidth: { current: 900 + NAV_BAR_WIDTH, previous: 888 + NAV_BAR_WIDTH },
        newPanelsCount: 2,
        panelsCountHasChanged: false,
        currentWidths: { left: 444, middle: 444, right: 0 }
      }

      const { left, middle } = calculateNewPanelWidths(params)
      expect(left).toBe(450)
      expect(middle).toBe(450)
    })
  })

  describe('getEvenPanelWidths returns equal panel widths', () => {
    it('when panel count is 1', () => {
      const { left, middle } = getEvenPanelWidths(1200 + NAV_BAR_WIDTH, 1)
      expect(left).toBe(1200)
      expect(middle).toBe(0)
    })

    it('when panel count is 2', () => {
      const { left, middle } = getEvenPanelWidths(1200 + NAV_BAR_WIDTH, 2)
      expect(left).toBe(1200 / 2)
      expect(middle).toBe(0)
    })

    it('when panel count is 3', () => {
      const { left, middle } = getEvenPanelWidths(1200 + NAV_BAR_WIDTH, 3)
      expect(left).toBe(1200 / 3)
      expect(middle).toBe(1200 / 3)
    })
  })

  describe('calculateAdjustedNewPanelWidths calculates correctly new panel widths', () => {
    it('when window width increases (2 panels)', () => {
      const params = {
        windowWidth: { current: 1200, previous: 900 },
        newPanelsCount: 2,
        panelsCountHasChanged: false,
        currentWidths: { left: 450, middle: 450, right: 0 }
      }

      const { left, middle } = calculateAdjustedNewPanelWidths(params)
      expect(left).toBe(600)
      expect(middle).toBe(600)
    })

    it('when window width increases (3 panels)', () => {
      const params = {
        windowWidth: { current: 1200, previous: 900 },
        newPanelsCount: 3,
        panelsCountHasChanged: false,
        currentWidths: { left: 300, middle: 300, right: 300 }
      }

      const { left, middle } = calculateAdjustedNewPanelWidths(params)
      expect(left).toBe(400)
      expect(middle).toBe(400)
    })

    it('when window width decreases (2 panels)', () => {
      const params = {
        windowWidth: { current: 900, previous: 1200 },
        newPanelsCount: 2,
        panelsCountHasChanged: false,
        currentWidths: { left: 600, middle: 600, right: 0 }
      }

      const { left, middle } = calculateAdjustedNewPanelWidths(params)
      expect(left).toBe(450)
      expect(middle).toBe(450)
    })

    it('when window width decreases (3 panels)', () => {
      const params = {
        windowWidth: { current: 900, previous: 1200 },
        newPanelsCount: 3,
        panelsCountHasChanged: false,
        currentWidths: { left: 400, middle: 400, right: 400 }
      }

      const { left, middle } = calculateAdjustedNewPanelWidths(params)
      expect(left).toBe(300)
      expect(middle).toBe(300)
    })
  })

  describe('getMaxChange returns the correct maximum value a panel width is allowed to increase', () => {
    it('when widths decrease and panel width is allowed to decrease', () => {
      const inputWidth = 600
      const result = getMaxChange(false, inputWidth)
      expect(result).toBe(MIN_PANEL_WIDTH - inputWidth)
    })

    it('when widths decrease and panel width is min', () => {
      const result = getMaxChange(false, MIN_PANEL_WIDTH)
      expect(result).toBe(0)
    })
  })

  describe('getSmallerAbsoluteValue returns the smaller absolute value', () => {
    it('when both numbers are positive', () => {
      expect(getSmallerAbsoluteValue(5, 3)).toBe(3)
    })

    it('when both numbers are negative', () => {
      expect(getSmallerAbsoluteValue(-5, -3)).toBe(3)
    })

    it('when one number is positive and the other is negative', () => {
      expect(getSmallerAbsoluteValue(-5, 3)).toBe(3)
      expect(getSmallerAbsoluteValue(5, -3)).toBe(3)
    })

    it('when one of the numbers is 0', () => {
      expect(getSmallerAbsoluteValue(0, 3)).toBe(0)
      expect(getSmallerAbsoluteValue(-5, 0)).toBe(0)
    })
  })
})
