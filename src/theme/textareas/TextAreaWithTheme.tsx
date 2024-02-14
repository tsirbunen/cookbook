import { Textarea } from '@chakra-ui/react'
import { TextAreaVariant } from './textareas-theme'
import { ChangeEvent } from 'react'

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
