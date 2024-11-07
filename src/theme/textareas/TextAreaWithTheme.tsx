import { Textarea } from '@chakra-ui/react'
import type { ChangeEvent } from 'react'
import type { TextAreaVariant } from './textareas-theme'

type TextAreaWithThemeProps = {
  variant: TextAreaVariant
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}

const TextAreaWithTheme = ({ variant, value, onChange, placeholder }: TextAreaWithThemeProps) => {
  return <Textarea value={value} variant={variant} onChange={onChange} placeholder={placeholder} />
}

export default TextAreaWithTheme
