import { ChakraProps, Divider, Flex } from '@chakra-ui/react'
import Title, { TitleVariant } from '../../widgets/titles/Title'
import { DARK_COLOR, MEDIUM_COLOR } from '../../constants/color-codes'

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
      <Flex {...dividerContainerCss}>
        <Divider {...dividerCss} />
      </Flex>
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

const dividerContainerCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  marginBottom: '10px',
  width: '100%'
}

const dividerCss = {
  borderColor: MEDIUM_COLOR,
  borderWidth: '1.0px',
  variant: 'dashed'
}
