'use client'

import { type ChakraProps, Flex } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { TbArrowBarToUp } from 'react-icons/tb'
import { Shades } from '../../constants/shades'
import { scrollToTopZIndex } from '../../constants/z-indexes'

const scrollToTopButtonId = 'scrollToTopButtonId'

/**
 * A button that scrolls to the top of the page when clicked.
 * IMPORTANT: This component MUST be used in conjunction with
 * the ScrollToTopTargetAnchor component.
 */
const ScrollToTopButton = ({ targetAnchorId }: { targetAnchorId: string }) => {
  const [display, setDisplay] = useState<'none' | 'float'>('none')

  const onScroll = useMemo(() => {
    return () => {
      const button = document.getElementById(scrollToTopButtonId)
      if (button) setDisplay('float')
    }
  }, [])

  useEffect(() => {
    if (window === undefined) return

    window.addEventListener('wheel', onScroll)
    window.addEventListener('touchmove', onScroll)

    return () => {
      window.removeEventListener('wheel', onScroll)
      window.removeEventListener('touchmove', onScroll)
    }
  }, [onScroll])

  return (
    <Flex id={scrollToTopButtonId} {...buttonCss(display)}>
      <a href={`#${targetAnchorId}`} onClick={() => setDisplay('none')} style={{ ...iconCss }}>
        <TbArrowBarToUp fontSize="2.0em" />
      </a>
    </Flex>
  )
}

export default ScrollToTopButton

const buttonCss = (display: 'none' | 'float') => {
  return {
    display: display as ChakraProps['display'],
    position: 'fixed' as ChakraProps['position'],
    bottom: 15,
    right: 15,
    zIndex: scrollToTopZIndex,
    border: 'none',
    outline: 'none',
    backgroundColor: Shades.VERY_DARK,
    borderRadius: 40,
    flex: 1,
    width: '55px',
    height: '55px'
  }
}

const iconCss = {
  color: Shades.VERY_PALE,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%'
}
