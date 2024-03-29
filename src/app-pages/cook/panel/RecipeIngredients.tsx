import React from 'react'
import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { IngredientGroup } from '../../../types/graphql-schema-types.generated'
import CheckboxWithTheme from '../../../theme/checkboxes/CheckboxWithTheme'
import { ColorCodes } from '../../../theme/theme'
import MultiColumnContent from './MultiColumnContent'

type RecipeIngredientsProps = {
  ingredientGroups: IngredientGroup[]
  currentWidth: number | null
  recipeId: number
}

const INGREDIENTS_SECTION_TITLE = 'INGREDIENTS'

const RecipeIngredients = ({ ingredientGroups, currentWidth, recipeId }: RecipeIngredientsProps) => {
  return (
    <MultiColumnContent currentWidth={currentWidth} title={INGREDIENTS_SECTION_TITLE} recipeId={recipeId}>
      <Flex {...containerCss}>
        {ingredientGroups.map((group, index) => {
          const { title, ingredients } = group

          return (
            <Flex {...ingredientGroupCss} key={`${title}-${index}-${recipeId}`}>
              {title ? (
                <Flex marginBottom="5px">
                  <Title title={title} variant={TitleVariant.MediumPale} />
                </Flex>
              ) : null}
              {ingredients.map((ingredient, i) => {
                const { amount, unit, name } = ingredient
                const isLastInGroup = i === ingredients.length - 1

                return (
                  <React.Fragment key={`ingredient-row-${group.id}-${i}-${recipeId}`}>
                    <Flex {...ingredientRowCss}>
                      <Flex {...checkboxCss}>
                        <CheckboxWithTheme isChecked={false} onChange={() => console.log('CHECK')} />
                      </Flex>
                      <Flex {...amountAndUnitCss}>
                        <Flex {...overFlowTextCss}>
                          <Text>
                            {amount} {unit}
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex {...overFlowTextCss}>
                        <Text>{name}</Text>
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

export default RecipeIngredients

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

const amountAndUnitCss = {
  width: '100px',
  color: ColorCodes.DARK,
  fontWeight: 'bold'
}

const overFlowTextCss = {
  overflow: 'wrap',
  flex: 1
}
