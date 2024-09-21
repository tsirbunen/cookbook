import { Text } from '@chakra-ui/react'
import { SLIGHTLY_DARK_COLOR } from '../../constants/color-codes'
import { Fragment } from 'react'
import TitleWithSpacing from './TitleWithSpacing'
import { content } from './textContent'

const GeneralAccountInfo = () => {
  return (
    <Fragment>
      <TitleWithSpacing title={content.generalAccountTitle} />

      {content.generalAccountInfo.map((info, index) => (
        <Text key={`general-account-info-${index}`} {...infoCss}>
          {info}
        </Text>
      ))}
    </Fragment>
  )
}

export default GeneralAccountInfo

const infoCss = {
  lineHeight: '1.15em',
  color: SLIGHTLY_DARK_COLOR,
  marginBottom: '10px'
}
