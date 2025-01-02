import { type ChakraProps, Flex } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Shades } from '../../../constants/shades'
import { ViewSizeContext } from '../../../layout/view-size-service/ViewSizeProvider'
import FormButtonsSelector from '../../../widgets/form-buttons-selector/FormButtonsSelector'
import FormSubmitButtons from '../../../widgets/form-submit-buttons/FormSubmitButtons'
import FormTextAreaSearch from '../../../widgets/form-textarea-search/FormTextAreaSearch'
import Title, { TitleVariant } from '../../../widgets/titles/Title'
import { type RecipesFilterValues, SearchFiltersContext, getEmptyFilterValues } from '../state/SearchFilterProvider'
import { SearchToolsContext } from '../state/SearchToolsProvider'

export const filteringToolDataTestId = 'filtering-tool'

const filteringTitle = 'Filtering'
export const applyFiltersLabel = 'Apply filters'
export const applyChangesLabel = 'Apply changes'
export const clearFormLabel = 'Clear form'
const languagesLabel = 'languages'
const tagsLabel = 'tags'
const ingredientsLabel = 'ingredients to contain'
const ingredientsPlaceholder = 'Type here ingredients...'

// FIXME: Improve this tool
const FilteringTool = () => {
  const { toggleShowFiltering, toggleHideRecipes } = useContext(SearchToolsContext)
  const { isSplitView } = useContext(ViewSizeContext)
  const {
    applyFilters,
    clearFilters,
    updateFormFilters,
    initialValues,
    filtersHaveValues,
    languages,
    tags,
    hasChanges
  } = useContext(SearchFiltersContext)

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting }
  } = useForm<RecipesFilterValues>({
    defaultValues: initialValues
  })

  useEffect(() => {
    const subscription = watch((value) => updateFormFilters(value as RecipesFilterValues))
    return () => subscription.unsubscribe()
  }, [watch, updateFormFilters])

  const onSubmit: SubmitHandler<RecipesFilterValues> = (_filterValues: RecipesFilterValues) => {
    applyFilters()
    if (isSplitView) return

    toggleShowFiltering()
    toggleHideRecipes()
  }

  const clearFormValues = () => {
    reset(getEmptyFilterValues())
    clearFilters()
  }

  const applyLabel = hasChanges ? applyChangesLabel : applyFiltersLabel

  return (
    <Flex {...outerStyle} data-testid={filteringToolDataTestId}>
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
          clearIsDisabled={!filtersHaveValues() || isSubmitting}
          submitIsDisabled={!hasChanges || isSubmitting}
        />
      </form>
    </Flex>
  )
}

export default FilteringTool

const outerStyle = {
  backgroundColor: Shades.VERY_PALE,
  borderRadius: '6px',
  margin: '10px 0px 15px 5px',
  flexDirection: 'column' as ChakraProps['flexDirection'],
  width: '100%'
}
