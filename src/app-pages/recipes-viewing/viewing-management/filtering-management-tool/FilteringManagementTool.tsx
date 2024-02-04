import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { FiltersContext, propertyDefinitions } from './FilteringProvider'
import { useContext } from 'react'
import ButtonWithTheme from '../../../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../../../theme/buttons/buttons-theme'
import { ColorCodes } from '../../../../theme/theme'
import { splitViewBreakpoint, splitViewWidth } from '../../../../constants/constants'

type FilteringManagementToolProps = {
  isMobile: boolean
  hideFiltering: () => void
  isSplitView: boolean
}

const filteringTitle = 'Filtering'
const applyFiltersLabel = 'Apply filters'
const applyChangesLabel = 'Apply changes'
const clearAllLabel = 'Clear all filters'

const FilteringManagementTool = ({ isMobile, hideFiltering, isSplitView }: FilteringManagementToolProps) => {
  const { selectedFiltersCount, applyFilters, clearAllFilters, filtersHaveChanged } = useContext(FiltersContext)

  const onApplyFilters = () => {
    applyFilters()
    hideFiltering()
  }

  const showTitle = !isMobile
  const hasChanges = filtersHaveChanged()
  const saveIsDisabled = selectedFiltersCount === 0 || !hasChanges
  const clearIsDisabled = selectedFiltersCount === 0
  const applyLabel = hasChanges ? applyChangesLabel : applyFiltersLabel

  return (
    <Flex {...boxCss(isMobile, isSplitView)}>
      <Flex {...outerStyle(isMobile, isSplitView)}>
        <Flex {...innerStyle}>
          {showTitle ? <Text {...titleStyle}>{filteringTitle.toUpperCase()}</Text> : null}

          {Object.values(propertyDefinitions).map((definitions) => {
            const FilterElement = definitions.FilterElement
            const key = `property-filter-${definitions.label}`
            return <FilterElement key={key} property={definitions.property} />
          })}

          <Flex {...buttonsStyle}>
            <ButtonWithTheme
              variant={ButtonVariant.MediumSizeDark}
              onClick={clearAllFilters}
              label={clearAllLabel.toUpperCase()}
              isDisabled={clearIsDisabled}
            />

            <ButtonWithTheme
              variant={ButtonVariant.MediumSizeDark}
              onClick={onApplyFilters}
              label={applyLabel.toUpperCase()}
              isDisabled={saveIsDisabled}
            />
          </Flex>
        </Flex>
      </Flex>{' '}
    </Flex>
  )
}

export default FilteringManagementTool

const boxCss = (isMobile: boolean, isSplitView: boolean) => {
  return { marginRight: isMobile ? '20px' : isSplitView ? '0px' : '10px' }
}

const outerStyle = (isMobile: boolean, isSplitView: boolean) => {
  return {
    backgroundColor: ColorCodes.PALE,
    borderRadius: '6px',
    margin: isMobile ? '10px 1px 10px 5px' : '10px 15px 15px 5px',
    flexDirection: 'column' as ChakraProps['flexDirection'],
    width: isSplitView ? `${splitViewWidth}px` : '100%',
    maxWidth: `${splitViewBreakpoint}px`
  }
}

const innerStyle = {
  margin: '10px 0px 10px 15px',
  flexDirection: 'column' as ChakraProps['flexDirection'],
  flex: '1'
}

const titleStyle = {
  fontWeight: 'bold',
  color: ColorCodes.VERY_DARK,
  marginBottom: '2px'
}

const buttonsStyle = {
  flex: '1',
  alignItems: 'end',
  justifyContent: 'end',
  marginTop: '30px',
  marginRight: '5px'
}
