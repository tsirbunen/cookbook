/** @jsxImportSource @emotion/react */
'use client'
import { css } from '@emotion/react'
import { ColorCodes } from '../../theme/theme'
import { useEffect } from 'react'
import { TbArrowBarToUp } from 'react-icons/tb'

const scrollToTopButtonId = 'scrollToTopButtonId'

const ScrollToTopButton = () => {
  const onScroll = () => {
    const button = document.getElementById(scrollToTopButtonId)
    if (button) {
      const scrollY = window.scrollY
      const display = scrollY > 10 ? 'flex' : 'none'
      if (button.style.display !== display) button.style.display = display
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
    // Note: We only want to add the event listener once!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onScrollToTop = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  return (
    <div id={scrollToTopButtonId} css={button} onClick={onScrollToTop}>
      <TbArrowBarToUp fontSize="2.0em" />
    </div>
  )
}

export default ScrollToTopButton

const margin = 15
const size = 40

const button = css`
  display: none;
  position: fixed;
  bottom: ${margin}px;
  right: ${margin}px;
  z-index: 1000;
  border: none;
  outline: none;
  background-color: ${ColorCodes.VERY_DARK};
  color: ${ColorCodes.VERY_PALE};
  border-radius: ${size}px;
  width: ${size}px;
  height: ${size}px;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
