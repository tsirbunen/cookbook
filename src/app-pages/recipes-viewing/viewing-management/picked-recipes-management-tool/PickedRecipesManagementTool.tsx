import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { noCategory } from '../../../../recipes-service/useRecipeApi'
import { AppStateContext, AppStateContextType } from '../../../../state/StateContextProvider'
import { Dispatch } from '../../../../state/reducer'
import { ColorCodes } from '../../../../theme/theme'
import { Recipe } from '../../../../types/graphql-schema-types.generated'
import PickedRecipe from './PickedRecipe'
import { splitViewBreakpoint, splitViewWidth } from '../../../../constants/constants'

type PickedRecipesManagementToolProps = {
  isMobile: boolean
  isSplitView: boolean
}

const noRecipesPickedYetTitle = 'Pick some recipes to start cooking!'
const pickRecipesTitle = 'Picked recipes'

const PickedRecipesManagementTool = ({ isMobile, isSplitView }: PickedRecipesManagementToolProps) => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType

  const updatePickedRecipes = (recipeId: number, category: string) => {
    dispatch({ type: Dispatch.UPDATE_PICKED_RECIPE_IDS, payload: { recipeId, category } })
  }

  const filteredRecipesInCategories = state.recipes
  const pickedRecipeIdsByCategory = state.pickedRecipeIdsByCategory
  const pickedRecipes = filteredRecipesInCategories
    .map((recipeCategory) => {
      if (pickedRecipeIdsByCategory[recipeCategory.category]) {
        const pickedIdsInCategory = pickedRecipeIdsByCategory[recipeCategory.category]
        return recipeCategory.recipes.filter((r) => pickedIdsInCategory.includes(r.id))
      }
    })
    .flat()
    .filter(Boolean) as Recipe[]

  const pickedRecipesCount = pickedRecipes.length
  const noRecipesPickedYet = pickedRecipesCount === 0
  const title = noRecipesPickedYet ? noRecipesPickedYetTitle : pickRecipesTitle
  const showTitle = !isMobile || noRecipesPickedYet

  return (
    <Flex {...boxCss(isMobile, isSplitView)}>
      <Flex {...outerCss(isMobile, isSplitView)}>
        <Flex {...innerCss(isMobile, noRecipesPickedYet)}>
          {showTitle ? (
            <Flex {...titleBoxCss(noRecipesPickedYet)}>
              <Text {...titleCss}>{title.toUpperCase()}</Text>
            </Flex>
          ) : null}

          <div>
            {pickedRecipes.map((recipe) => {
              return (
                <PickedRecipe
                  key={`picked-recipe-${recipe.id}`}
                  title={recipe.title}
                  onChange={() => updatePickedRecipes(recipe.id, recipe.category ?? noCategory)}
                />
              )
            })}
          </div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PickedRecipesManagementTool

const boxCss = (isMobile: boolean, isSplitView: boolean) => {
  return {
    marginRight: isMobile ? '5px' : isSplitView ? '0px' : '10px'
  }
}

const outerCss = (isMobile: boolean, isSplitView: boolean) => {
  return {
    backgroundColor: ColorCodes.PALE,
    borderRadius: '6px',
    margin: isMobile ? '10px 15px 10px 5px' : '10px 15px 15px 5px',
    width: isSplitView ? `${splitViewWidth}px` : '100%',
    maxWidth: `${splitViewBreakpoint}px`
  }
}

const innerCss = (isMobile: boolean, noRecipesPickedYet: boolean) => {
  return {
    margin: '10px',
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: isMobile ? 'center' : 'start',
    flex: isMobile && noRecipesPickedYet ? 1 : undefined
  }
}

const titleBoxCss = (noRecipesPickedYet: boolean) => {
  return {
    marginLeft: '5px',
    marginBottom: noRecipesPickedYet ? '0px' : '10px'
  }
}

const titleCss = {
  fontWeight: 'bold',
  color: ColorCodes.VERY_DARK,
  textAlign: 'center' as ChakraProps['textAlign']
}
