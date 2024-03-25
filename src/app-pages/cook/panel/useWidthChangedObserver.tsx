import { useEffect, useMemo, useRef, useState } from 'react'

export const useWidthChangedObserver = () => {
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

  return { elementRef, currentWidth }
}
