import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { type ForwardedRef, Fragment, forwardRef } from 'react'
import { TbTrash } from 'react-icons/tb'
import ButtonWithTheme from '../../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../../theme/buttons/buttons-theme'
import InputWithTheme from '../../../theme/inputs/InputWithTheme'
import { InputVariant } from '../../../theme/inputs/inputs-theme'
import { errorCss } from '../../../utils/styles'
import { formLabels } from './formLabels'

type GroupTitleInputProps = {
  title: string
  titleError?: string
  onChanged: (newValue: string) => void
  showInput: boolean
  ref?: ForwardedRef<Element>
}

export type FormIngredient = {
  amount: string
  unit: string
  name: string
}

const GroupTitleInput = forwardRef(function GroupTitleInput(props: GroupTitleInputProps, ref: ForwardedRef<Element>) {
  const { onChanged, title, showInput, titleError } = props

  return (
    <Fragment>
      <Flex {...titleBoxCss}>
        <InputWithTheme
          variant={InputVariant.Hover}
          isDisabled={false}
          size="md"
          onChange={(event) => onChanged(event.target.value)}
          value={title}
          placeholder={formLabels.groupTitlePlaceholder}
          ref={ref}
        />
        {showInput ? (
          <ButtonWithTheme
            variant={ButtonVariant.SquareWithIconWithoutFill}
            onClick={() => onChanged('')}
            isToggled={true}
            isDisabled={false}
          >
            <TbTrash />
          </ButtonWithTheme>
        ) : null}
      </Flex>
      {titleError ? <Text {...errorCss}>{titleError}</Text> : null}
    </Fragment>
  )
})

export default GroupTitleInput

const titleBoxCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center' as ChakraProps['alignItems'],
  justifyContent: 'space-between' as ChakraProps['justifyContent'],
  width: '100%',
  marginBottom: '5px'
}
