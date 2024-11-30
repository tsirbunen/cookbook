import { Shades } from '../../constants/shades'

const requiredAsterisk = '*'

const RequiredAsterisk = () => {
  return <span style={{ ...asteriskCss }}>{requiredAsterisk} </span>
}

export default RequiredAsterisk

const asteriskCss = {
  color: Shades.ERROR
}
