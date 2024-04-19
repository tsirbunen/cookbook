import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'

import { withTestFormWrapper } from '../../../test-utils/with-test-form-wrapper'
import FormSubmitButtons, { formSubmitButtonsDataTestId } from '../FormSubmitButtons'
import { applyFiltersLabel, clearFormLabel } from '../../../app-pages/search/search-management/FilteringManagementTool'

describe('FormSubmitButtons', () => {
  it('both apply and clear buttons are rendered', () => {
    const onApplyFn = jest.fn()
    const onClearFn = jest.fn()
    const { component, applyButton, clearButton } = renderFormSubmitButtonsWrappedInForm(onApplyFn, onClearFn)
    expect(component).toBeInTheDocument()
    expect(applyButton).toBeInTheDocument()
    expect(clearButton).toBeInTheDocument()
  })

  it('both apply and clear buttons can be clicked when not disabled', async () => {
    const onApplyFn = jest.fn()
    const onClearFn = jest.fn()
    const { applyLabel, clearLabel } = renderFormSubmitButtonsWrappedInForm(onApplyFn, onClearFn)
    fireEvent.click(screen.getByText(applyLabel))
    await wait()
    expect(onApplyFn).toHaveBeenCalled()
    fireEvent.click(screen.getByText(clearLabel))
    await wait()
    expect(onClearFn).toHaveBeenCalled()
  })

  it('neither apply nor clear button can be clicked when disabled', async () => {
    const onApplyFn = jest.fn()
    const onClearFn = jest.fn()
    const { applyLabel, clearLabel } = renderFormSubmitButtonsWrappedInForm(onApplyFn, onClearFn, true)
    fireEvent.click(screen.getByText(applyLabel))
    await wait()
    expect(onApplyFn).not.toHaveBeenCalled()
    fireEvent.click(screen.getByText(clearLabel))
    await wait()
    expect(onClearFn).not.toHaveBeenCalled()
  })
})

const getFormButtonSubmitButtonsWrappedInForm = (onSubmitFn: jest.Mock) => {
  const defaultValues = { options: [] }
  return withTestFormWrapper(FormSubmitButtons, onSubmitFn, defaultValues, '', true)
}

const renderFormSubmitButtonsWrappedInForm = (onApplyFn: jest.Mock, onClearFn: jest.Mock, disabled = false) => {
  const FormSubmitButtonsWrappedInForm = getFormButtonSubmitButtonsWrappedInForm(onApplyFn)
  const applyLabel = applyFiltersLabel.toUpperCase()
  const clearLabel = clearFormLabel.toUpperCase()
  render(
    <FormSubmitButtonsWrappedInForm
      labelCancel={clearLabel}
      labelSubmit={applyLabel}
      clearFormValues={onClearFn}
      clearIsDisabled={disabled}
      submitIsDisabled={disabled}
    />
  )

  const component = screen.getByTestId(formSubmitButtonsDataTestId)
  const applyButton = screen.getByText(applyLabel)
  const clearButton = screen.getByText(clearLabel)
  return { component, applyButton, clearButton, applyLabel, clearLabel }
}

const wait = async () => new Promise((resolve) => setTimeout(resolve, 250))
