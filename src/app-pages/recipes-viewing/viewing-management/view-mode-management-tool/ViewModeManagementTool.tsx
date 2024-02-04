import { Flex, Divider, Text, ChakraProps } from '@chakra-ui/react'
import { ColorCodes } from '../../../../theme/theme'
import SelectModeButton from './SelectModeButton'
import { RecipesViewingContext } from '../../page/RecipesViewingProvider'
import { useContext } from 'react'
import { ViewSizeContext } from '../../../../app-layout/ViewSizeProvider'
import { splitViewBreakpoint, splitViewWidth } from '../../../../constants/constants'

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

const title = 'View mode'

const ViewModeManagementTool = () => {
  const { isMobile, isSplitView } = useContext(ViewSizeContext)
  const { mode, setMode } = useContext(RecipesViewingContext)

  const selectMode = (newMode: ViewRecipesMode) => setMode(newMode)
  const showTitle = !isMobile
  const currentMode = mode

  return (
    <Flex {...boxCss(isMobile, isSplitView)}>
      <Flex {...outerCss(isMobile, isSplitView)}>
        {showTitle ? (
          <Flex {...titleBoxCss}>
            <Text {...titleCss}>{title.toUpperCase()}</Text>
          </Flex>
        ) : null}

        <Flex {...innerCss}>
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
    </Flex>
  )
}

export default ViewModeManagementTool

const boxCss = (isMobile: boolean, isSplitView: boolean) => {
  return {
    marginRight: isMobile ? '10px' : isSplitView ? '0px' : '10px'
  }
}

const outerCss = (isMobile: boolean, isSplitView: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: isMobile ? 'center' : 'start',
    margin: isMobile ? '0px' : '10px 15px 10px 5px',
    backgroundColor: isMobile ? 'transparent' : ColorCodes.PALE,
    borderRadius: '6px',
    width: isSplitView ? `${splitViewWidth}px` : '100%',
    maxWidth: `${splitViewBreakpoint}px`
  }
}

const titleBoxCss = {
  marginLeft: '10px',
  marginTop: '10px'
}

const titleCss = {
  fontWeight: 'bold',
  color: ColorCodes.VERY_DARK,
  marginLeft: '5px'
}

const innerCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  margin: '10px 15px 10px 15px'
}
