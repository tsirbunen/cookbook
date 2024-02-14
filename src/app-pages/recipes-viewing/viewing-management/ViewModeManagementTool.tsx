import { Flex, ChakraProps } from '@chakra-ui/react'
import { ColorCodes } from '../../../theme/theme'

import { RecipesViewingContext } from '../page/RecipesViewingProvider'
import { useContext } from 'react'
import CardRadioButtonSelector from '../../../widgets/card-radio-button-selector/CardRadioButtonSelector'
import Title, { TitleVariant } from '../../../widgets/titles/Title'

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

type ViewModeManagementToolProps = {
  isMobile: boolean
}

const ViewModeManagementTool = ({ isMobile }: ViewModeManagementToolProps) => {
  const { mode, setMode } = useContext(RecipesViewingContext)

  const selectMode = (newMode: ViewRecipesMode) => setMode(newMode)
  const showTitle = !isMobile

  return (
    <Flex {...outerCss(isMobile)}>
      {showTitle ? <Title title={title.toUpperCase()} variant={TitleVariant.MediumRegular} /> : null}

      <CardRadioButtonSelector options={viewModeOptions} currentValue={mode} selectValue={selectMode} />
    </Flex>
  )
}

export default ViewModeManagementTool

const outerCss = (isMobile: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: isMobile ? 'center' : 'start',
    margin: isMobile ? '0px' : '10px 0px 10px 5px',
    paddingBottom: '10px',
    backgroundColor: isMobile ? 'transparent' : ColorCodes.PALE,
    borderRadius: '6px',
    width: '100%'
  }
}
