import { Button, Flex, Divider } from '@chakra-ui/react'
import { ViewRecipesMode } from './RecipesPage'
import { ColorCodes } from '../../theme/theme'

const viewModeLabels: Record<ViewRecipesMode, string> = {
  PHOTOS: 'PHOTOS',
  SUMMARIES: 'SUMMARIES',
  TITLES: 'TITLES'
}

type SelectRecipesViewModeProps = {
  currentMode: ViewRecipesMode
  selectMode: (newMode: ViewRecipesMode) => void
}

const SelectRecipesViewMode = ({ currentMode, selectMode }: SelectRecipesViewModeProps) => {
  return (
    <Flex flexDirection="row" alignItems="center" margin="20px 10px 20px 5px">
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
  )
}

export default SelectRecipesViewMode

type SelectButtonProps = {
  label: string
  isSelected: boolean
  selectMode: () => void
  roundBordersOnSide: 'left' | 'right' | 'none'
}

const borderRadius = '6px'

const SelectModeButton = ({ label, isSelected, selectMode, roundBordersOnSide }: SelectButtonProps) => {
  const backgroundColor = isSelected ? ColorCodes.VERY_DARK : ColorCodes.MEDIUM
  const labelColor = isSelected ? ColorCodes.VERY_PALE : ColorCodes.DARK

  const borderRadii = ['0px', '0px', '0px', '0px']
  if (roundBordersOnSide === 'left') {
    borderRadii[0] = borderRadius
    borderRadii[3] = borderRadius
  } else if (roundBordersOnSide === 'right') {
    borderRadii[1] = borderRadius
    borderRadii[2] = borderRadius
  }

  return (
    <Button
      onClick={() => selectMode()}
      size="small"
      backgroundColor={backgroundColor}
      color={labelColor}
      padding={'3px 8px 3px 8px'}
      _hover={{
        backgroundColor: isSelected ? backgroundColor : ColorCodes.DARK,
        color: isSelected ? labelColor : ColorCodes.MEDIUM
      }}
      borderRadius={borderRadii.join(' ')}
    >
      {label}
    </Button>
  )
}
