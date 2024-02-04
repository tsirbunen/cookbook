import { ChakraProps, Flex } from '@chakra-ui/react'
import { ColorCodes } from '../theme'

export const badgeSize = 22

type BadgeProps = {
  count: number
}

const Badge = ({ count }: BadgeProps) => {
  return <Flex {...badgeStyles}>{count}</Flex>
}

export default Badge

const badgeStyles = {
  width: `${badgeSize}px`,
  height: `${badgeSize}px`,
  bg: ColorCodes.DARK,
  borderRadius: `${badgeSize / 2}px`,
  position: 'relative' as ChakraProps['position'],
  right: `${badgeSize / 2}px`,
  top: `-${badgeSize / 4}px`,
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'center',
  color: ColorCodes.VERY_PALE,
  fontWeight: 'bold',
  overflow: 'visible'
}
