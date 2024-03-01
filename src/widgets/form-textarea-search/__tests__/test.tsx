import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import FormTextAreaSearch, { SearchMode, formTextAreaSearchDataTestId } from '../FormTextAreaSearch'
import { withTestFormWrapper } from '../../../test-utils/with-test-form-wrapper'
import { cardRadioButtonSelectorDataTestId } from '../../card-radio-button-selector/CardRadioButtonSelector'

const submitLabel = 'SUBMIT'
const placeholder = 'Type search terms here...'
const target = 'ingredients'

describe('FormTextAreaSearch', () => {
  it('form component renders with all of its children', () => {
    const onSubmitFn = jest.fn()
    const { component, textArea, searchModeButtons, trashButton } =
      renderFormTextAreaSearchComponentsWrappedInForm(onSubmitFn)
    expect(component).toBeInTheDocument()
    expect(textArea).toBeInTheDocument()
    expect(searchModeButtons).toBeInTheDocument()
    expect(trashButton).toBeDefined()
  })

  it('search term with default OR can be entered', async () => {
    const onSubmitFn = jest.fn()
    const { textArea, submitButton } = renderFormTextAreaSearchComponentsWrappedInForm(onSubmitFn)
    fireEvent.change(textArea!, { target: { value: 'blueberry' } })
    fireEvent.click(submitButton)
    await wait()
    expect(onSubmitFn).toHaveBeenCalledTimes(1)
    expect(onSubmitFn.mock.calls[0][0][target]).toEqual({ searchTerm: 'blueberry', searchMode: SearchMode.OR })
  })

  it('search term can be cleared from textarea input using trash button', async () => {
    const onSubmitFn = jest.fn()
    const { textArea, trashButton, submitButton } = renderFormTextAreaSearchComponentsWrappedInForm(onSubmitFn)
    fireEvent.change(textArea!, { target: { value: 'blueberry' } })
    fireEvent.click(trashButton!)
    fireEvent.click(submitButton)
    await wait()
    expect(onSubmitFn).toHaveBeenCalledTimes(1)
    expect(onSubmitFn.mock.calls[0][0][target]).toEqual({ searchTerm: '', searchMode: undefined })
  })

  it('search mode can be changed to AND after search text is entered', async () => {
    const onSubmitFn = jest.fn()
    const { textArea, searchModeButtons, submitButton } = renderFormTextAreaSearchComponentsWrappedInForm(onSubmitFn)
    fireEvent.change(textArea!, { target: { value: 'blueberry' } })
    fireEvent.click(searchModeButtons.querySelectorAll('button')[0])
    fireEvent.click(submitButton)
    await wait()
    expect(onSubmitFn).toHaveBeenCalledTimes(1)
    expect(onSubmitFn.mock.calls[0][0][target]).toEqual({ searchTerm: 'blueberry', searchMode: SearchMode.AND })
  })
})

const getFormTextAreaSearchWrappedInForm = (onSubmitFn: jest.Mock) => {
  const defaultValues = { ingredients: { searchTerm: '', searchMode: undefined } }
  return withTestFormWrapper(FormTextAreaSearch, onSubmitFn, defaultValues, submitLabel)
}

const wait = async () => new Promise((resolve) => setTimeout(resolve, 250))

const renderFormTextAreaSearchComponentsWrappedInForm = (onSubmitFn: jest.Mock) => {
  const FormTextAreaSearchWrappedInForm = getFormTextAreaSearchWrappedInForm(onSubmitFn)
  render(<FormTextAreaSearchWrappedInForm label={target} name={target} placeholder={placeholder} />)

  const component = screen.getByTestId(formTextAreaSearchDataTestId)
  const textArea = component.querySelector('textarea')
  const searchModeButtons = screen.getByTestId(cardRadioButtonSelectorDataTestId)
  let trashButton
  const allButtons = component.querySelectorAll('button')
  allButtons.forEach((button) => {
    if (button.textContent === '') trashButton = button
  })
  const submitButton = screen.getByText(submitLabel)

  return { component, textArea, searchModeButtons, trashButton, submitButton }
}
