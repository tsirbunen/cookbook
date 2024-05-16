import { Flex, ChakraProps } from '@chakra-ui/react'
import CardRadioButton, { CardRadioButtonSelectorVariant, RoundedBordersOnSide } from './CardRadioButton'
import { Fragment } from 'react'
import { IconType } from 'react-icons'

export const cardRadioButtonSelectorDataTestId = 'card-radio-button-selector'

type CardRadioButtonSelectorOption<T> = {
  label: string
  value: T
  icon?: IconType
}

type CardRadioButtonSelectorProps<T> = {
  options: CardRadioButtonSelectorOption<T>[]
  currentValue?: T
  selectValue: (newValue: T) => void
  noMargin?: boolean
  variant: CardRadioButtonSelectorVariant
}

const CardRadioButtonSelector = <T,>({
  options,
  currentValue,
  selectValue,
  noMargin,
  variant
}: CardRadioButtonSelectorProps<T>) => {
  const getRoundBordersOnSide = (index: number, optionsCount: number) => {
    if (index === 0 && optionsCount === 1) return RoundedBordersOnSide.BOTH
    if (index === 0) return RoundedBordersOnSide.LEFT
    if (index === optionsCount - 1) return RoundedBordersOnSide.RIGHT
    return RoundedBordersOnSide.NONE
  }

  const optionsCount = options.length

  return (
    <Flex {...innerCss(!noMargin)} data-testid={cardRadioButtonSelectorDataTestId}>
      {options.map((option, index) => {
        return (
          <Fragment key={`radio-button-${option.label}`}>
            <CardRadioButton
              label={option.label}
              isSelected={currentValue === option.value}
              selectValue={() => selectValue(option.value)}
              roundBordersOnSide={getRoundBordersOnSide(index, optionsCount)}
              icon={option.icon}
              variant={variant}
            />
          </Fragment>
        )
      })}
    </Flex>
  )
}

export default CardRadioButtonSelector

const innerCss = (hasMargin: boolean) => {
  return {
    flexDirection: 'row' as ChakraProps['flexDirection'],
    alignItems: 'center',
    margin: hasMargin ? '10px 15px 0px 15px' : undefined
  }
}
