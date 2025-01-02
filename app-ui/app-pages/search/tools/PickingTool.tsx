import { type ChakraProps, Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { Shades } from '../../../constants/shades'
import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import Widgets from '../widgets/Widgets'
import { ViewRecipesMode } from './ViewModeTool'

export const pickingToolDataTestId = 'picked-recipes-management-tool'

const noRecipesPickedYetTitle = 'Pick some recipes to start cooking!'
const pickRecipesTitle = 'Picked recipes'

const PickingTool = () => {
  const { state } = useContext(AppStateContext) as AppStateContextType

  const pickedRecipes = state.pickedRecipes
  const noRecipesPickedYet = pickedRecipes.length === 0
  const title = noRecipesPickedYet ? noRecipesPickedYetTitle : pickRecipesTitle

  return (
    <Flex {...outerCss} data-testid={pickingToolDataTestId}>
      <Title title={title.toUpperCase()} variant={TitleVariant.MediumRegular} />

      <Flex {...innerCss(noRecipesPickedYet)}>
        <Widgets recipes={pickedRecipes} mode={ViewRecipesMode.TITLES} showBackground={false} canDragAndDrop={true} />
      </Flex>
    </Flex>
  )
}

export default PickingTool

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  backgroundColor: Shades.VERY_PALE,
  borderRadius: '6px',
  margin: '10px 10px 10px 5px',
  width: '100%',
  paddingRight: '10px'
}

const innerCss = (noRecipesPickedYet: boolean) => {
  return {
    marginBottom: '10px',
    marginTop: '10px',
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'start',
    flex: noRecipesPickedYet ? 1 : undefined
  }
}
