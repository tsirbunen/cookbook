import { Input } from '@chakra-ui/react'
import { InputVariant } from './inputs-theme'

type ButtonWithThemeProps = {
  variant: InputVariant
  value: string
  isDisabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputWithTheme = ({ variant, value, isDisabled, onChange }: ButtonWithThemeProps) => {
  return <Input variant={variant} isDisabled={isDisabled} value={value} onChange={onChange} size={'sm'}></Input>
}

export default InputWithTheme
