import { Text } from '@chakra-ui/react'
import { ColorCodes } from '../../theme/theme'

export enum TitleVariant {
  Small = 'Small',
  MediumLeft = 'Medium',
  MediumRegular = 'MediumRegular'
}

type TitleProps = {
  title: string
  variant: TitleVariant
}

const Title = ({ title, variant }: TitleProps) => {
  const css = variantCssMap[variant]

  return <Text {...css}>{title}</Text>
}

export default Title

const variantCssMap = {
  [TitleVariant.MediumRegular]: {
    marginTop: '10px',
    fontWeight: 'bold',
    color: ColorCodes.VERY_DARK,
    marginLeft: '15px'
  },
  [TitleVariant.MediumLeft]: {
    fontWeight: 'bold',
    fontSize: '0.9em',
    color: ColorCodes.VERY_DARK,
    margin: '10px 0px 5px 5px',
    width: '100%',
    justifyContent: 'start'
  },
  [TitleVariant.Small]: {
    fontWeight: 'bold',
    color: ColorCodes.VERY_DARK,
    fontSize: '0.9em'
  }
}
