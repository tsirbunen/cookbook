import React, { useContext, useMemo } from 'react'
import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { IngredientGroup } from '../../../types/graphql-schema-types.generated'
import CheckboxWithTheme, { CheckboxVariant } from '../../../theme/checkboxes/CheckboxWithTheme'
import { ColorCodes } from '../../../theme/theme'
import MultiColumnContent from './MultiColumnContent'
import { CookingContext } from '../page/CookingProvider'

type IngredientsProps = {
  ingredientGroups: IngredientGroup[]
  columnCount: number
  recipeId: number
}

const INGREDIENTS_SECTION_TITLE = 'INGREDIENTS'

const Ingredients = ({ ingredientGroups, columnCount, recipeId }: IngredientsProps) => {
  const { cookingRecipes, toggleIngredientAdded, ingredientsAdded } = useContext(CookingContext)

  const isCookingRecipe = useMemo(() => {
    return cookingRecipes.some((cookingRecipeData) => cookingRecipeData.recipe.id === recipeId)
  }, [cookingRecipes])

  const showCheckboxes = useMemo(() => cookingRecipes.map((r) => r.recipe.id).includes(recipeId), [cookingRecipes])

  return (
    <MultiColumnContent columnCount={columnCount} title={INGREDIENTS_SECTION_TITLE} recipeId={recipeId}>
      <Flex {...containerCss} key={`ingredients-columns-${recipeId}`}>
        {ingredientGroups.map((group, index) => {
          const { title, ingredients } = group

          return (
            <Flex {...ingredientGroupCss} key={`${title}-${index}-${recipeId}`}>
              {title ? (
                <Flex marginBottom="5px" key={`ingredient-title-${title}-${recipeId}`}>
                  <Title title={title} variant={TitleVariant.MediumPale} />
                </Flex>
              ) : null}
              {ingredients.map((ingredient, i) => {
                const { amount, unit, name } = ingredient
                const isLastInGroup = i === ingredients.length - 1
                const ingredientId = ingredient.id
                const isChecked = ingredientsAdded.includes(ingredientId)
                const showAsPale = isChecked && isCookingRecipe

                return (
                  <React.Fragment key={`ingredient-row-${name}-${i}-${recipeId}`}>
                    <Flex {...rowBoxCss}>
                      <Flex {...ingredientRowCss}>
                        {showCheckboxes ? (
                          <Flex {...checkboxCss}>
                            <CheckboxWithTheme
                              isChecked={isChecked}
                              onChange={() => toggleIngredientAdded(ingredientId)}
                              variant={isChecked ? CheckboxVariant.Pale : CheckboxVariant.Dark}
                            />
                          </Flex>
                        ) : null}
                        <Flex {...amountAndUnitCss(showAsPale)}>
                          <Flex {...overFlowTextCss}>
                            <Text>
                              {amount} {unit}
                            </Text>
                          </Flex>
                        </Flex>
                        <Flex {...overFlowTextCss(showAsPale)}>
                          <Text>{name}</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    {isLastInGroup ? <div style={{ marginBottom: '20px' }} /> : null}
                  </React.Fragment>
                )
              })}
            </Flex>
          )
        })}
      </Flex>
    </MultiColumnContent>
  )
}

export default Ingredients

const containerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  flexWrap: 'wrap' as ChakraProps['flexWrap'],
  marginLeft: '10px',
  marginRight: '10px'
}

const ingredientGroupCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  width: '100%'
}

const rowBoxCss = {
  display: 'inline-block'
}

const ingredientRowCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  display: 'flex',
  alignItems: 'start' as ChakraProps['alignItems'],
  justifyContent: 'start' as ChakraProps['justifyContent'],
  marginBottom: '8px'
}

const checkboxCss = {
  width: '35px'
}

const amountAndUnitCss = (isPale: boolean) => {
  return { width: '90px', color: isPale ? ColorCodes.SLIGHTLY_PALE : ColorCodes.DARK, fontWeight: 'bold' }
}

const overFlowTextCss = (isPale: boolean) => {
  return {
    overflow: 'wrap',
    flex: 1,
    color: isPale ? ColorCodes.SLIGHTLY_PALE : ColorCodes.VERY_DARK
  }
}
