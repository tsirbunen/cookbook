import { Accordion } from '@chakra-ui/react'
import { useState } from 'react'

export enum AccordionVariant {
  Basic = 'basic'
}

type AccordionWithThemeProps = {
  children: JSX.Element
  variant?: AccordionVariant
}

const AccordionWithTheme = ({ children, variant = AccordionVariant.Basic }: AccordionWithThemeProps) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleIsExpanded = () => {
    setIsExpanded((previousValue) => !previousValue)
  }

  return (
    <Accordion
      allowMultiple
      width="100%"
      variant={variant}
      defaultIndex={isExpanded ? [0] : undefined}
      onChange={toggleIsExpanded}
    >
      {children}
    </Accordion>
  )
}

export default AccordionWithTheme
