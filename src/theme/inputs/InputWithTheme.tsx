import { Input } from '@chakra-ui/react'
import { InputVariant } from './inputs-theme'

type ButtonWithThemeProps = {
  variant: InputVariant
  value: string
  isDisabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  acceptValue?: () => void
  size?: 'xs' | 'sm' | 'md' | 'lg'
  name?: string
  placeholder?: string
}

const InputWithTheme = ({
  variant,
  value,
  isDisabled,
  onChange,
  acceptValue,
  size,
  name,
  placeholder
}: ButtonWithThemeProps) => {
  return (
    <Input
      variant={variant}
      isDisabled={isDisabled}
      value={value}
      onChange={onChange}
      size={size ?? 'xs'}
      name={name}
      onBlur={acceptValue}
      placeholder={placeholder}
    ></Input>
  )
}

export default InputWithTheme
