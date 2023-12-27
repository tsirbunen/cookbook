import { Text, Flex, Divider } from '@chakra-ui/react'
import { ColorCodes } from '../../../theme/theme'

export const drawerItemDataCy = 'drawer-menu-item'

type DrawerNavigationMenuItemProps = {
  content: string
  iconElement: any
  showDividerBelow: boolean
  onClick: () => void
}

const NavigationDrawerItem = ({
  iconElement,
  content,
  onClick,
  showDividerBelow
}: DrawerNavigationMenuItemProps) => {
  const contentColor = ColorCodes.DARK
  const IconElement = iconElement
  const icon = <IconElement fontSize="1.75em" color={ColorCodes.DARK} />

  return (
    <Flex flexDirection="column" marginBottom="10px" onClick={onClick} data-cy={drawerItemDataCy}>
      <Divider marginBottom="10px" borderColor={contentColor} borderWidth="1px" />

      <Flex flexDirection="row" alignItems="center">
        <Flex backgroundColor={ColorCodes.VERY_PALE} borderRadius="25px" padding="8px">
          {icon}
        </Flex>

        <Text marginLeft="20px" as="b" color={contentColor}>
          {content}
        </Text>
      </Flex>

      {showDividerBelow ? (
        <Divider marginTop="10px" borderColor={contentColor} borderWidth="1px" />
      ) : null}
    </Flex>
  )
}

export default NavigationDrawerItem
