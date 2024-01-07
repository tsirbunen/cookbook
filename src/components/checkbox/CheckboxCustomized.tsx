import { Checkbox } from '@chakra-ui/react'

const CheckboxCustomized = () => {
  return (
    <div>
      <Checkbox size="xl" onChange={() => console.log('changed')} />
    </div>
  )
}

export default CheckboxCustomized
