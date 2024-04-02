/** @jsxImportSource @emotion/react */
'use client'
import { css } from '@emotion/react'
import { ColorCodes } from '../../theme/theme'
import { useEffect, useState } from 'react'
import { TbArrowBarToUp } from 'react-icons/tb'
import { scrollToTopZIndex } from '../../constants/z-indexes'

const scrollToTopButtonId = 'scrollToTopButtonId'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const onScroll = () => {
    console.log('scrolling')
    // const button = document.getElementById(scrollToTopButtonId)
    // if (button) {
    //   console.log('button:', button)
    //   const scrollY = window.scrollY
    //   const display = scrollY > 10 ? 'float' : 'none'
    //   if (button.style.display !== display) button.style.display = display
    // }
  }

  useEffect(() => {
    const element = document.getElementById('GGG')
    console.log('element:', !!element)
    if (!element) return
    element.addEventListener('scroll', onScroll)
    // window.addEventListener('scroll', onScroll)
    // return () => window.removeEventListener('scroll', onScroll)
    // Note: We only want to add the event listener once!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onScrollToTop = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  if (!isVisible) return null

  return (
    <div id={scrollToTopButtonId} css={buttonCss} onClick={onScrollToTop}>
      <TbArrowBarToUp fontSize="2.0em" />
    </div>
  )
}

export default ScrollToTopButton

const margin = 15
const size = 40

const buttonCss = css`
  /* display: hidden; */
  /* display: float; */
  position: fixed;
  bottom: ${margin}px;
  right: ${margin}px;
  z-index: ${scrollToTopZIndex};
  border: none;
  outline: none;
  background-color: ${ColorCodes.VERY_DARK};
  color: ${ColorCodes.VERY_PALE};
  border-radius: ${size}px;
  /* width: ${size}px; */
  /* height: ${size}px; */
  padding: 5px;
  flex: 1;
  flex-direction: column;
  /* flex-wrap: wrap; */
  justify-content: center;
  align-items: center;
`
