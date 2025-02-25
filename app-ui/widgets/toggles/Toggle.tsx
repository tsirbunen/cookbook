import { Button, type ChakraProps, Flex } from '@chakra-ui/react'
import type { IconType } from 'react-icons/lib'
import { Shades } from '../../constants/shades'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'
import Badge from '../badge/Badge'

export const selectModeToggleProperty = 'selectMode'
export const pickedRecipesToggleProperty = 'pickedRecipes'
export const filteringToggleProperty = 'filtering'
export const favoriteToggleProperty = 'favorite'
export const cookToggleProperty = 'cook'
export const addedIngredientToggleProperty = 'addedIngredient'
export const multiColumnToggleProperty = 'multiColumn'
export const ingredientScalingToggleProperty = 'ingredientScaling'
export const metricOnlyToggleProperty = 'metricOnly'
export const cookingTimerToggleProperty = 'cookingTimer'
export const clearAllToggleProperty = 'clearAll'
export const modifyToggleProperty = 'modify'

export type ToggleProps = {
  isToggled: boolean
  toggle: () => void
  Icon: IconType
  count?: number | null | string
  isDisabled?: boolean
  toggleProperty: string
  children?: JSX.Element
  variant: ButtonVariant
}

const Toggle = ({ isToggled, toggle, Icon, count, isDisabled, toggleProperty, children, variant }: ToggleProps) => {
  const hasCountValue = !!count
  let badgeContent: JSX.Element
  if (!hasCountValue) badgeContent = <Flex width={'10px'} />
  else badgeContent = <Badge count={count as number} />
  const hover = {
    bg: Shades.PALE,
    color: Shades.VERY_DARK,
    _disabled: {
      color: Shades.PALE
    }
  }

  return (
    <Flex {...outerCss(!!children)}>
      <Flex {...toggleStyles(hasCountValue, !!children)} data-testid={toggleProperty}>
        {variant === ButtonVariant.SquareWithIconWithoutFill ? (
          <Button
            onClick={toggle}
            size={'xl'}
            backgroundColor={'transparent'}
            borderColor={'transparent'}
            borderWidth="1.5px"
            color={isToggled ? Shades.DARK : Shades.MEDIUM}
            fontWeight="bold"
            _hover={hover}
            disabled={isDisabled}
          >
            <Icon fontSize="1.75em" />
          </Button>
        ) : (
          <ButtonWithTheme variant={variant} onClick={toggle} isToggled={isToggled} isDisabled={isDisabled}>
            <Icon />
          </ButtonWithTheme>
        )}

        {badgeContent}
      </Flex>

      {children ?? null}
    </Flex>
  )
}

const toggleStyles = (hasCountValue: boolean, isCentered: boolean) => {
  if (isCentered) {
    return {
      marginLeft: '0px',
      marginRight: hasCountValue ? '10px' : '0px',
      flexDirection: 'column' as ChakraProps['flexDirection'],
      alignItems: 'center'
    }
  }
  return {
    marginLeft: '0px',
    marginRight: hasCountValue ? '10px' : '0px',
    position: 'relative' as ChakraProps['position']
  }
}

const outerCss = (addMargin: boolean) => {
  return {
    flexDirection: 'column' as ChakraProps['flexDirection'],
    alignItems: 'center',
    marginRight: addMargin ? '10px' : '0px'
  }
}

export default Toggle
