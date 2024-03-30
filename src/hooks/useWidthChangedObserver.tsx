import { useEffect, useMemo, useRef, useState } from 'react'
import { MULTI_COLUMN_MIN_WIDTH } from '../constants/layout'

type UseWidthChangedObserver = {
  elementRef: React.RefObject<HTMLDivElement>

  canHaveTwoColumns: boolean
}

export const useWidthChangedObserver = (): UseWidthChangedObserver => {
  const [currentWidth, setCurrentWidth] = useState<number | null>(null)
  const elementRef = useRef<HTMLDivElement | null>(null)

  const observer = useMemo(
    () =>
      new ResizeObserver((entries: ResizeObserverEntry[]) => {
        setCurrentWidth(entries[0].target.getBoundingClientRect().width)
      }),
    []
  )

  useEffect(() => {
    if (elementRef.current) observer.observe(elementRef.current)

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
        observer.disconnect()
      }
    }
  }, [elementRef])

  const canHaveTwoColumns = currentWidth !== null && currentWidth > MULTI_COLUMN_MIN_WIDTH

  return { elementRef, canHaveTwoColumns }
}
