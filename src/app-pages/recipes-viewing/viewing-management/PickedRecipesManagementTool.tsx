import { ChakraProps, Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { AppStateContext, AppStateContextType } from '../../../state/StateContextProvider'
import { Dispatch } from '../../../state/reducer'
import { ColorCodes } from '../../../theme/theme'
import { Recipe } from '../../../types/graphql-schema-types.generated'
import { ViewRecipesMode } from './ViewModeManagementTool'
import RecipeElements from '../recipes-display/RecipesDisplay'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { RecipeCategory } from '../../../types/types'

export const pickedRecipesManagementToolDataTestId = 'picked-recipes-management-tool'

type PickedRecipesManagementToolProps = {
  isMobile: boolean
}

const noRecipesPickedYetTitle = 'Pick some recipes to start cooking!'
const pickRecipesTitle = 'Picked recipes'

const PickedRecipesManagementTool = ({ isMobile }: PickedRecipesManagementToolProps) => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  const updatePickedRecipes = (recipeId: number, category: string) => {
    dispatch({ type: Dispatch.UPDATE_PICKED_RECIPE_IDS, payload: { recipeId, category } })
  }

  const getPickedRecipes = () => {
    const recipesInCategories = state.recipes
    const pickedRecipeIdsByCategory = state.pickedRecipeIdsByCategory
    return recipesInCategories
      .map((recipeCategory: RecipeCategory) => {
        if (pickedRecipeIdsByCategory[recipeCategory.category]) {
          const pickedIdsInCategory = pickedRecipeIdsByCategory[recipeCategory.category]
          return recipeCategory.recipes.filter((r) => pickedIdsInCategory.includes(r.id))
        }
      })
      .flat()
      .filter(Boolean) as Recipe[]
  }

  const pickedRecipes = getPickedRecipes()
  const noRecipesPickedYet = pickedRecipes.length === 0
  const title = noRecipesPickedYet ? noRecipesPickedYetTitle : pickRecipesTitle
  const showTitle = !isMobile || noRecipesPickedYet

  return (
    <Flex {...outerCss(isMobile)} data-testid={pickedRecipesManagementToolDataTestId}>
      {showTitle ? <Title title={title.toUpperCase()} variant={TitleVariant.MediumRegular} /> : null}

      <Flex {...innerCss(isMobile, noRecipesPickedYet)}>
        <RecipeElements
          recipes={pickedRecipes}
          onPickRecipeChanged={updatePickedRecipes}
          mode={ViewRecipesMode.TITLES}
          showBackground={false}
          isMobile={isMobile}
          pickedRecipeIds={pickedRecipes.map((recipe) => recipe.id)}
        />
      </Flex>
    </Flex>
  )
}

export default PickedRecipesManagementTool

const outerCss = (isMobile: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    backgroundColor: ColorCodes.PALE,
    borderRadius: '6px',
    margin: isMobile ? '10px 15px 10px 5px' : '10px 0px 10px 5px',
    width: '100%'
  }
}

const innerCss = (isMobile: boolean, noRecipesPickedYet: boolean) => {
  return {
    marginBottom: '10px',
    marginTop: '10px',
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: isMobile ? 'center' : 'start',
    flex: isMobile && noRecipesPickedYet ? 1 : undefined
  }
}