import { useEffect, useState } from 'react'

export const useFormInputHover = ({ hoverId }: { hoverId: string }) => {
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    const targetDiv = document.getElementById(hoverId)
    if (!targetDiv) return

    targetDiv.addEventListener(
      'mouseenter',
      (event) => {
        if (!event?.target) return
        setShowInput(true)
      },
      false
    )

    targetDiv.addEventListener(
      'mouseleave',
      (event) => {
        if (!event?.target) return
        setShowInput(false)
      },
      false
    )

    return () => {
      targetDiv.removeEventListener('mouseenter', () => {})

      targetDiv.removeEventListener('mouseleave', () => {})
    }
  }, [hoverId])

  return { showInput }
}
