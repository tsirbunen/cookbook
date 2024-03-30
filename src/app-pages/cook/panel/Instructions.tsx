import React, { useContext, useMemo } from 'react'
import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { InstructionGroup } from '../../../types/graphql-schema-types.generated'
import CheckboxWithTheme, { CheckboxVariant } from '../../../theme/checkboxes/CheckboxWithTheme'
import { ColorCodes } from '../../../theme/theme'
import MultiColumnContent from './MultiColumnContent'
import { CookingContext } from '../page/CookingProvider'
type RecipeIngredientsProps = {
  instructionGroups: InstructionGroup[]
  currentWidth: number | null
  recipeId: number
}

const INSTRUCTIONS_SECTION_TITLE = 'INSTRUCTIONS'

const Instructions = ({ instructionGroups, currentWidth, recipeId }: RecipeIngredientsProps) => {
  const { cookingRecipes, instructionsDone, toggleInstructionDone } = useContext(CookingContext)

  const isCookingRecipe = useMemo(() => {
    return cookingRecipes.some((cookingRecipeData) => cookingRecipeData.recipe.id === recipeId)
  }, [cookingRecipes])
  const showCheckboxes = useMemo(() => cookingRecipes.map((r) => r.recipe.id).includes(recipeId), [cookingRecipes])

  return (
    <MultiColumnContent currentWidth={currentWidth} title={INSTRUCTIONS_SECTION_TITLE} recipeId={recipeId}>
      <Flex {...containerCss}>
        {instructionGroups.map((group, index) => {
          const { title, instructions } = group

          return (
            <Flex {...ingredientGroupCss} key={`${title}-${index}-${recipeId}`}>
              {title ? (
                <Flex marginBottom="5px">
                  <Title title={title} variant={TitleVariant.MediumPale} />
                </Flex>
              ) : null}

              {instructions.map((instruction, i) => {
                const { id, content } = instruction
                const isLastInGroup = i === instructions.length - 1
                const isChecked = instructionsDone.includes(instruction.id)
                const showAsPale = isChecked && isCookingRecipe

                return (
                  <React.Fragment key={`instruction-row-${group.id}-${id}-${recipeId}`}>
                    <Flex {...ingredientRowCss}>
                      {showCheckboxes ? (
                        <Flex {...checkboxCss}>
                          <CheckboxWithTheme
                            isChecked={showAsPale}
                            onChange={() => toggleInstructionDone(instruction.id)}
                            variant={CheckboxVariant.Pale}
                          />
                        </Flex>
                      ) : (
                        <Flex {...indexCss}>
                          <Text>{i + 1}</Text>
                        </Flex>
                      )}
                      <Flex {...overFlowTextCss(showAsPale)}>
                        <Text>{content}</Text>
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

export default Instructions

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

const indexCss = {
  width: '25px',
  height: '25px',
  backgroundColor: ColorCodes.PALE,
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'center' as ChakraProps['alignItems'],
  justifyContent: 'center' as ChakraProps['justifyContent'],
  color: ColorCodes.DARK,
  fontWeight: 'bold',
  borderRadius: '50%',
  marginRight: '5px'
}

const overFlowTextCss = (isPale: boolean) => {
  return {
    overflow: 'wrap',
    flex: 1,
    color: isPale ? ColorCodes.SLIGHTLY_PALE : ColorCodes.VERY_DARK
  }
}
