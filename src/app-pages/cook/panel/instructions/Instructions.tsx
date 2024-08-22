import React, { useContext, useMemo } from 'react'
import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import { ColorCodes } from '../../../../theme/theme'
import { InstructionGroup } from '../../../../types/graphql-schema-types.generated'
import Title, { TitleVariant } from '../../../../widgets/titles/Title'
import { CookingContext } from '../../page/CookingProvider'
import CheckToggle from '../general/CheckToggle'
import MultiColumnContent from '../../../../layout/multi-column-wrapper/MultiColumnContent'

export const instructionRow = 'instruction-row'

type RecipeIngredientsProps = {
  instructionGroups: InstructionGroup[]
  columnCount: number
  recipeId: number
}

const INSTRUCTIONS_SECTION_TITLE = 'INSTRUCTIONS'

const Instructions = ({ instructionGroups, columnCount, recipeId }: RecipeIngredientsProps) => {
  const { cookingRecipes, instructionsDone, toggleInstruction } = useContext(CookingContext)

  const isCookingRecipe = useMemo(() => {
    return cookingRecipes.some((recipe) => recipe.id === recipeId)
  }, [cookingRecipes])
  const showCheckToggles = useMemo(() => cookingRecipes.map((r) => r.id).includes(recipeId), [cookingRecipes])

  return (
    <MultiColumnContent columnCount={columnCount} title={INSTRUCTIONS_SECTION_TITLE} keyId={recipeId}>
      <Flex {...containerCss}>
        {instructionGroups.map((group, groupIndex) => {
          const { title, instructions } = group

          return (
            <Flex {...ingredientGroupCss} key={`${title}-${groupIndex}-${recipeId}`}>
              <Flex style={{ marginBottom: '5px' }} key={`instruction-${title}-${recipeId}-${groupIndex}`}>
                {title ? <Title title={title} variant={TitleVariant.MediumPale} /> : null}
              </Flex>

              {instructions.map((instruction, i) => {
                const { id, content } = instruction
                const isLastInGroup = i === instructions.length - 1
                const isChecked = instructionsDone.includes(instruction.id)
                const showAsPale = isChecked && isCookingRecipe

                return (
                  <React.Fragment key={`instruction-row-${group.id}-${id}-${recipeId}`}>
                    <Flex {...ingredientRowCss} data-testid={instructionRow}>
                      {showCheckToggles ? (
                        <CheckToggle
                          isChecked={isChecked}
                          onChange={() => toggleInstruction(recipeId, instruction.id)}
                        />
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
