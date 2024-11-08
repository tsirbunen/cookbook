/** @jsxImportSource @emotion/react */
'use client'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { TbArrowBarToUp } from 'react-icons/tb'
import { Shades } from '../../constants/shades'
import { scrollToTopZIndex } from '../../constants/z-indexes'

const scrollToTopButtonId = 'scrollToTopButtonId'

const ScrollToTopButton = ({ targetAnchorId }: { targetAnchorId: string }) => {
  const [display, setDisplay] = useState<'none' | 'float'>('none')

  const onScroll = () => {
    const button = document.getElementById(scrollToTopButtonId)
    if (button) setDisplay('float')
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only run once
  useEffect(() => {
    if (window === undefined) return

    window.addEventListener('wheel', onScroll)
    window.addEventListener('touchmove', onScroll)

    return () => {
      window.removeEventListener('wheel', onScroll)
      window.removeEventListener('touchmove', onScroll)
    }
  }, [])

  return (
    <div id={scrollToTopButtonId} css={buttonCss(display)}>
      <a href={`#${targetAnchorId}`} onClick={() => setDisplay('none')}>
        <TbArrowBarToUp fontSize="2.0em" />
      </a>
    </div>
  )
}

export default ScrollToTopButton

const margin = 15

const buttonCss = (display: 'none' | 'float') => css`
  display: ${display};
  position: fixed;
  bottom: ${margin}px;
  right: ${margin}px;
  z-index: ${scrollToTopZIndex};
  border: none;
  outline: none;
  background-color: ${Shades.VERY_DARK};
  color: ${Shades.VERY_PALE};
  border-radius: 40px;
  padding: 5px;
  flex: 1;
  justify-content: center;
  align-items: center;
`
