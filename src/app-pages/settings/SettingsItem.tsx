import { ChakraProps, Flex } from '@chakra-ui/react'
import Title, { TitleVariant } from '../../widgets/titles/Title'
import { DARK_COLOR } from '../../constants/color-codes'
import CustomDivider from '../../widgets/divider/CustomDivider'

type SettingsItemProps = {
  title: string
  children?: React.ReactNode
}

const SettingsItem = ({ title, children }: SettingsItemProps) => {
  return (
    <Flex {...outerCss}>
      <Flex {...titleCss}>
        <Title title={title} variant={TitleVariant.Medium} color={DARK_COLOR} />
      </Flex>
      <CustomDivider />
      {children}
    </Flex>
  )
}

export default SettingsItem

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start',
  marginTop: '20px',
  marginBottom: '20px',
  width: '100%',
  flex: 1
}

const titleCss = {
  marginBottom: '10px'
}
