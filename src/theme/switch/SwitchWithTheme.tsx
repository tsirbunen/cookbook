import { Switch } from '@chakra-ui/react'
import { SwitchVariant } from './switch-theme'
import { ChangeEvent } from 'react'

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
