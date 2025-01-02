import { type ChakraProps, Flex } from '@chakra-ui/react'
import { SPLIT_VIEW_WIDTH } from '../../../constants/layout'
import FilteringTool from './FilteringTool'
import PickingTool from './PickingTool'
import ViewModeTool from './ViewModeTool'

type SearchToolsProps = {
  someFeatureIsToggled: boolean
  showFiltering: boolean
  showSelectMode: boolean
  showPickedRecipes: boolean
  isSplitView: boolean
}

const SearchTools = ({
  isSplitView,
  someFeatureIsToggled,
  showFiltering,
  showSelectMode,
  showPickedRecipes
}: SearchToolsProps) => {
  const viewCss = isSplitView ? slitViewCss(someFeatureIsToggled) : regularViewCss(showFiltering)

  return (
    <Flex {...viewCss}>
      <Flex {...toolsCss}>
        {showSelectMode ? <ViewModeTool /> : null}
        {showPickedRecipes ? <PickingTool /> : null}
        {showFiltering ? <FilteringTool /> : null}
      </Flex>
    </Flex>
  )
}

export default SearchTools

const slitViewCss = (someFeatureIsToggled: boolean) => {
  return {
    width: someFeatureIsToggled ? `${SPLIT_VIEW_WIDTH}px` : '0px'
  }
}

const regularViewCss = (showFiltering: boolean) => {
  return {
    height: showFiltering ? '100%' : undefined,
    paddingLeft: '10px'
  }
}

const toolsCss = {
  with: '100%',
  flexDirection: 'column' as ChakraProps['flexDirection'],
  flex: 1
}
