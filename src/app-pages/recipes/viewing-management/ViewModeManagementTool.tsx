import { Flex, ChakraProps } from '@chakra-ui/react'
import { ColorCodes } from '../../../theme/theme'

import { RecipesViewingContext } from '../page/RecipesViewingProvider'
import { useContext } from 'react'
import CardRadioButtonSelector from '../../../widgets/card-radio-button-selector/CardRadioButtonSelector'
import Title, { TitleVariant } from '../../../widgets/titles/Title'

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

const ViewModeManagementTool = () => {
  const { mode, setMode } = useContext(RecipesViewingContext)

  const selectMode = (newMode: ViewRecipesMode) => setMode(newMode)

  return (
    <Flex {...outerCss} data-testid={viewModeManagementToolDataTestId}>
      <Title title={title.toUpperCase()} variant={TitleVariant.MediumRegular} />

      <CardRadioButtonSelector options={viewModeOptions} currentValue={mode} selectValue={selectMode} />
    </Flex>
  )
}

export default ViewModeManagementTool

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  margin: '10px 0px 10px 5px',
  paddingBottom: '10px',
  backgroundColor: ColorCodes.PALE,
  borderRadius: '6px',
  width: '100%'
}
