import { Flex, Text } from '@chakra-ui/react'
import { VERY_PALE_COLOR } from '../../constants/color-codes'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'

const cancelLabel = 'CANCEL'
const submitLabel = 'SUBMIT'

type FormActionButtonsProps = {
  cancelFn: () => void
  clearFn?: () => void
  submitIsDisabled: boolean
}

const FormActionButtons = ({ cancelFn, clearFn, submitIsDisabled }: FormActionButtonsProps) => {
  return (
    <Flex {...buttonsBoxCss}>
      <Flex {...buttonContainerCss}>
        <ButtonWithTheme variant={ButtonVariant.MediumSizePale} onClick={cancelFn} isToggled={true} isSubmit={false}>
          <Text {...buttonTextNoIconCss}>{cancelLabel}</Text>
        </ButtonWithTheme>
      </Flex>

      {clearFn && (
        <Flex {...buttonContainerCss}>
          <ButtonWithTheme variant={ButtonVariant.MediumSizePale} onClick={clearFn} isToggled={true} isSubmit={false}>
            <Text {...buttonTextNoIconCss}>CLEAR</Text>
          </ButtonWithTheme>
        </Flex>
      )}

      <ButtonWithTheme
        variant={ButtonVariant.MediumSizePale}
        isToggled={true}
        isSubmit={true}
        isDisabled={submitIsDisabled}
      >
        <Text {...buttonTextNoIconCss}>{submitLabel}</Text>
      </ButtonWithTheme>
    </Flex>
  )
}

export default FormActionButtons

const buttonTextNoIconCss = {
  color: VERY_PALE_COLOR
}

const buttonsBoxCss = {
  marginRight: '10px',
  marginTop: '40px'
}

const buttonContainerCss = {
  marginRight: '15px'
}
