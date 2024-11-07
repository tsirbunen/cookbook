import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'
import AjvFormats from 'ajv-formats'
import { TargetSchema } from '../../../../../../src/types/graphql-schema-types.generated'
import { createRecipeInputSchema } from './create-recipe-input-schema'
import { deleteAccountInputSchema } from './delete-account-input-schema'
import { emailAccountInputSchema } from './email-account-input-schema'
import { patchRecipeInputSchema } from './patch-recipe-input-schema'
import { providerAccountInputSchema } from './provider-account-input-schema'
import { requestVerificationEmailInputSchema } from './request-verification-email-input-schema'
import { signInToEmailAccountInputSchema } from './sign-in-to-email-account-input-schema'

const validator = new Ajv({ allErrors: true, strict: false, $data: true })
AjvFormats(validator)
AjvErrors(validator)

validator.addSchema(emailAccountInputSchema.schema, TargetSchema.EmailAccountInput)
validator.addSchema(signInToEmailAccountInputSchema.schema, TargetSchema.SignInToEmailAccountInput)
validator.addSchema(requestVerificationEmailInputSchema.schema, TargetSchema.RequestVerificationEmailInput)
validator.addSchema(providerAccountInputSchema.schema, TargetSchema.ProviderAccountInput)
validator.addSchema(deleteAccountInputSchema.schema, TargetSchema.DeleteAccountInput)
validator.addSchema(createRecipeInputSchema.schema, TargetSchema.CreateRecipeInput)
validator.addSchema(patchRecipeInputSchema.schema, TargetSchema.PatchRecipeInput)

export { validator }
