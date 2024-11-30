import { Switch } from '@chakra-ui/react'
import type { ChangeEvent } from 'react'
import type { SwitchVariant } from './switch-theme'

type SwitchWithThemeProps = {
  variant: SwitchVariant
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  isChecked: boolean
  size?: 'sm' | 'md' | 'lg'
}

const ButtonWithTheme = ({ variant, onChange, isChecked, size = 'lg' }: SwitchWithThemeProps) => {
  return <Switch variant={variant} onChange={onChange} isChecked={isChecked} size={size} />
}

export default ButtonWithTheme
