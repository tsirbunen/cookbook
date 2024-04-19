/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultValues, FieldValues, useForm } from 'react-hook-form'

export const withTestFormWrapper = <T, P extends FieldValues>(
  WrappedFormComponent: React.ComponentType<T>,
  onSubmitFn: jest.Mock,
  defaultValues: DefaultValues<P>,
  submitText = 'submit',
  hasOwnSubmitButton = false
): React.ComponentType<Omit<T, 'control'>> => {
  const ComponentWrappedInForm = (props: Omit<T, 'control'>) => {
    const { handleSubmit, control } = useForm<P>({ defaultValues })

    return (
      <form
        onSubmit={handleSubmit((formValues) => {
          onSubmitFn(formValues)
        })}
      >
        <WrappedFormComponent {...(props as T)} control={control} />

        {hasOwnSubmitButton ? null : <button type="submit">{submitText}</button>}
      </form>
    )
  }

  return ComponentWrappedInForm
}
