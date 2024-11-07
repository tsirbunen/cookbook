import { Text } from '@chakra-ui/react'
import { Shades } from '../../constants/shades'

export enum TitleVariant {
  Small = 'Small',
  Medium = 'Medium',
  MediumPale = 'MediumPale',
  MediumMedium = 'MediumMedium',
  SmallPale = 'SmallPale',
  MediumLeft = 'MediumLeft',
  MediumRegular = 'MediumRegular'
}

type TitleProps = {
  title: string
  variant: TitleVariant
  color?: string
}

const Title = ({ title, variant, color }: TitleProps) => {
  const css = variantCssMap[variant]
  if (color) css.color = color

  return <Text {...css}>{title}</Text>
}

export default Title

const variantCssMap = {
  [TitleVariant.MediumRegular]: {
    marginTop: '10px',
    fontWeight: 'bold',
    color: Shades.VERY_DARK,
    marginLeft: '15px'
  },
  [TitleVariant.MediumLeft]: {
    fontWeight: 'bold',
    fontSize: '1.1em',
    color: Shades.DARK,
    margin: '10px 0px 5px 5px',
    width: '100%',
    justifyContent: 'start'
  },
  [TitleVariant.Small]: {
    fontWeight: 'bold',
    color: Shades.VERY_DARK,
    fontSize: '0.9em'
  },
  [TitleVariant.Medium]: {
    fontWeight: 'bold',
    color: Shades.VERY_DARK,
    fontSize: '1.3em'
  },
  [TitleVariant.MediumMedium]: {
    fontWeight: 'bold',
    color: Shades.MEDIUM,
    fontSize: '1.3em'
  },
  [TitleVariant.MediumPale]: {
    fontWeight: 'bold',
    color: Shades.DARK,
    fontSize: '1.1em'
  },
  [TitleVariant.SmallPale]: {
    fontWeight: 'bold',
    color: Shades.MEDIUM,
    fontSize: '0.9em'
  }
}
