import Ajv, { ValidateFunction } from 'ajv'
import AjvFormats from 'ajv-formats'
import AjvErrors from 'ajv-errors'
import { JSONSchemaType } from '../../types/types'
import { FieldErrors, FieldValues } from 'react-hook-form'
import { CreateEmailAccountFormValues } from '../../widgets/form-simple-input/FormSimpleInput'

// There are usually several different "rules" for each field (e.g. minLength and maxLength).
// In each validator, we only select to display the the first error's message for each field.

const passwordConfirmationErrorMessage = 'Must match the password above'
const ajv = new Ajv({ allErrors: true, strict: false, $data: true })
AjvFormats(ajv)
AjvErrors(ajv)

export const getEmailAccountInputValidator = (schema: JSONSchemaType) => {
  const validateFn = ajv.compile(schema)

  return async (data: CreateEmailAccountFormValues, _context: string) => {
    const valuesAreValid = validateFn(data)
    // The api schema does not validate the password confirmation as it is a UI feature only
    const passwordsMatch = getPasswordsMatch(data)
    if (valuesAreValid && passwordsMatch) return { values: data, errors: {} }

    const fieldErrors = formatFieldErrors<CreateEmailAccountFormValues>(validateFn)

    if (!passwordsMatch) {
      fieldErrors.passwordConfirmation = {
        type: 'passwordConfirmation',
        message: passwordConfirmationErrorMessage
      }
    }

    return {
      values: data,
      errors: fieldErrors
    }
  }
}

export const getValidatorFromJsonSchema = <T extends FieldValues>(schema: JSONSchemaType) => {
  const validateFn = ajv.compile(schema)

  return async (data: T, _context: string) => {
    const valuesAreValid = validateFn(data)
    if (valuesAreValid) return { values: data, errors: {} }

    return {
      values: data,
      errors: formatFieldErrors<T>(validateFn)
    }
  }
}

const getPasswordsMatch = (data: CreateEmailAccountFormValues) => {
  return data.password === data.passwordConfirmation
}

const formatFieldErrors = <T extends FieldValues>(validateFn: ValidateFunction<unknown>) => {
  const fieldErrors = validateFn.errors?.reduce((acc, error) => {
    const formField = error.instancePath.replace('/', '') as keyof T
    if (acc[formField]) return acc
    acc[formField] = { type: error.keyword, message: error.message! } as FieldErrors<T>[keyof T]
    return acc
  }, {} as FieldErrors<T>)

  return (fieldErrors ?? {}) as FieldErrors<T>
}
