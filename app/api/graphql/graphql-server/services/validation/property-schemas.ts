// Here we try to provide the user as detailed an error message as possible in each case.

const getMinLengthMessage = (length: number) => `Must be at least ${length} characters long`
const getMaxLengthMessage = (length: number) => `Must be at most ${length} characters long`

const usernameMinLength = 2
const usernameMaxLength = 20

export const usernameSchema = {
  title: 'Username',
  description: 'A name chosen by the account owner. Can in some cases be shown to other users.',
  type: 'string',
  pattern: '^[a-zA-Z]+$',
  minLength: usernameMinLength,
  maxLength: usernameMaxLength,
  errorMessage: {
    pattern: 'Must contain only letters',
    minLength: getMinLengthMessage(usernameMinLength),
    maxLength: getMaxLengthMessage(usernameMinLength)
  }
}

const emailMinLength = 8
const emailMaxLength = 40

export const emailSchema = {
  title: 'Email',
  description: 'Email address of the account owner',
  type: 'string',
  format: 'email',
  minLength: emailMinLength,
  maxLength: emailMaxLength,
  errorMessage: {
    format: 'Must be a valid email address',
    minLength: getMinLengthMessage(emailMinLength),
    maxLength: getMaxLengthMessage(emailMaxLength)
  }
}

const passwordMinLength = 8
const passwordMaxLength = 25
const numberLookahead = '(?=.*[0-9])'
const smallLetterLookahead = '(?=.*[a-z])'
const largeLetterLookahead = '(?=.*[A-Z])'
const specialCharacterLookahead = '(?=.*[!-/:-@[-`{-~])'
const noSpacesLookahead = '(?!.* )'
const passwordContentRequirements = [
  numberLookahead,
  smallLetterLookahead,
  largeLetterLookahead,
  specialCharacterLookahead,
  noSpacesLookahead
]

export const passwordSchema = {
  title: 'Password',
  description: 'A secret string chosen by the account owner used in authentication',
  type: 'string',
  pattern: `^${passwordContentRequirements.join('')}.*$`,
  minLength: passwordMinLength,
  maxLength: passwordMaxLength,
  errorMessage: {
    minLength: getMinLengthMessage(passwordMinLength),
    maxLength: getMaxLengthMessage(passwordMaxLength),
    pattern:
      'Password must contain a digit, a lowercase letter, an uppercase letter and a special character but no spaces'
  }
}
