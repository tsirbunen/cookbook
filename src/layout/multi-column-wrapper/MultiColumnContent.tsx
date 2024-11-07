import { type ChakraProps, Divider, Flex } from '@chakra-ui/react'
import React from 'react'
import { Shades } from '../../constants/shades'
import Title, { TitleVariant } from '../../widgets/titles/Title'

type MultiColumnContentProps = {
  columnCount: number
  keyId: number
  children: JSX.Element
  title?: string
  isCentered?: boolean
}

export const MULTI_COLUMN_DIV = 'multi-column-div'

const MultiColumnContent = ({ columnCount, title, keyId, children, isCentered = false }: MultiColumnContentProps) => {
  return (
    <Flex {...columnsContainerCss(isCentered)}>
      <div style={{ ...outerCss(!!title) }} key={`multi-column-${keyId}`}>
        {title ? (
          <Flex {...titleAndDividerCss}>
            <Title title={title} variant={TitleVariant.MediumPale} />
            <Divider {...dividerCss} />
          </Flex>
        ) : null}

        <div style={{ ...columnsCss(columnCount) }} data-testid={MULTI_COLUMN_DIV}>
          {children}
        </div>
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
    columnRuleColor: Shades.MEDIUM
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
  borderColor: Shades.MEDIUM,
  borderWidth: '1.0px',
  variant: 'dashed'
}
