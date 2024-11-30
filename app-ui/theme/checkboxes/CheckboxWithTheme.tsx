import { Checkbox } from '@chakra-ui/react'

export enum CheckboxVariant {
  Dark = 'dark',
  Pale = 'pale'
}

type CheckboxWithThemeProps = {
  isChecked: boolean
  onChange: () => void
  variant?: CheckboxVariant
}

const CheckboxWithTheme = ({ isChecked, onChange, variant = CheckboxVariant.Dark }: CheckboxWithThemeProps) => {
  return <Checkbox isChecked={isChecked} onChange={onChange} size="xl" marginRight="10px" variant={variant} />
}

export default CheckboxWithTheme
