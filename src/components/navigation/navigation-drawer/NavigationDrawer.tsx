import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton
} from '@chakra-ui/react'
import { TbMenu2 } from 'react-icons/tb'
import { ColorCodes } from '../../../theme/theme'
import NavigationDrawerItem from './NavigationDrawerItem'
import { useNavigate } from 'react-router-dom'
import { navigationMenuItems } from '../router/router'

const drawerTitle = 'CONTENTS'

/**
 * Menu icon button with onClick action to open a navigation drawer (from left).
 * Intended to be used when app use mode is mobile.
 */
const NavigationDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigateTo = useNavigate()

  return (
    <>
      <IconButton
        aria-label="Navigation-menu"
        icon={<TbMenu2 fontSize="1.5em" color={ColorCodes.DARK} />}
        onClick={onOpen}
        backgroundColor={ColorCodes.VERY_PALE}
        size="sm"
        margin="10px"
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay backgroundColor={ColorCodes.VERY_DARK} />
        <DrawerContent style={{ backgroundColor: ColorCodes.BACKGROUND }}>
          <DrawerCloseButton color={ColorCodes.DARK} />
          <DrawerHeader fontSize="1.2em" fontWeight="bold" color={ColorCodes.DARK}>
            {drawerTitle}
          </DrawerHeader>

          <DrawerBody>
            {navigationMenuItems.map((menuItem, index) => {
              return (
                <NavigationDrawerItem
                  iconElement={menuItem.iconElement}
                  content={menuItem.label}
                  showDividerBelow={index === navigationMenuItems.length - 1}
                  onClick={() => navigateTo(menuItem.path)}
                  key={menuItem.page}
                />
              )
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default NavigationDrawer
