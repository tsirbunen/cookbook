import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import { type GraphQLSchema, defaultFieldResolver } from 'graphql'
import { ValidationTarget } from '../../../../../src/types/graphql-schema-types.generated'
import { validateInput } from '../services/validation/service'

const directiveName = 'isValidInput'

export const isValidInputTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0]

      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig

        return {
          ...fieldConfig,
          resolve: async (source, args, context, info) => {
            const errors = getInputValidationErrors(args)
            if (errors) return errors

            const result = await resolve(source, args, context, info)
            return result
          }
        }
      }
    }
  })

type InputToValidate = { key: string; target: ValidationTarget }
type Args = Record<string, object>

const validationMap: Record<string, ValidationTarget> = {
  createRecipeInput: ValidationTarget.CreateRecipeInput,
  recipePatch: ValidationTarget.PatchRecipeInput,
  emailAccountInput: ValidationTarget.EmailAccountInput,
  signInToEmailAccountInput: ValidationTarget.SignInToEmailAccountInput,
  nonEmailAccountInput: ValidationTarget.ProviderAccountInput,
  emailInput: ValidationTarget.RequestVerificationEmailInput,
  deleteAccountInput: ValidationTarget.DeleteAccountInput
}

const getInputValidationErrors = (args: Args) => {
  const inputsToValidate = getInputsToValidate(args)
  if (inputsToValidate.length) {
    const errors = getValidationErrors(inputsToValidate, args)
    if (errors) return errors
  }

  return null
}

const getInputsToValidate = (args: Args) => {
  return Object.keys(args).reduce<InputToValidate[]>((toValidateAcc, key) => {
    if (key in validationMap) toValidateAcc.push({ key, target: validationMap[key] })
    return toValidateAcc
  }, [])
}

const getValidationErrors = (toValidate: InputToValidate[], args: Args) => {
  const errors = toValidate.reduce<string[]>((validationErrors, { key, target }) => {
    const input = args[key]
    const validationError = validateInput(input, target)
    if (validationError) validationErrors.push(validationError)
    return validationErrors
  }, [])

  if (errors.length) return getBadInputError(errors.join(', '))
  return null
}

const getBadInputError = (errorMessage: string) => {
  return {
    __typename: 'BadInputError',
    errorMessage
  }
}
