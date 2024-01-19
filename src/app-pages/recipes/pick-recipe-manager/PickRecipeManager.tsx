import { Flex, Text } from '@chakra-ui/react'
import { ColorCodes } from '../../../theme/theme'
import PickedRecipe from './PickedRecipe'
import { noCategory } from '../../../recipes-service/useRecipeApi'

type PickRecipeManagerProps = {
  pickedRecipes: { id: number; title: string; category?: string | null }[]
  onPickRecipeChanged: (recipeId: number, category: string) => void
}

const PickRecipeManager = ({ pickedRecipes, onPickRecipeChanged }: PickRecipeManagerProps) => {
  const title = pickedRecipes.length === 0 ? 'Pick some recipes to start cooking!' : 'Picked recipes'

  return (
    <Flex flexDirection="column" alignItems="start">
      <Flex marginLeft="5px">
        <Text fontWeight="bold" color={ColorCodes.VERY_DARK}>
          {title}
        </Text>
      </Flex>
      <div>
        {pickedRecipes.map((recipe) => {
          return (
            <PickedRecipe
              key={`picked-recipe-${recipe.id}`}
              title={recipe.title}
              onChange={() => onPickRecipeChanged(recipe.id, recipe.category ?? noCategory)}
            />
          )
        })}
      </div>
    </Flex>
  )
}

export default PickRecipeManager
