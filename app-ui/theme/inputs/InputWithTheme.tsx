import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { type ChangeEvent, type ForwardedRef, type ReactNode, forwardRef } from 'react'
import type { InputVariant } from './inputs-theme'

type ButtonWithThemeProps = {
  variant: InputVariant
  value: string
  isDisabled?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  size?: 'xs' | 'sm' | 'md' | 'lg'
  name?: string
  placeholder?: string
  onBlur?: () => void
  onFocus?: () => void
  type?: 'text' | 'password'
  rightElement?: ReactNode
  ref?: ForwardedRef<Element>
}

const InputWithTheme = forwardRef(function InputWithTheme(
  {
    variant,
    value,
    isDisabled,
    onChange,
    size,
    name,
    placeholder,
    onBlur,
    type,
    rightElement,
    onFocus
  }: ButtonWithThemeProps,
  ref
) {
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
        onFocus={onFocus}
        ref={ref as ForwardedRef<HTMLInputElement>}
      />
      {rightElement ? <InputRightElement>{rightElement}</InputRightElement> : null}
    </InputGroup>
  )
})

export default InputWithTheme
