import { type ChakraProps, Flex, Text } from '@chakra-ui/react'
import { Shades } from '../../../../constants/shades'
import type { Tag } from '../../../../types/graphql-schema-types.generated'

type RecipeTagsProps = {
  tags: Tag[]
}

const HASHTAG = '#'

const RecipeTags = ({ tags }: RecipeTagsProps) => {
  return (
    <Flex {...outerCss}>
      <Flex {...innerCss}>
        {tags.map(({ tag }, index) => {
          return (
            <Flex key={`${index}-${tag}`} {...tagCss}>
              <Text {...textCss}>
                {HASHTAG}
                {tag.toUpperCase()}
              </Text>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default RecipeTags

const outerCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '10px'
}

const innerCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0px 0px 0px 0px',
  flexWrap: 'wrap' as ChakraProps['flexWrap']
}

const tagCss = {
  marginLeft: '5px',
  marginRight: '5px',
  backgroundColor: Shades.VERY_PALE,
  padding: '0px 4px',
  borderRadius: '4px'
}

const textCss = {
  color: Shades.SLIGHTLY_DARK,
  fontWeight: 'bold',
  fontSize: 'sm'
}
