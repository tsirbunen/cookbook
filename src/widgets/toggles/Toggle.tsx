import { ChakraProps, Flex } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import Badge from '../badge/Badge'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'

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
  const hasCountValue = count !== null && count !== undefined
  let badgeContent
  if (!hasCountValue) badgeContent = <Flex width={'10px'} />
  else badgeContent = <Badge count={count!} />

  return (
    <Flex {...toggleStyles(hasCountValue)} data-testid={toggleProperty}>
      <ButtonWithTheme
        variant={ButtonVariant.SquareWithIcon}
        onClick={toggle}
        isToggled={isToggled}
        isDisabled={isDisabled}
      >
        <Icon />
      </ButtonWithTheme>

      {badgeContent}
    </Flex>
  )
}

const toggleStyles = (hasCountValue: boolean) => {
  return {
    marginLeft: '0px',
    marginRight: hasCountValue ? '10px' : '0px',
    position: 'relative}' as ChakraProps['position']
  }
}

export default Toggle
