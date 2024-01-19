import { Checkbox } from '@chakra-ui/react'

type CheckboxCustomizedProps = {
  isChecked: boolean
  onChange: () => void
}

const CheckboxCustomized = ({ isChecked, onChange }: CheckboxCustomizedProps) => {
  return (
    <div>
      <Checkbox isChecked={isChecked} onChange={onChange} size="xl" />
    </div>
  )
}

export default CheckboxCustomized
