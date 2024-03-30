import React from 'react'
import { ChakraProps, Divider, Flex } from '@chakra-ui/react'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { ColorCodes } from '../../../theme/theme'

type MultiColumnContentProps = {
  columnCount: number
  recipeId: number
  children: JSX.Element
  title: string
}

const MultiColumnContent = ({ columnCount, title, recipeId, children }: MultiColumnContentProps) => {
  // const columnCount = currentWidth && currentWidth > MULTI_COLUMN_BREAKPOINT ? 2 : 1

  return (
    <div style={{ ...outerCss }} key={`multi-column-${recipeId}`}>
      <Flex {...titleAndDividerCss}>
        <Title title={title} variant={TitleVariant.MediumPale} />
        <Divider {...dividerCss} />
      </Flex>

      <div style={{ ...columnsCss(columnCount) }}>{children}</div>
    </div>
  )
}

export default MultiColumnContent

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

const outerCss = {
  marginTop: '30px',
  marginLeft: '5px',
  marginRight: '5px'
}

const titleAndDividerCss = {
  marginLeft: '10px',
  flexDirection: 'column' as ChakraProps['flexDirection'],
  marginRight: '10px'
}

const dividerCss = {
  marginTop: '10px',
  borderColor: ColorCodes.MEDIUM,
  borderWidth: '1.0px',
  variant: 'dashed'
}
