import Ajv, { type ValidateFunction } from 'ajv'
import AjvErrors from 'ajv-errors'
import AjvFormats from 'ajv-formats'
import type { FieldError, FieldErrors, FieldValues } from 'react-hook-form'
import type { CreateEmailAccountFormValues } from '../app-pages/account/CreateEmailAccountPage'
import type { JSONSchemaType } from '../types/types'

export type ErrorMap = Record<string, FieldError>
export type ErrorMapOfErrorMaps = Record<string, ErrorMap[]>
export type ErrorMapArrays = FieldError[] | ErrorMap[] | ErrorMapOfErrorMaps[]
export type ErrorMaps = FieldError | ErrorMap | ErrorMapOfErrorMaps

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

export const getValidatorFromJsonSchema = <T extends FieldValues>(schema?: JSONSchemaType) => {
  if (!schema) return undefined

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

const getUpdatedArrayErrors = (indexInArray: number, currentErrors: FieldError[], newError: FieldError) => {
  const nonErrorsInBetween = Array(indexInArray - currentErrors.length).fill(undefined)
  return [...currentErrors, ...nonErrorsInBetween, newError]
}

const getUpdatedDictionaryOfErrors = <
  K extends Array<Record<string, FieldError>> | Array<Record<string, Array<Record<string, FieldError>>>>
>(
  currentErrors: K,
  newError: FieldError | Array<Record<string, FieldError>>,
  indexInArray: number,
  keyInArray: string
): K => {
  let updatedErrors: unknown
  const currentFieldErrors = currentErrors?.[indexInArray] ?? {}
  const updatedFieldErrors = { ...currentFieldErrors, [keyInArray]: newError }

  if (currentErrors.length <= indexInArray) {
    const nonErrorsInBetween = Array(indexInArray - currentErrors.length).fill(undefined)
    updatedErrors = [...(currentErrors ?? []), ...nonErrorsInBetween, updatedFieldErrors]
  } else {
    updatedErrors = currentErrors.map((error, index) => (index === indexInArray ? updatedFieldErrors : error))
  }

  return updatedErrors as K
}

const formatFieldErrors = <T extends FieldValues>(validateFn: ValidateFunction<unknown>) => {
  const fieldErrors = validateFn.errors?.reduce(
    (acc, error) => {
      const items = error.instancePath.split('/')
      const formFieldName = items[1] as keyof T
      const fieldError = { type: error.keyword, message: error?.message }
      let updatedErrors: FieldError | ErrorMapArrays

      // Case 1: The error is a FieldError
      // Example: form field "recipe title" (string)
      if (items.length === 2) {
        updatedErrors = fieldError
      }

      // Case 2: The error is an array of FieldErrors
      // Example: Form field "recipe tags" (array of strings)
      else if (items.length === 3) {
        const indexInArray = Number.parseInt(items[2])
        const errors = (acc[formFieldName] as unknown as FieldError[]) ?? []
        updatedErrors = getUpdatedArrayErrors(indexInArray, errors, fieldError as FieldError)
      }

      // Case 3: The error is an array of FieldError mappings
      // Example: Form field "recipe ingredientGroups" field "title" (string) of a group
      else if (items.length === 4) {
        const indexInArray = Number.parseInt(items[2])
        const keyInArray = items[3]
        const errors = (acc[formFieldName] ?? []) as Array<Record<string, FieldError>>
        updatedErrors = getUpdatedDictionaryOfErrors(errors, fieldError, indexInArray, keyInArray)
      }

      // Case 4: The error is an array of mappings of an array of FieldError mappings
      // Example: Form field "recipe ingredientGroups" > a group > group's field "ingredients"
      // (array of objects) > ingredient's field "amount" (number)
      else if (items.length === 6) {
        const groupIndex = Number.parseInt(items[2])
        const fieldInGroup = items[3]
        const fieldIndex = Number.parseInt(items[4])
        const fieldKey = items[5]
        const errors = (acc[formFieldName] ?? []) as Array<Record<string, Array<Record<string, FieldError>>>>
        const groupErrors = errors?.[groupIndex] ?? {}

        const fieldErrors = groupErrors[fieldInGroup] ?? []
        const updatedGroupFieldErrors = getUpdatedDictionaryOfErrors(fieldErrors, fieldError, fieldIndex, fieldKey)
        updatedErrors = getUpdatedDictionaryOfErrors(errors, updatedGroupFieldErrors, groupIndex, fieldInGroup)
      } else {
        throw new Error('Unhandled error path')
      }

      acc[formFieldName] = updatedErrors as unknown as FieldErrors<T>[keyof T]

      return acc
    },
    {} as FieldErrors<T>
  )

  return (fieldErrors ?? {}) as FieldErrors<T>
}
