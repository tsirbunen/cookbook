import React from 'react'
import { ChakraProps, Divider, Flex } from '@chakra-ui/react'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { ColorCodes } from '../../../theme/theme'

type MultiColumnContentProps = {
  columnCount: number
  recipeId: number
  children: JSX.Element
  title?: string
  isCentered?: boolean
}

const MultiColumnContent = ({
  columnCount,
  title,
  recipeId,
  children,
  isCentered = false
}: MultiColumnContentProps) => {
  return (
    <Flex {...columnsContainerCss(isCentered)}>
      <div style={{ ...outerCss(!!title) }} key={`multi-column-${recipeId}`}>
        {title ? (
          <Flex {...titleAndDividerCss}>
            <Title title={title} variant={TitleVariant.MediumPale} />
            <Divider {...dividerCss} />
          </Flex>
        ) : null}

        <div style={{ ...columnsCss(columnCount) }}>{children}</div>
      </div>
    </Flex>
  )
}

export default MultiColumnContent

const columnsContainerCss = (isCentered: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    flex: 1,
    alignItems: isCentered ? ('center' as ChakraProps['alignItems']) : undefined
  }
}

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

const outerCss = (hasTopMargin: boolean) => {
  return {
    marginTop: hasTopMargin ? '30px' : '0px',
    marginLeft: '5px',
    marginRight: '5px'
  }
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
