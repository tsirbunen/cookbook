import CheckboxWithTheme, { CheckboxVariant } from '../../../theme/checkboxes/CheckboxWithTheme'

type CheckToggleProps = {
  isChecked: boolean
  onChange: () => void
}

const CheckToggle = ({ isChecked, onChange }: CheckToggleProps) => {
  return (
    <div {...checkboxCss}>
      <CheckboxWithTheme
        isChecked={isChecked}
        onChange={onChange}
        variant={isChecked ? CheckboxVariant.Pale : CheckboxVariant.Dark}
      />
    </div>
  )
}

export default CheckToggle

const checkboxCss = {
  width: '35px',
  breakinside: 'avoid'
}
