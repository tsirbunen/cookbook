import { Text } from '@chakra-ui/react'

type TitleWithLinkProps = {
  title: string
  url: string
}

const TitleWithLink = ({ title }: TitleWithLinkProps) => {
  return <Text {...titleCss}>{title}</Text>
}

export default TitleWithLink

const titleCss = {
  fontWeight: 'bold',
  fontSize: '0.9em',
  marginRight: '10px',
  _hover: {
    textDecoration: 'underline'
  }
}
