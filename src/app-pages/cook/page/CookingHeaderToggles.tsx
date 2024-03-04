/** @jsxImportSource @emotion/react */

import React, { useContext } from 'react'
import { css } from '@emotion/react'
import CardRadioButtonSelector from '../../../widgets/card-radio-button-selector/CardRadioButtonSelector'
import { TbColumns1, TbColumns2, TbColumns3, TbPlayerTrackPrev, TbPlayerTrackNext } from 'react-icons/tb'
import Toggles from '../../../widgets/header-with-optional-toggles/Toggles'
import { CookingContext } from './CookingProvider'

const displayCountOptions = [
  { label: '1', value: 1, icon: TbColumns1 },
  { label: '2', value: 2, icon: TbColumns2 },
  { label: '3', value: 3, icon: TbColumns3 }
]

const displayPreviousNextOptions = [
  { label: 'previous', value: 'previous', icon: TbPlayerTrackPrev },
  { label: 'next', value: 'next', icon: TbPlayerTrackNext }
]

const CookingHeaderToggles = () => {
  const { displayCount, changeNumberOfRecipesToDisplay, pickedRecipesCount } = useContext(CookingContext)
  const showToggleDisplayRecipesCount = pickedRecipesCount > 1

  return (
    <Toggles isMobile={false}>
      {showToggleDisplayRecipesCount ? (
        <div css={selectorLeft}>
          <CardRadioButtonSelector
            options={displayCountOptions}
            currentValue={displayCount}
            selectValue={(newValue) => changeNumberOfRecipesToDisplay(newValue)}
            noMargin={true}
          />
        </div>
      ) : null}

      <div css={selectorRight}>
        <CardRadioButtonSelector
          options={displayPreviousNextOptions}
          currentValue={'previous'}
          selectValue={() => console.log('x')}
          noMargin={true}
        />
      </div>
    </Toggles>
  )
}

export default CookingHeaderToggles

const spacing = 5

const selectorLeft = css`
  margin-right: ${spacing}px;
`

const selectorRight = css`
  margin-left: ${spacing}px;
`
