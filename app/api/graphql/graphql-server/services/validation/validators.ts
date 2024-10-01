import Ajv from 'ajv'
import AjvFormats from 'ajv-formats'
import AjvErrors from 'ajv-errors'
import { emailAccountInputSchema } from './email-account-input-schema'
import { signInToEmailAccountInputSchema } from './sign-in-to-email-account-input-schema'
import { providerAccountInputSchema } from './provider-account-input-schema'
import { TargetSchema } from '../../../../../../src/types/graphql-schema-types.generated'
import { requestVerificationEmailInputSchema } from './request-verification-email-input-schema'
import { deleteAccountInputSchema } from './delete-account-input-schema'

const validator = new Ajv({ allErrors: true, strict: false, $data: true })
AjvFormats(validator)
AjvErrors(validator)

validator.addSchema(emailAccountInputSchema.schema, TargetSchema.EmailAccountInput)
validator.addSchema(signInToEmailAccountInputSchema.schema, TargetSchema.SignInToEmailAccountInput)
validator.addSchema(requestVerificationEmailInputSchema.schema, TargetSchema.RequestVerificationEmailInput)
validator.addSchema(providerAccountInputSchema.schema, TargetSchema.ProviderAccountInput)
validator.addSchema(deleteAccountInputSchema.schema, TargetSchema.DeleteAccountInput)

export { validator }
