import { Flex, ChakraProps, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import ButtonWithTheme from '../../../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../../../theme/buttons/buttons-theme'
import { ColorCodes } from '../../../../theme/theme'
import { PropertyFilterProps, FiltersContext } from './FilteringProvider'

const ButtonsFilter = ({ property }: PropertyFilterProps) => {
  const { getDefinitions, getFilters, updateFilters } = useContext(FiltersContext)
  const { label, options } = getDefinitions(property)
  const currentValues = getFilters(property)

  const selectOption = (option: string) => {
    updateFilters(property, [option])
  }

  return (
    <Flex {...containerStyle}>
      <Text {...titleStyle}>{label}</Text>

      <Flex {...rowStyle}>
        {options.map((option) => {
          return (
            <ButtonWithTheme
              key={`filter-button-${label}-${option}`}
              variant={ButtonVariant.SmallDark}
              onClick={() => selectOption(option)}
              label={option.toUpperCase()}
              isToggled={currentValues.includes(option)}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default ButtonsFilter

const containerStyle = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  marginTop: '20px'
}

const rowStyle = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  flexWrap: 'wrap' as ChakraProps['flexWrap'],
  display: 'flex'
}

const titleStyle = {
  fontWeight: 'bold',
  color: ColorCodes.VERY_DARK,
  fontSize: '0.9em'
}
