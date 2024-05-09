import { Flex } from '@chakra-ui/react'
import CheckboxWithTheme, { CheckboxVariant } from '../../../theme/checkboxes/CheckboxWithTheme'

type CheckToggleProps = {
  isChecked: boolean
  onChange: () => void
}

const CheckToggle = ({ isChecked, onChange }: CheckToggleProps) => {
  return (
    <Flex {...checkboxCss}>
      <CheckboxWithTheme
        isChecked={isChecked}
        onChange={onChange}
        variant={isChecked ? CheckboxVariant.Pale : CheckboxVariant.Dark}
      />
    </Flex>
  )
}

export default CheckToggle

const checkboxCss = {
  width: '35px'
}
