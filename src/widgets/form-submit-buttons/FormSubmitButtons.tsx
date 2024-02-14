import { Flex } from '@chakra-ui/react'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'

type FormSubmitButtonsProps = {
  labelCancel: string
  labelSubmit: string
  clearFormValues: () => void
  clearIsDisabled: boolean
  submitIsDisabled: boolean
}

const FormSubmitButtons = ({
  labelCancel,
  labelSubmit,
  clearFormValues,
  clearIsDisabled,
  submitIsDisabled
}: FormSubmitButtonsProps) => {
  return (
    <Flex {...outerCss}>
      <ButtonWithTheme
        variant={ButtonVariant.MediumSizeDark}
        onClick={clearFormValues}
        label={labelCancel.toUpperCase()}
        isDisabled={clearIsDisabled}
      />

      <ButtonWithTheme
        variant={ButtonVariant.MediumSizeDark}
        label={labelSubmit.toUpperCase()}
        isSubmit={true}
        isDisabled={submitIsDisabled}
      />
    </Flex>
  )
}

export default FormSubmitButtons

const outerCss = {
  flex: '1',
  alignItems: 'end',
  justifyContent: 'end',
  marginTop: '20px',
  marginRight: '5px',
  marginBottom: '10px'
}
