import { ChakraProps, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { FiltersContext, PropertyFilterProps } from './FilteringProvider'
import { ChangeEvent, useContext, useState } from 'react'
import { TbSearch, TbTrash } from 'react-icons/tb'
import ButtonWithTheme from '../../../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../../../theme/buttons/buttons-theme'
import { ColorCodes } from '../../../../theme/theme'

const placeholder = 'Type here required ingredients...'

const SearchFilter = ({ property }: PropertyFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { getDefinitions, getFilters, updateFilters, clearFilterAndApply } = useContext(FiltersContext)
  const { label } = getDefinitions(property)
  const currentValues = getFilters(property)

  const updateSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    const updatedValue = value === '' ? [] : [value]
    updateFilters(property, updatedValue)
  }

  const clearSearchTerm = () => {
    setSearchTerm('')
    clearFilterAndApply(property)
  }

  const clearingIsDisabled = searchTerm.length === 0

  return (
    <Flex {...containerCss}>
      <Text {...labelCss}>{label}</Text>

      <Flex width="100%">
        <InputGroup variant="search">
          <InputLeftElement>
            <TbSearch {...iconCss} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder={placeholder}
            onChange={updateSearchTerm}
            value={currentValues[0] ?? ''}
            variant="search"
          />
        </InputGroup>

        <Flex {...buttonBoxCss}>
          <ButtonWithTheme
            variant={ButtonVariant.SquareWithIcon}
            onClick={clearSearchTerm}
            isToggled={!clearingIsDisabled}
            isDisabled={clearingIsDisabled}
          >
            <TbTrash />
          </ButtonWithTheme>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SearchFilter

const containerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  marginTop: '20px',
  marginRight: '10px'
}

const labelCss = {
  fontWeight: 'bold',
  color: ColorCodes.VERY_DARK,
  fontSize: '0.9em'
}

const iconCss = {
  color: ColorCodes.VERY_DARK,
  fontSize: '1.4em',
  strokeWidth: '2.5px'
}

const buttonBoxCss = {
  marginLeft: '10px'
}
