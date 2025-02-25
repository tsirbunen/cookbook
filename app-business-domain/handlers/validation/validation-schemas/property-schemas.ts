const getMinLengthMessage = (length: number, field: string) => `${field} must be at least ${length} characters long!`
const getMaxLengthMessage = (length: number, field: string) => `${field} must be at most ${length} characters long!`

const usernameLengthRange = [2, 20]

export const usernameSchema = {
  title: 'Username',
  description: 'A name chosen by the account owner. Can in some cases be shown to other users.',
  type: 'string',
  pattern: '^[a-zA-Z]+$',
  minLength: usernameLengthRange[0],
  maxLength: usernameLengthRange[1],
  errorMessage: {
    pattern: 'Username must contain only letters',
    minLength: getMinLengthMessage(usernameLengthRange[0], 'Username'),
    maxLength: getMaxLengthMessage(usernameLengthRange[1], 'Username')
  }
}

const emailLengthRange = [8, 40]

export const emailSchema = {
  title: 'Email',
  description: 'Email address of the account owner',
  type: 'string',
  format: 'email',
  minLength: emailLengthRange[0],
  maxLength: emailLengthRange[1],
  errorMessage: {
    format: 'Email must be a valid email address',
    minLength: getMinLengthMessage(emailLengthRange[0], 'Email'),
    maxLength: getMaxLengthMessage(emailLengthRange[1], 'Email')
  }
}

const passwordLengthRange = [8, 25]
const numberLookahead = '(?=.*[0-9])'
const smallLetterLookahead = '(?=.*[a-z])'
const largeLetterLookahead = '(?=.*[A-Z])'
const passwordContentRequirements = [numberLookahead, smallLetterLookahead, largeLetterLookahead]

