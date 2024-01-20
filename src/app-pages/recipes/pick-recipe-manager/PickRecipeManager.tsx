import { Flex, Text } from '@chakra-ui/react'
import { ColorCodes } from '../../../theme/theme'
import PickedRecipe from './PickedRecipe'
import { noCategory } from '../../../recipes-service/useRecipeApi'
import { RecipeServiceContext } from '../../../recipes-service/RecipeServiceProvider'
import { useContext } from 'react'
import { Recipe } from '../../../types/graphql-schema-types.generated'

type PickRecipeManagerProps = {
  isMobile: boolean
}

const PickRecipeManager = ({ isMobile }: PickRecipeManagerProps) => {
  const { filteredRecipesInCategories, pickedRecipeIdsByCategory, updatePickedRecipes } =
    useContext(RecipeServiceContext)

  const pickedRecipes = filteredRecipesInCategories
    .map((recipeCategory) => {
      if (pickedRecipeIdsByCategory[recipeCategory.category]) {
        const pickedIdsInCategory = pickedRecipeIdsByCategory[recipeCategory.category]
        return recipeCategory.recipes.filter((r) => pickedIdsInCategory.includes(r.id))
      }
    })
    .flat()
    .filter(Boolean) as Recipe[]

  const title = pickedRecipes.length === 0 ? 'Pick some recipes to start cooking!' : 'Picked recipes'
  const showTitle = !isMobile

  return (
    <Flex flexDirection="column" alignItems={isMobile ? 'center' : 'start'} marginTop="10px">
      {showTitle ? (
        <Flex marginLeft="5px" marginBottom="8px">
          <Text fontWeight="bold" color={ColorCodes.VERY_DARK}>
            {title}
          </Text>
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
  )
}

export default PickRecipeManager
