import { Flex, Divider, ChakraProps } from '@chakra-ui/react'
import CardRadioButton, { RoundedBordersOnSide } from './CardRadioButton'
import { Fragment } from 'react'

export const cardRadioButtonSelectorDataTestId = 'card-radio-button-selector'

type CardRadioButtonSelectorOption<T> = {
  label: string
  value: T
}

type CardRadioButtonSelectorProps<T> = {
  options: CardRadioButtonSelectorOption<T>[]
  currentValue: T
  selectValue: (newValue: T) => void
}

const CardRadioButtonSelector = <T,>({ options, currentValue, selectValue }: CardRadioButtonSelectorProps<T>) => {
  const getRoundBordersOnSide = (index: number, optionsCount: number) => {
    if (index === 0) return RoundedBordersOnSide.LEFT
    if (index === optionsCount - 1) return RoundedBordersOnSide.RIGHT
    return RoundedBordersOnSide.NONE
  }

  const optionsCount = options.length

  return (
    <Flex {...innerCss} data-testid={cardRadioButtonSelectorDataTestId}>
      {options.map((option, index) => {
        const showDividerOnRight = index < optionsCount - 1

        return (
          <Fragment key={`radio-button-${option.label}`}>
            <CardRadioButton
              label={option.label}
              isSelected={currentValue === option.value}
              selectValue={() => selectValue(option.value)}
              roundBordersOnSide={getRoundBordersOnSide(index, optionsCount)}
            />
            {showDividerOnRight ? <Divider orientation="vertical" /> : null}
          </Fragment>
        )
      })}
    </Flex>
  )
}

export default CardRadioButtonSelector

const innerCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  margin: '10px 15px 0px 15px'
}
