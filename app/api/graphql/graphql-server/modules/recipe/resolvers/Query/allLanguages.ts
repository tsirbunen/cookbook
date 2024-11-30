import { LanguageHandler } from '../../../../../../../../app-business-domain/handlers/languages/handler'
import type { QueryResolvers } from './../../../types.generated'

export const allLanguages: NonNullable<QueryResolvers['allLanguages']> = async (_parent, _arg, context) => {
  const handler = new LanguageHandler(context.dataStore)
  return await handler.getAllLanguages()
}
