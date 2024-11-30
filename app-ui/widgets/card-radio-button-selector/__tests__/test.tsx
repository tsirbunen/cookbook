import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import { CardRadioButtonSelectorVariant } from '../CardRadioButton'
import CardRadioButtonSelector, { cardRadioButtonSelectorDataTestId } from '../CardRadioButtonSelector'

const textOptions = [
  { label: 'Option 1 label', value: 'Option 1 value' },
  { label: 'Option 2 label', value: 'Option 2 value' },
  { label: 'Option 3 label', value: 'Option 3 value' }
]

const numberOptions = [
  { label: 'Option 1 label', value: 1 },
  { label: 'Option 2 label', value: 2 },
  { label: 'Option 3 label', value: 3 }
]

describe('CardRadioButtonSelector', () => {
  it('option selection buttons render (case value is of type text)', () => {
    render(
      <CardRadioButtonSelector
        options={textOptions}
        currentValue={textOptions[0].value}
        selectValue={() => {}}
        variant={CardRadioButtonSelectorVariant.DarkWithFill}
      />
    )

    const component = screen.getByTestId(cardRadioButtonSelectorDataTestId)
    expect(component).toBeInTheDocument()

    const optionNodes = component.querySelectorAll('button')
    expect(optionNodes).toBeDefined()
    expect(optionNodes).toHaveLength(textOptions.length)
    optionNodes.forEach((node, index) => {
      expect(node).toHaveTextContent(textOptions[index].label)
    })
  })

  it('option selection button can be clicked (case value is of type text)', () => {
    const onSelectValueMock = jest.fn()

    render(
      <CardRadioButtonSelector
        options={textOptions}
        currentValue={textOptions[0].value}
        selectValue={onSelectValueMock}
        variant={CardRadioButtonSelectorVariant.DarkWithFill}
      />
    )

    const component = screen.getByTestId(cardRadioButtonSelectorDataTestId)
    const button = component.querySelectorAll('button')[0]
    fireEvent.click(button)
    expect(onSelectValueMock).toHaveBeenCalledTimes(1)
    expect(onSelectValueMock).toHaveBeenCalledWith(textOptions[0].value)
  })

  it('option selection button can be clicked (case value is of type number)', () => {
    const onSelectValueMock = jest.fn()

    render(
      <CardRadioButtonSelector
        options={numberOptions}
        currentValue={numberOptions[0].value}
        selectValue={onSelectValueMock}
        variant={CardRadioButtonSelectorVariant.DarkWithFill}
      />
    )

    const component = screen.getByTestId(cardRadioButtonSelectorDataTestId)
    const button = component.querySelectorAll('button')[0]
    fireEvent.click(button)
    expect(onSelectValueMock).toHaveBeenCalledTimes(1)
    expect(onSelectValueMock).toHaveBeenCalledWith(numberOptions[0].value)
  })
})
