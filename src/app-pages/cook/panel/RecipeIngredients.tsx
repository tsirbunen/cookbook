import React from 'react'
import { ChakraProps, Divider, Flex, Text } from '@chakra-ui/react'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { IngredientGroup } from '../../../types/graphql-schema-types.generated'
import CheckboxWithTheme from '../../../theme/checkboxes/CheckboxWithTheme'
import { ColorCodes } from '../../../theme/theme'

type RecipeIngredientsProps = {
  ingredientGroups: IngredientGroup[]
  currentWidth: number | null
  recipeId: number
}

const MULTI_COLUMN_BREAKPOINT = 800
const INGREDIENTS_SECTION_TITLE = 'INGREDIENTS'

const RecipeIngredients = ({ ingredientGroups, currentWidth, recipeId }: RecipeIngredientsProps) => {
  const columnCount = currentWidth && currentWidth > MULTI_COLUMN_BREAKPOINT ? 2 : 1

  return (
    <div>
      <Flex {...titleAndDividerCss}>
        <Title title={INGREDIENTS_SECTION_TITLE} variant={TitleVariant.MediumPale} />
        <Divider {...dividerCss} />
      </Flex>

      <div style={{ ...columnsCss(columnCount) }}>
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
      </div>

      <Flex {...titleAndDividerCss}>
        <Divider {...dividerCss} />
      </Flex>
    </div>
  )
}

export default RecipeIngredients

const columnsCss = (columnCount: number) => {
  return {
    columnCount: columnCount,
    columnGap: '20px',
    marginTop: '15px',
    columnRuleStyle: 'dashed',
    columnRuleWidth: '1px',
    columnRuleColor: ColorCodes.MEDIUM
  }
}

const titleAndDividerCss = {
  marginLeft: '10px',
  flexDirection: 'column' as ChakraProps['flexDirection'],
  marginRight: '10px'
}

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

const dividerCss = {
  marginTop: '5px',
  borderColor: ColorCodes.MEDIUM,
  borderWidth: '1.0px',
  variant: 'dashed'
}

const overFlowTextCss = {
  overflow: 'wrap',
  flex: 1
}
