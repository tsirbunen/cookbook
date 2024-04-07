import { Accordion } from '@chakra-ui/react'

export enum AccordionVariant {
  Basic = 'basic'
}

type AccordionWithThemeProps = {
  children: JSX.Element
  variant?: AccordionVariant
}

const AccordionWithTheme = ({ children, variant = AccordionVariant.Basic }: AccordionWithThemeProps) => {
  return (
    <Accordion allowMultiple width="100%" variant={variant}>
      {children}
    </Accordion>
  )
}

export default AccordionWithTheme
