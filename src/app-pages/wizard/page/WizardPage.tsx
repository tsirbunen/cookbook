import { type ChakraProps, Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { type FieldError, type SubmitHandler, useForm } from 'react-hook-form'
import { ApiServiceContext } from '../../../api-service/ApiServiceProvider'
import { Page } from '../../../navigation/router/router'
import { AppStateContext, type AppStateContextType } from '../../../state/StateContextProvider'
import { Dispatch } from '../../../state/reducer'
import { TargetSchema } from '../../../types/graphql-schema-types.generated'
import { type ErrorMapArrays, getValidatorFromJsonSchema } from '../../../utils/formValidators'
import { pageCss } from '../../../utils/styles'
import FormActionButtons from '../../../widgets/form-action-buttons/FormActionButtons'
import FormBooleanInput from '../../../widgets/form-boolean-input/FormBooleanInput'
import FormRadioInputWithHover from '../../../widgets/form-radio-input/FormRadioInputWithHover'
import FormArrayStringInputWithHover from '../../../widgets/form-simple-input/FormArrayStringInputWithHover'
import FormSingleStringInputWithHover from '../../../widgets/form-simple-input/FormSingleStringInputWithHover'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import GroupsInputWithHover, { GroupType } from './GroupsInputWithHover'
import { formLabels } from './formLabels'
import { formDataToRecipeInput } from './helpers'

const createRecipeTitle = 'CREATE NEW RECIPE'
const modifyRecipeTitle = 'MODIFY RECIPE'

export type IngredientInput = {
  id?: number | null
  name: string
  amount?: number | null
  unit?: string | null
}

export type IngredientGroupInputType = {
  id?: number
  title: string
  ingredients: IngredientInput[]
  uiKey: number
}

export type InstructionInput = {
  id?: number | null
  content: string
}

export type InstructionGroupInputType = {
  id?: number
  title: string
  instructions: InstructionInput[]
  uiKey: number
}

export type CreateOrModifyRecipeFormValues = {
  title: string
  description: string | null
  tags: string[]
  language: string
  ovenNeeded: boolean
  isPrivate: boolean
  ingredientGroups: IngredientGroupInputType[]
  instructionGroups: InstructionGroupInputType[]
}

const initialFormValues: CreateOrModifyRecipeFormValues = {
  title: '',
  description: null,
  tags: [],
  language: '',
  ovenNeeded: false,
  isPrivate: false,
  ingredientGroups: [],
  instructionGroups: []
}

type WizardPageProps = {
  recipeId?: number
}

const WizardPage = ({ recipeId }: WizardPageProps) => {
  const { state, dispatch } = useContext(AppStateContext) as AppStateContextType
  const { createRecipe } = useContext(ApiServiceContext)
  const isSignedIn = !!state.account?.token
  const isCreate = !recipeId
  const schemaType = isCreate ? TargetSchema.CreateRecipeInput : TargetSchema.PatchRecipeInput
  const validationSchema = state.validationSchemas?.[schemaType]

  const {
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateOrModifyRecipeFormValues>({
    context: 'createOrModifyRecipe',
    resolver: validationSchema && getValidatorFromJsonSchema(validationSchema),
    mode: 'onTouched',
    defaultValues: initialFormValues
  })

  const triggerValidation = (fieldName: keyof CreateOrModifyRecipeFormValues) => {
    trigger(fieldName)
  }

  const onSubmit: SubmitHandler<CreateOrModifyRecipeFormValues> = async (
    recipeInputVariables: CreateOrModifyRecipeFormValues
  ) => {
    const accountId = state.account?.id
    if (!accountId) return

    const newRecipe = await createRecipe(formDataToRecipeInput(recipeInputVariables, accountId))
    if (!newRecipe) return
    dispatch({ type: Dispatch.ADD_RECIPE, payload: { newRecipe } })
  }

  const requiredProperties = validationSchema?.required ?? []
  const languages = state.languages.map(({ language }) => language)

  if (!isSignedIn) {
    return (
      <Flex {...pageCss} data-testid={`${Page.WIZARD}-page`}>
        <Flex {...outerCss}>
          <Flex {...titleCss}>
            <Title variant={TitleVariant.MediumMedium} title={formLabels.signInRequired} />
          </Flex>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex {...pageCss} data-testid={`${Page.WIZARD}-page`}>
      <Flex {...outerCss}>
        <Flex {...titleCss}>
          <Title variant={TitleVariant.MediumMedium} title={isCreate ? createRecipeTitle : modifyRecipeTitle} />
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormSingleStringInputWithHover
            label={formLabels.title}
            control={control}
            name={'title'}
            placeholder={formLabels.titlePlaceholder}
            info={formLabels.titleInfo}
            isRequired={requiredProperties.includes('title')}
            hoverId={'recipe-title-hover-id'}
          />

          <FormSingleStringInputWithHover
            label={formLabels.description}
            control={control}
            name={'description'}
            info={formLabels.descriptionInfo}
            placeholder={formLabels.descriptionPlaceholder}
            isRequired={requiredProperties.includes('description')}
            hoverId={'recipe-description-hover-id'}
          />

          <FormArrayStringInputWithHover
            label={formLabels.tags}
            control={control}
            name={'tags'}
            info={formLabels.tagsInfo}
            placeholder={formLabels.tagsPlaceholder}
            isRequired={requiredProperties.includes('tags')}
            validateField={triggerValidation}
            hoverId={'recipe-tags-hover-id'}
          />

          <FormRadioInputWithHover
            label={formLabels.language}
            control={control}
            existingOptions={languages}
            name={'language'}
            info={formLabels.languageInfo}
            placeholder={formLabels.languagePlaceholder}
            isRequired={requiredProperties.includes('language')}
            hoverId={'recipe-language-hover-id'}
          />

          <Flex {...switchesCss}>
            <FormBooleanInput
              label={formLabels.isPrivate}
              control={control}
              name={'isPrivate'}
              info={formLabels.isPrivateInfo}
              labelTrue={formLabels.booleanYes.toUpperCase()}
              labelFalse={formLabels.booleanNo.toUpperCase()}
              hoverId={'recipe-is-private-hover-id'}
            />

            <Flex {...switchSpacerCss} />

            <FormBooleanInput
              label={formLabels.ovenNeeded}
              control={control}
              name={'ovenNeeded'}
              info={formLabels.ovenNeededInfo}
              labelTrue={formLabels.booleanYes.toUpperCase()}
              labelFalse={formLabels.booleanNo.toUpperCase()}
              hoverId={'recipe-oven-needed-hover-id'}
            />
          </Flex>

          <GroupsInputWithHover
            groupType={GroupType.Ingredients}
            label={formLabels.ingredientGroups}
            control={control}
            name={'ingredientGroups'}
            info={formLabels.ingredientGroupsInfo}
            isRequired={requiredProperties.includes('ingredientGroups')}
            hoverId={'recipe-ingredient-groups-hover-id'}
            // We need to pass the errors as the validation errors are not set to the
            // component's field state for this form field
            errors={errors.ingredientGroups as FieldError | ErrorMapArrays}
          />

          <GroupsInputWithHover
            groupType={GroupType.Instructions}
            label={formLabels.instructionGroups}
            control={control}
            name={'instructionGroups'}
            info={formLabels.instructionGroupsInfo}
            isRequired={requiredProperties.includes('instructionGroups')}
            hoverId={'recipe-instruction-groups-hover-id'}
            // We need to pass the errors as the validation errors are not set to the
            // component's field state for this form field
            errors={errors.instructionGroups as FieldError | ErrorMapArrays}
          />

          <Flex {...buttonsCss}>
            <FormActionButtons cancelFn={() => {}} clearFn={reset} submitIsDisabled={isSubmitting} />
          </Flex>
        </form>
      </Flex>
    </Flex>
  )
}

export default WizardPage

const outerCss = {
  flexDirection: 'column' as ChakraProps['flexDirection'],
  alignItems: 'start',
  justifyContent: 'start',
  width: '100%',
  overflow: 'scroll',
  overflowX: 'hidden' as ChakraProps['overflowX']
}

const buttonsCss = {
  marginBottom: '30px',
  marginLeft: '10px'
}

const titleCss = {
  marginBottom: '10px',
  marginTop: '30px'
}

const switchesCss = {
  flexDirection: 'row' as ChakraProps['flexDirection'],
  alignItems: 'center',
  justifyContent: 'start'
}

const switchSpacerCss = {
  width: '20px'
}
