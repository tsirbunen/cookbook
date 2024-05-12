import { ChakraProps, Flex } from '@chakra-ui/react'
import { FiltersContext, RecipesFilterValues, getEmptyFilterValues } from '../page/FilteringProvider'
import { useContext, useEffect } from 'react'
import { ColorCodes } from '../../../theme/theme'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormSubmitButtons from '../../../widgets/form-submit-buttons/FormSubmitButtons'
import FormButtonsSelector from '../../../widgets/form-buttons-selector/FormButtonsSelector'
import FormTextAreaSearch from '../../../widgets/form-textarea-search/FormTextAreaSearch'
import { RecipesViewingContext } from '../page/SearchRecipesProvider'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'

export const filteringManagementToolDataTestId = 'filtering-management-tool'

// TODO: PItäisikö voida myös valita, mitä raaka-aineita ei saa olla?

const filteringTitle = 'Filtering'
export const applyFiltersLabel = 'Apply filters'
export const applyChangesLabel = 'Apply changes'
export const clearFormLabel = 'Clear form'
const languagesLabel = 'languages'
const tagsLabel = 'tags'
const ingredientsLabel = 'ingredients'
const ingredientsPlaceholder = 'Type here ingredients...'

const FilteringManagementTool = () => {
  const { toggleShowFiltering, toggleHideRecipes } = useContext(RecipesViewingContext)
  const { isSplitView } = useContext(ViewSizeContext)
  const {
    applyFilters,
    clearFilters,
    updateLocalFilters,
    initialValues,
    filtersHaveValues,
    filtersHaveChanges,
    hasStoredFilters,
    languages,
    tags
  } = useContext(FiltersContext)

  const { handleSubmit, control, watch, reset, formState } = useForm<RecipesFilterValues>({
    defaultValues: initialValues
  })

  useEffect(() => {
    const subscription = watch((value) => {
      updateLocalFilters(value as RecipesFilterValues)
    })

    return () => subscription.unsubscribe()
  }, [watch])

  const { isSubmitting } = formState

  const onSubmit: SubmitHandler<RecipesFilterValues> = (_filterValues: RecipesFilterValues) => {
    applyFilters()
    if (!isSplitView) {
      toggleShowFiltering()
      toggleHideRecipes()
    }
  }

  const clearFormValues = () => {
    reset(getEmptyFilterValues())
    clearFilters()
  }

  const hasValuesToClear = filtersHaveValues()
  const hasChanges = filtersHaveChanges()
  const clearIsDisabled = (!hasValuesToClear && !hasChanges) || isSubmitting
  const submitIsDisabled = !hasChanges || isSubmitting
  const applyLabel = hasChanges ? (!hasStoredFilters ? applyFiltersLabel : applyChangesLabel) : applyFiltersLabel

  return (
    <Flex {...outerStyle} data-testid={filteringManagementToolDataTestId}>
      <Title title={filteringTitle.toUpperCase()} variant={TitleVariant.MediumRegular} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormButtonsSelector label={languagesLabel} name={'languages'} control={control} options={languages} />
        <FormButtonsSelector label={tagsLabel} name={'tags'} control={control} options={tags} />

        <FormTextAreaSearch
          label={ingredientsLabel}
          name={'ingredients'}
          control={control}
          placeholder={ingredientsPlaceholder}
        />

        <FormSubmitButtons
          labelCancel={clearFormLabel.toUpperCase()}
          labelSubmit={applyLabel.toUpperCase()}
          clearFormValues={clearFormValues}
          clearIsDisabled={clearIsDisabled}
          submitIsDisabled={submitIsDisabled}
        />
      </form>
    </Flex>
  )
}

export default FilteringManagementTool

const outerStyle = {
  backgroundColor: ColorCodes.PALE,
  borderRadius: '6px',
  margin: '10px 0px 15px 5px',
  flexDirection: 'column' as ChakraProps['flexDirection'],
  width: '100%'
}
