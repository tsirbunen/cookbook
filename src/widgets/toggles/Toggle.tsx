import { Flex } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import Badge from '../badge/Badge'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import { BADGE_SIZE } from '../../constants/widgets'

export const selectModeToggleProperty = 'selectMode'
export const pickedRecipesToggleProperty = 'pickedRecipes'
export const filteringToggleProperty = 'filtering'
export const cookToggleProperty = 'cook'
export const addedIngredientToggleProperty = 'addedIngredient'
export const multiColumnToggleProperty = 'multiColumn'
export const cookingTimerToggleProperty = 'cookingTimer'

export type ToggleProps = {
  isToggled: boolean
  toggle: () => void
  Icon: IconType
  count?: number | null
  isDisabled?: boolean
  toggleProperty: string
}

const Toggle = ({ isToggled, toggle, Icon, count, isDisabled, toggleProperty }: ToggleProps) => {
  return (
    <Flex {...toggleStyles} data-testid={toggleProperty}>
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
        <Flex width={`${BADGE_SIZE}px`} />
      ) : null}
    </Flex>
  )
}

const toggleStyles = {
  marginLeft: '0px',
  marginRight: '0px'
}

export default Toggle
