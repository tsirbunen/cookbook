import { Checkbox } from '@chakra-ui/react'

type CheckboxWithThemeProps = {
  isChecked: boolean
  onChange: () => void
}

const CheckboxWithTheme = ({ isChecked, onChange }: CheckboxWithThemeProps) => {
  return <Checkbox isChecked={isChecked} onChange={onChange} size="xl" />
}

export default CheckboxWithTheme
