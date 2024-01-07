'use client'

import { useRouter } from 'next/navigation'
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

import NavigationDrawerItem from './NavigationDrawerItem'

import { navigationMenuItems } from '../router/router'
import { ColorCodes } from '../../theme/theme'

export const drawerTitle = 'CONTENTS'
export const drawerButtonDataCy = 'drawer-menu-button'
export const drawerDataCy = 'drawer-menu'

/**
 * Menu icon button with onClick action to open a navigation drawer (from left).
 * Intended to be used when app use mode is mobile.
 */
const NavigationDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  return (
    <>
      <IconButton
        aria-label="Navigation-menu"
        icon={<TbMenu2 fontSize="1.5em" color={ColorCodes.VERY_DARK} strokeWidth="3" />}
        onClick={onOpen}
        backgroundColor={ColorCodes.VERY_PALE}
        size="sm"
        margin="10px"
        data-cy={drawerButtonDataCy}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay backgroundColor={ColorCodes.VERY_DARK} />
        <DrawerContent style={{ backgroundColor: ColorCodes.BACKGROUND }} data-cy={drawerDataCy}>
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
                  onClick={() => {
                    router.push(menuItem.path)
                    onClose()
                  }}
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
