import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import FormButtonsSelector, { formButtonsSelectorDataTestId } from '../FormButtonsSelector'
import { withTestFormWrapper } from '../../../test-utils/with-test-form-wrapper'

const options = ['Option1', 'Option2', 'Option3']
const submitLabel = 'SUBMIT'
const lastButtonIndex = options.length - 1

describe('FormButtonSelector', () => {
  it('form component renders with all option selection buttons', () => {
    const onSubmitFn = jest.fn()
    const { component } = renderFormButtonSelectorComponentsWrappedInForm(onSubmitFn)
    expect(component).toBeInTheDocument()
    const optionNodes = component.querySelectorAll('button')
    expect(optionNodes).toHaveLength(options.length)
    optionNodes.forEach((node, index) => {
      expect(node).toHaveTextContent(options[index].toUpperCase())
    })
  })

  it('option can be clicked to select option', async () => {
    const onSubmitFn = jest.fn()
    const { submitButton, lastOptionButton } = renderFormButtonSelectorComponentsWrappedInForm(onSubmitFn)
    fireEvent.click(lastOptionButton)
    fireEvent.click(submitButton)
    await wait()
    expect(onSubmitFn).toHaveBeenCalledTimes(1)
    expect(onSubmitFn.mock.calls[0][0]).toEqual({ options: [options[lastButtonIndex]] })
  })

  it('options can all be selected', async () => {
    const onSubmitFn = jest.fn()
    const { component, submitButton } = renderFormButtonSelectorComponentsWrappedInForm(onSubmitFn)
    for (const optionButton of component.querySelectorAll('button')) {
      fireEvent.click(optionButton)
    }

    fireEvent.click(submitButton)
    await wait()
    expect(onSubmitFn).toHaveBeenCalledTimes(1)
    expect(onSubmitFn.mock.calls[0][0]).toEqual({ options })
  })

  it('option can be clicked to select and unselect option (not submit in between)', async () => {
    const onSubmitFn = jest.fn()
    const { lastOptionButton, submitButton } = renderFormButtonSelectorComponentsWrappedInForm(onSubmitFn)
    fireEvent.click(lastOptionButton)
    fireEvent.click(lastOptionButton)

    fireEvent.click(submitButton)
    await wait()
    expect(onSubmitFn).toHaveBeenCalledTimes(1)
    expect(onSubmitFn.mock.calls[0][0]).toEqual({ options: [] })
  })

  it('option can be clicked to select and unselect option (submit in between)', async () => {
    const onSubmitFn = jest.fn()
    const { lastOptionButton, submitButton } = renderFormButtonSelectorComponentsWrappedInForm(onSubmitFn)
    fireEvent.click(lastOptionButton)
    fireEvent.click(submitButton)
    await wait()
    fireEvent.click(lastOptionButton)
    fireEvent.click(submitButton)
    await wait()
    expect(onSubmitFn).toHaveBeenCalledTimes(2)
    expect(onSubmitFn.mock.calls[0][0]).toEqual({ options: [options[lastButtonIndex]] })
    expect(onSubmitFn.mock.calls[1][0]).toEqual({ options: [] })
  })
})

const getFormButtonsSelectorWrappedInForm = (onSubmitFn: jest.Mock) => {
  const defaultValues = { options: [] }
  return withTestFormWrapper(FormButtonsSelector, onSubmitFn, defaultValues, submitLabel)
}

const renderFormButtonSelectorComponentsWrappedInForm = (onSubmitFn: jest.Mock) => {
  const FormButtonsSelectorWrappedInForm = getFormButtonsSelectorWrappedInForm(onSubmitFn)
  render(<FormButtonsSelectorWrappedInForm label={''} name="options" options={options} />)

  const component = screen.getByTestId(formButtonsSelectorDataTestId)
  const submitButton = screen.getByText(submitLabel)
  const lastOptionButton = component.querySelectorAll('button')[lastButtonIndex]
  return { component, submitButton, lastOptionButton }
}

const wait = async () => new Promise((resolve) => setTimeout(resolve, 250))
