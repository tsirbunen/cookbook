import { Text } from '@chakra-ui/react'
import { Fragment } from 'react'
import { Shades } from '../../constants/shades'
import TitleWithSpacing from './TitleWithSpacing'
import { content } from './textContent'

const GeneralAccountInfo = () => {
  return (
    <Fragment>
      <TitleWithSpacing title={content.generalAccountTitle} />

      {content.generalAccountInfo.map((info, index) => {
        const key = `general-account-info-${index}`
        return (
          <Text key={key} {...infoCss}>
            {info}
          </Text>
        )
      })}
    </Fragment>
  )
}

export default GeneralAccountInfo

const infoCss = {
  lineHeight: '1.15em',
  color: Shades.SLIGHTLY_DARK,
  marginBottom: '10px'
}
