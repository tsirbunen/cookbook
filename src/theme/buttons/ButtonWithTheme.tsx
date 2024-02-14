import { Button } from '@chakra-ui/react'
import { ButtonVariant } from './buttons-theme'

type ButtonWithThemeProps = {
  variant: ButtonVariant
  onClick?: () => void
  children?: JSX.Element | React.ReactNode
  label?: string
  isDisabled?: boolean
  isToggled?: boolean
  isSubmit?: boolean
}

/**
 *
 * This button component is a Chakra UI Button with custom theme and custom properties.
 * The customization is enabled through custom variants configured with Chakra UI's tools.
 */
const ButtonWithTheme = ({
  children,
  variant,
  label,
  onClick,
  isDisabled,
  isToggled,
  isSubmit
}: ButtonWithThemeProps) => {
  // Note: this trick is needed to pass on a non-DOM-property "toggled" to our Button variant
  const isToggledProp = { toggled: isToggled ? 'true' : undefined }
  const content = children ? children : label ? label : null

  return (
    <Button
      variant={variant}
      {...isToggledProp}
      onClick={onClick}
      isDisabled={isDisabled}
      type={isSubmit ? 'submit' : 'button'}
      key={label}
    >
      {content}
    </Button>
  )
}

export default ButtonWithTheme
