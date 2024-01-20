import { ColorCodes } from '../../../theme/theme'
import { Flex, Text } from '@chakra-ui/react'

type ToggleToolsProps = {
  isMobile: boolean
  isSplitView: boolean
  startCooking: () => void
  renderPickedRecipesToggle: () => JSX.Element
  renderFilteringToggle: () => JSX.Element
  renderStartCookingToggle: () => JSX.Element
}

const titleTools = 'Tools'

const ToggleTools = ({
  isMobile,
  isSplitView,
  renderPickedRecipesToggle,
  renderFilteringToggle,
  renderStartCookingToggle
}: ToggleToolsProps) => {
  const showTitle = !isMobile

  return (
    <Flex
      flexDirection="column"
      alignItems="start"
      justifyContent={isMobile ? 'center' : 'start'}
      margin={`10px 0px 10px ${isSplitView ? 5 : 0}px`}
    >
      {showTitle ? (
        <Text fontWeight="bold" color={ColorCodes.VERY_DARK} marginBottom="2px">
          {titleTools}
        </Text>
      ) : null}

      <Flex flexDirection="row" justifyContent={'center'} margin="0px 0px 0px 0px" width="180px">
        {renderPickedRecipesToggle()}
        {renderFilteringToggle()}
        {renderStartCookingToggle()}
      </Flex>
    </Flex>
  )
}

export default ToggleTools
