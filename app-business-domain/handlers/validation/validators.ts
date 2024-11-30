import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'
import AjvFormats from 'ajv-formats'
import { createRecipeInputSchema } from './validation-schemas/create-recipe-input-schema'
import { deleteAccountInputSchema } from './validation-schemas/delete-account-input-schema'
import { emailAccountInputSchema } from './validation-schemas/email-account-input-schema'
import { patchRecipeInputSchema } from './validation-schemas/patch-recipe-input-schema'
import { providerAccountInputSchema } from './validation-schemas/provider-account-input-schema'
import { requestVerificationEmailInputSchema } from './validation-schemas/request-verification-email-input-schema'
import { signInToEmailAccountInputSchema } from './validation-schemas/sign-in-to-email-account-input-schema'
import { ValidationTarget } from '../../../app-ui/types/graphql-schema-types.generated'

const validator = new Ajv({ allErrors: true, strict: false, $data: true })
AjvFormats(validator)
AjvErrors(validator)

validator.addSchema(emailAccountInputSchema.schema, ValidationTarget.EmailAccountInput)
validator.addSchema(signInToEmailAccountInputSchema.schema, ValidationTarget.SignInToEmailAccountInput)
validator.addSchema(requestVerificationEmailInputSchema.schema, ValidationTarget.RequestVerificationEmailInput)
validator.addSchema(providerAccountInputSchema.schema, ValidationTarget.ProviderAccountInput)
validator.addSchema(deleteAccountInputSchema.schema, ValidationTarget.DeleteAccountInput)
validator.addSchema(createRecipeInputSchema.schema, ValidationTarget.CreateRecipeInput)
validator.addSchema(patchRecipeInputSchema.schema, ValidationTarget.PatchRecipeInput)

export { validator }
