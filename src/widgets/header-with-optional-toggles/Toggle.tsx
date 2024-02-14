import { Flex } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import Badge, { badgeSize } from '../badge/Badge'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'

export type ToggleProps = {
  isToggled: boolean
  toggle: () => void
  Icon: IconType
  count?: number | null
  isDisabled?: boolean
}

const Toggle = ({ isToggled, toggle, Icon, count, isDisabled }: ToggleProps) => {
  return (
    <Flex {...toggleStyles}>
      <ButtonWithTheme
        variant={ButtonVariant.SquareWithIcon}
        onClick={toggle}
        isToggled={isToggled}
        isDisabled={isDisabled}
      >
        <Icon />
      </ButtonWithTheme>

      {count !== undefined && count !== null ? (
        <Badge count={count} />
      ) : count === undefined ? (
        <Flex width={`${badgeSize}px`} />
      ) : null}
    </Flex>
  )
}

const toggleStyles = {
  marginLeft: '0px',
  marginRight: '0px'
}

export default Toggle
