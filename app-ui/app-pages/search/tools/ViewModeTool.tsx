import { type ChakraProps, Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { Shades } from '../../../constants/shades'
import { CardRadioButtonSelectorVariant } from '../../../widgets/card-radio-button-selector/CardRadioButton'
import CardRadioButtonSelector from '../../../widgets/card-radio-button-selector/CardRadioButtonSelector'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { SearchToolsContext } from '../state/SearchToolsProvider'

export const viewModeManagementToolDataTestId = 'view-mode-management-tool'
export enum ViewRecipesMode {
  PHOTOS = 'PHOTOS',
  SUMMARIES = 'SUMMARIES',
  TITLES = 'TITLES'
}

const viewModeOptions = [
  { label: 'PHOTOS', value: ViewRecipesMode.PHOTOS },
  { label: 'SUMMARIES', value: ViewRecipesMode.SUMMARIES },
  { label: 'TITLES', value: ViewRecipesMode.TITLES }
]

const title = 'View mode'

const ViewModeTool = () => {
  const { mode, setMode } = useContext(SearchToolsContext)

  const selectMode = (newMode: ViewRecipesMode) => setMode(newMode)

  return (
    <Flex {...outerCss} data-testid={viewModeManagementToolDataTestId}>
      <Title title={title.toUpperCase()} variant={TitleVariant.MediumRegular} />

      <CardRadioButtonSelector
        options={viewModeOptions}
        currentValue={mode}
        selectValue={selectMode}
        variant={CardRadioButtonSelectorVariant.DarkWithFill}
      />
    </Flex>
  )
}

export default ViewModeTool

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  margin: '10px 0px 10px 5px',
  paddingBottom: '10px',
  backgroundColor: Shades.VERY_PALE,
  borderRadius: '6px',
  width: '100%'
}
