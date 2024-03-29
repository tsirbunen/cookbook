import { ChakraProps, Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { Dispatch } from '../../../state/reducer'
import { ColorCodes } from '../../../theme/theme'
import { ViewRecipesMode } from './ViewModeManagementTool'
import RecipesDisplay from '../recipes-display/RecipesDisplay'
import Title, { TitleVariant } from '../../../widgets/titles/Title'

export const pickedRecipesManagementToolDataTestId = 'picked-recipes-management-tool'

const noRecipesPickedYetTitle = 'Pick some recipes to start cooking!'
const pickRecipesTitle = 'Picked recipes'

const PickedRecipesManagementTool = () => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  const updatePickedRecipes = (recipeId: number, category: string) => {
    dispatch({ type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeId, category } })
  }

  const onChangedRecipeOrder = (newOrderOfIds: number[]) => {
    dispatch({ type: Dispatch.CHANGE_RECIPES_ORDER, payload: { newOrderOfIds } })
  }

  const pickedRecipes = state.pickedRecipes
  const noRecipesPickedYet = pickedRecipes.length === 0
  const title = noRecipesPickedYet ? noRecipesPickedYetTitle : pickRecipesTitle

  return (
    <Flex {...outerCss} data-testid={pickedRecipesManagementToolDataTestId}>
      <Title title={title.toUpperCase()} variant={TitleVariant.MediumRegular} />

      <Flex {...innerCss(noRecipesPickedYet)}>
        <RecipesDisplay
          recipes={pickedRecipes}
          onPickRecipeChanged={updatePickedRecipes}
          mode={ViewRecipesMode.TITLES}
          showBackground={false}
          pickedRecipeIds={pickedRecipes.map((recipe) => recipe.id)}
          canDragAndDrop={true}
          onChangedRecipeOrder={onChangedRecipeOrder}
        />
      </Flex>
    </Flex>
  )
}

export default PickedRecipesManagementTool

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  backgroundColor: ColorCodes.PALE,
  borderRadius: '6px',
  margin: '10px 0px 10px 5px',
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
