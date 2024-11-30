import { Flex } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'
import { outerColumnCss } from '../../utils/styles'
import CustomDivider from '../../widgets/divider/CustomDivider'
import Title, { TitleVariant } from '../../widgets/titles/Title'

type SettingsItemProps = {
  title: string
  children?: React.ReactNode
}

const SettingsItem = ({ title, children }: SettingsItemProps) => {
  return (
    <Flex {...outerColumnCss()}>
      <Title title={title} variant={TitleVariant.Medium} color={Shades.DARK} />

      <CustomDivider marginTop="5px" marginBottom="20px" />

      {children}
    </Flex>
  )
}

export default SettingsItem
