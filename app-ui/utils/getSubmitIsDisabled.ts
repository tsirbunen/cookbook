import type { FieldErrors, FieldValues } from 'react-hook-form'

export const getSubmitIsDisabled = <T extends FieldValues>(
  touchedFields: Record<string, boolean | boolean[]>,
  initialFormValues: FieldValues,
  errors: FieldErrors<T>,
  isSubmitting: boolean,
  requiredFields: string[]
) => {
  const requiredFieldsHaveValues = requiredFields.every((field) => initialFormValues[field] || touchedFields[field])
  const someFieldHasError = Object.keys(errors).length > 0
  const submitIsDisabled = !requiredFieldsHaveValues || someFieldHasError || isSubmitting
  return submitIsDisabled
}
