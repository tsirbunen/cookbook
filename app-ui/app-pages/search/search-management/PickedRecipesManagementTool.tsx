import { type ChakraProps, Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { Shades } from '../../../constants/shades'
import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import { Dispatch } from '../../../state/reducer'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { ViewRecipesMode } from './ViewModeManagementTool'
import RecipeWidgets from '../recipe-widgets/RecipeWidgets'

export const pickedRecipesManagementToolDataTestId = 'picked-recipes-management-tool'

const noRecipesPickedYetTitle = 'Pick some recipes to start cooking!'
const pickRecipesTitle = 'Picked recipes'

const PickedRecipesManagementTool = () => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  const updatePickedRecipes = (recipeId: number) => {
    dispatch({ type: Dispatch.UPDATE_PICKED_RECIPES, payload: { recipeIds: [recipeId] } })
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
        <RecipeWidgets
          recipes={pickedRecipes}
          onPickRecipeChanged={updatePickedRecipes}
          mode={ViewRecipesMode.TITLES}
          showBackground={false}
          pickedRecipeIds={pickedRecipes.map((recipe) => recipe.id)}
          canDragAndDrop={true}
          onChangedRecipeOrder={onChangedRecipeOrder}
          favoriteRecipeIds={[]}
        />
      </Flex>
    </Flex>
  )
}

export default PickedRecipesManagementTool

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
