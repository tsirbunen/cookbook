import React from 'react'
import { ChakraProps, Flex, Text } from '@chakra-ui/react'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { InstructionGroup } from '../../../types/graphql-schema-types.generated'
import CheckboxWithTheme from '../../../theme/checkboxes/CheckboxWithTheme'
import { ColorCodes } from '../../../theme/theme'
import MultiColumnContent from './MultiColumnContent'
type RecipeIngredientsProps = {
  instructionGroups: InstructionGroup[]
  currentWidth: number | null
  recipeId: number
}

const INSTRUCTIONS_SECTION_TITLE = 'INSTRUCTIONS'

const RecipeIngredients = ({ instructionGroups, currentWidth, recipeId }: RecipeIngredientsProps) => {
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

                return (
                  <React.Fragment key={`instruction-row-${group.id}-${id}-${recipeId}`}>
                    <Flex {...ingredientRowCss}>
                      <Flex {...checkboxCss}>
                        <CheckboxWithTheme isChecked={false} onChange={() => console.log('CHECK')} />
                      </Flex>
                      <Flex {...overFlowTextCss}>
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
