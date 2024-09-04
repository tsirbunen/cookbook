import { Flex } from '@chakra-ui/react'
import Title, { TitleVariant } from '../../widgets/titles/Title'

const TitleWithSpacing = ({ title }: { title: string }) => {
  return (
    <Flex {...titleCss}>
      <Title variant={TitleVariant.MediumMedium} title={title} />
    </Flex>
  )
}

export default TitleWithSpacing

const titleCss = {
  marginBottom: '10px',
  marginTop: '30px'
}
