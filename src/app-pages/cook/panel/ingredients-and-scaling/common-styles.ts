import { Shades } from '../../../../constants/shades'

export const nameCss = (isPale: boolean) => {
  return {
    overflow: 'wrap',
    flex: 1,
    color: isPale ? Shades.SLIGHTLY_PALE : Shades.VERY_DARK
  }
}