export const passwordSchema = {
  title: 'Password',
  description: 'A secret string chosen by the account owner used in authentication',
  type: 'string',
  pattern: `^${passwordContentRequirements.join('')}.*$`,
  minLength: passwordLengthRange[0],
  maxLength: passwordLengthRange[1],
  errorMessage: {
    minLength: getMinLengthMessage(passwordLengthRange[0], 'Password'),
    maxLength: getMaxLengthMessage(passwordLengthRange[1], 'Password'),
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

const recipeTitleLengthRange = [4, 100]

export const recipeTitleSchema = {
  title: 'Recipe title',
  description: 'The title of a recipe',
  type: 'string',
  minLength: recipeTitleLengthRange[0],
  maxLength: recipeTitleLengthRange[1],
  errorMessage: {
    minLength: getMinLengthMessage(recipeTitleLengthRange[0], 'Recipe title'),
    maxLength: getMaxLengthMessage(recipeTitleLengthRange[1], 'Recipe title')
  }
}

const recipeDescriptionLengthRange = [4, 200]

export const recipeDescriptionSchema = {
  title: 'Recipe description',
  description: 'The description of a recipe',
  type: ['string', 'null'],
  minLength: recipeDescriptionLengthRange[0],
  maxLength: recipeDescriptionLengthRange[1],
  errorMessage: {
    minLength: getMinLengthMessage(recipeDescriptionLengthRange[0], 'Recipe description'),
    maxLength: getMaxLengthMessage(recipeDescriptionLengthRange[1], 'Recipe description')
  }
}

const tagLengthRange = [3, 20]

export const recipeTagSchema = {
  title: 'Recipe tag',
  description: 'A tag of a recipe',
  type: 'string',
  minLength: tagLengthRange[0],
  maxLength: tagLengthRange[1],
  errorMessage: {
    minLength: getMinLengthMessage(tagLengthRange[0], 'Recipe tag'),
    maxLength: getMaxLengthMessage(tagLengthRange[1], 'Recipe tag')
  }
}

const languageLengthRange = [3, 20]

export const recipeLanguageSchema = {
  title: 'Recipe language',
  description: 'A language of a recipe',
  type: 'string',
  minLength: languageLengthRange[0],
  maxLength: languageLengthRange[1],
  errorMessage: {
    minLength: getMinLengthMessage(languageLengthRange[0], 'Recipe language'),
    maxLength: getMaxLengthMessage(languageLengthRange[1], 'Recipe language')
  }
}

export const ovenNeededSchema = {
  title: 'Is oven needed?',
  description: 'Indicates if an oven is needed for the recipe',
  type: 'boolean',
  errorMessage: {
    type: 'Oven needed must be a boolean value'
  }
}

export const isPrivateSchema = {
  title: 'Is private?',
  description: 'Indicates if the recipe is private or visible to other users of the app',
  type: 'boolean',
  errorMessage: {
    type: 'Is private must be a boolean value'
  }
}

const ingredientNameLengthRange = [2, 50]
const ingredientUnitMaxLength = 20

export const recipeIngredientSchema = {
  title: 'Recipe ingredient',
  description: 'An ingredient of a recipe',
  type: 'object',
  required: ['name'],
  properties: {
    id: idSchema,
    name: {
      type: 'string',
      minLength: ingredientNameLengthRange[0],
      maxLength: ingredientNameLengthRange[1],
      errorMessage: {
        minLength: getMinLengthMessage(ingredientNameLengthRange[0], 'Ingredient name'),
        maxLength: getMaxLengthMessage(ingredientNameLengthRange[1], 'Ingredient name')
      }
    },
    amount: {
      type: ['number', 'null'],
      errorMessage: {
        minimum: 'Ingredient amount must be a number'
      }
    },
    unit: {
      type: ['string', 'null'],
      maxLength: ingredientUnitMaxLength,
      errorMessage: {
        maxLength: getMaxLengthMessage(ingredientUnitMaxLength, 'Ingredient unit')
      }
    },
    groupId: idSchema,
    previousId: idSchema
  },
  errorMessage: {
    properties: {
      name: 'Ingredient must have a name'
    }
  }
}

const ingredientGroupTitleLengthRange = [2, 50]

export const ingredientGroupSchema = {
  title: 'Ingredient group',
  description: 'A group of ingredients of a recipe',
  type: 'object',
  required: ['ingredients'],
  properties: {
    id: idSchema,
    title: {
      type: 'string',
      minLength: ingredientGroupTitleLengthRange[0],
      maxLength: ingredientGroupTitleLengthRange[1],
      errorMessage: {
        minLength: getMinLengthMessage(ingredientGroupTitleLengthRange[0], 'Ingredient group title'),
        maxLength: getMaxLengthMessage(ingredientGroupTitleLengthRange[1], 'Ingredient group title')
      }
    },
    ingredients: {
      type: 'array',
      items: recipeIngredientSchema,
      minItems: 1,
      errorMessage: {
        minItems: 'There must be at least one ingredient!'
      }
    }
  },
  errorMessage: {
    properties: {
      ingredients: 'Ingredient group must have ingredients'
    }
  }
}

const instructionContentLengthRange = [2, 250]

export const recipeInstructionSchema = {
  title: 'Recipe instruction',
  description: 'An instruction of a recipe',
  type: 'object',
  required: ['content'],
  properties: {
    id: idSchema,
    content: {
      type: 'string',
      minLength: instructionContentLengthRange[0],
      maxLength: instructionContentLengthRange[1],
      errorMessage: {
        minLength: getMinLengthMessage(instructionContentLengthRange[0], 'Instruction content'),
        maxLength: getMaxLengthMessage(instructionContentLengthRange[1], 'Instruction content')
      }
    },
    groupId: idSchema,
    previousId: idSchema
  },
  errorMessage: {
    properties: {
      name: 'Instruction must have a content'
    }
  }
}

const instructionGroupTitleLengthRange = [2, 50]

export const instructionGroupSchema = {
  title: 'Instruction group',
  description: 'A group of instructions of a recipe',
  type: 'object',
  required: ['instructions'],
  properties: {
    id: idSchema,
    title: {
      type: 'string',
      minLength: instructionGroupTitleLengthRange[0],
      maxLength: instructionGroupTitleLengthRange[1],
      errorMessage: {
        minLength: getMinLengthMessage(instructionGroupTitleLengthRange[0], 'Instruction group title'),
        maxLength: getMaxLengthMessage(instructionGroupTitleLengthRange[1], 'Instruction group title')
      }
    },
    instructions: {
      type: 'array',
      items: recipeInstructionSchema,
      minItems: 1,
      errorMessage: {
        minItems: 'There must be at least one instruction!'
      }
    }
  },
  errorMessage: {
    properties: {
      instructions: 'Instruction group must have instructions'
    }
  }
}
