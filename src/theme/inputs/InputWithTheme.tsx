import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { InputVariant } from './inputs-theme'
import { ChangeEvent, ReactNode } from 'react'

type ButtonWithThemeProps = {
  variant: InputVariant
  value: string
  isDisabled?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  size?: 'xs' | 'sm' | 'md' | 'lg'
  name?: string
  placeholder?: string
  onBlur?: () => void
  type?: 'text' | 'password'
  rightElement?: ReactNode
}

const InputWithTheme = ({
  variant,
  value,
  isDisabled,
  onChange,
  size,
  name,
  placeholder,
  onBlur,
  type,
  rightElement
}: ButtonWithThemeProps) => {
  if (!rightElement) {
    return (
      <Input
        variant={variant}
        isDisabled={isDisabled}
        value={value}
        onChange={onChange}
        size={size ?? 'xs'}
        name={name}
        onBlur={onBlur}
        placeholder={placeholder}
        type={type ?? 'text'}
      />
    )
  }

  return (
    <InputGroup>
      <Input
        variant={variant}
        isDisabled={isDisabled}
        value={value}
        onChange={onChange}
        size={size ?? 'xs'}
        name={name}
        onBlur={onBlur}
        placeholder={placeholder}
        type={type ?? 'text'}
      />
      <InputRightElement>{rightElement}</InputRightElement>
    </InputGroup>
  )
}

export default InputWithTheme
