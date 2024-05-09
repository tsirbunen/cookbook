import { ChakraProps, Flex } from '@chakra-ui/react'
import { ColorCodes } from '../../theme/theme'
import { BADGE_SIZE } from '../../constants/layout'

type BadgeProps = {
  count: number | string
}

const Badge = ({ count }: BadgeProps) => {
  return <Flex {...badgeStyles}>{count}</Flex>
}

export default Badge

const badgeStyles = {
  width: `${BADGE_SIZE}px`,
  height: `${BADGE_SIZE}px`,
  bg: ColorCodes.VERY_DARK,
  borderRadius: `${BADGE_SIZE / 2}px`,
  position: 'absolute' as ChakraProps['position'],
  right: `-${BADGE_SIZE / 3}px`,
  top: `-${BADGE_SIZE / 4}px`,
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'center',
  color: ColorCodes.VERY_PALE,
  fontWeight: 'bold',
  overflow: 'visible'
}
