// Here we try to provide the user as detailed an error message as possible in each case.

const getMinLengthMessage = (length: number, field: string) => `${field} must be at least ${length} characters long!`
const getMaxLengthMessage = (length: number, field: string) => `${field} must be at most ${length} characters long!`

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
    pattern: 'Username must contain only letters',
    minLength: getMinLengthMessage(usernameMinLength, 'Username'),
    maxLength: getMaxLengthMessage(usernameMinLength, 'Username')
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
    format: 'Email must be a valid email address',
    minLength: getMinLengthMessage(emailMinLength, 'Email'),
    maxLength: getMaxLengthMessage(emailMaxLength, 'Email')
  }
}

const passwordMinLength = 8
const passwordMaxLength = 25
const numberLookahead = '(?=.*[0-9])'
const smallLetterLookahead = '(?=.*[a-z])'
const largeLetterLookahead = '(?=.*[A-Z])'
const passwordContentRequirements = [numberLookahead, smallLetterLookahead, largeLetterLookahead]

export const passwordSchema = {
  title: 'Password',
  description: 'A secret string chosen by the account owner used in authentication',
  type: 'string',
  pattern: `^${passwordContentRequirements.join('')}.*$`,
  minLength: passwordMinLength,
  maxLength: passwordMaxLength,
  errorMessage: {
    minLength: getMinLengthMessage(passwordMinLength, 'Password'),
    maxLength: getMaxLengthMessage(passwordMaxLength, 'Password'),
    pattern: 'Password must contain a digit, a lowercase letter, and an uppercase letter'
  }
}

export const idSchema = {
  title: 'Id',
  description: 'An identifier for an entity',
  type: 'number',
  min: 1,
  errorMessage: {
    min: 'Id must be at least 1'
  }
}

export const uuidSchema = {
  title: 'Uuid',
  description: 'Another identifier for an entity',
  type: 'string',
  format: 'uuid',
  errorMessage: {
    format: 'Uuid must be a valid uuid'
  }
}
