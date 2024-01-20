import { Flex, Divider, Text } from '@chakra-ui/react'
import { ColorCodes } from '../../../theme/theme'
import SelectModeButton from './SelectModeButton'

export enum ViewRecipesMode {
  PHOTOS = 'PHOTOS',
  SUMMARIES = 'SUMMARIES',
  TITLES = 'TITLES'
}

const viewModeLabels: Record<ViewRecipesMode, string> = {
  PHOTOS: 'PHOTOS',
  SUMMARIES: 'SUMMARIES',
  TITLES: 'TITLES'
}

type ViewModeManagerProps = {
  currentMode: ViewRecipesMode
  selectMode: (newMode: ViewRecipesMode) => void
  isMobile: boolean
}

const title = 'View mode'

const ViewModeManager = ({ currentMode, selectMode, isMobile }: ViewModeManagerProps) => {
  const showTitle = !isMobile

  return (
    <Flex
      flexDirection="column"
      alignItems={isMobile ? 'center' : 'start'}
      margin={`10px ${isMobile ? 0 : 20}px 0px 0px`}
    >
      {showTitle ? (
        <Flex marginLeft="5px" marginBottom="8px">
          <Text fontWeight="bold" color={ColorCodes.VERY_DARK}>
            {title}
          </Text>
        </Flex>
      ) : null}

      <Flex flexDirection="row" alignItems="center" margin="0px 10px 10px 5px">
        <SelectModeButton
          label={viewModeLabels[ViewRecipesMode.PHOTOS]}
          isSelected={currentMode === ViewRecipesMode.PHOTOS}
          selectMode={() => selectMode(ViewRecipesMode.PHOTOS)}
          roundBordersOnSide="left"
        />
        <Divider orientation="vertical" />
        <SelectModeButton
          label={viewModeLabels[ViewRecipesMode.SUMMARIES]}
          isSelected={currentMode === ViewRecipesMode.SUMMARIES}
          selectMode={() => selectMode(ViewRecipesMode.SUMMARIES)}
          roundBordersOnSide="none"
        />
        <Divider orientation="vertical" />
        <SelectModeButton
          label={viewModeLabels[ViewRecipesMode.TITLES]}
          isSelected={currentMode === ViewRecipesMode.TITLES}
          selectMode={() => selectMode(ViewRecipesMode.TITLES)}
          roundBordersOnSide="right"
        />
      </Flex>
    </Flex>
  )
}

export default ViewModeManager
