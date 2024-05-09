import { ColorCodes } from '../../../../theme/theme'

export const nameCss = (isPale: boolean) => {
  return {
    overflow: 'wrap',
    flex: 1,
    color: isPale ? ColorCodes.SLIGHTLY_PALE : ColorCodes.VERY_DARK
  }
}
