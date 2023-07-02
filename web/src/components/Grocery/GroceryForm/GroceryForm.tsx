import { useRef } from 'react';

import { EditGroceryById, UpdateGroceryInput } from 'types/graphql';

import { Form, FormError, FieldError, Label, TextField, Submit, DateField, RWGqlError } from '@redwoodjs/forms';

import { getDefaultDate } from 'src/lib/getDefaultDate';

type FormGrocery = NonNullable<EditGroceryById['grocery']>;

interface GroceryFormProps {
  grocery?: EditGroceryById['grocery'];
  onSave: (data: UpdateGroceryInput, id?: FormGrocery['id']) => Promise<void>;
  error: RWGqlError;
  loading: boolean;
}

const GroceryForm = (props: GroceryFormProps) => {
  const refName = useRef<HTMLInputElement>(null);
  const refExpireAt = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: FormGrocery) => {
    await props.onSave(data, props?.grocery?.id);

    if (refName.current) refName.current.value = '';
    if (refExpireAt.current) refExpireAt.current.value = '';
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormGrocery> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label name="name" className="rw-label" errorClassName="rw-label rw-label-error">
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.grocery?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          ref={refName}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label name="boughtAt" className="rw-label" errorClassName="rw-label rw-label-error">
          Bought at
        </Label>

        <DateField
          name="boughtAt"
          defaultValue={props.grocery?.boughtAt.slice(0, 10) ?? getDefaultDate()}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="boughtAt" className="rw-field-error" />

        <Label name="expireAt" className="rw-label" errorClassName="rw-label rw-label-error">
          Expire at
        </Label>

        <DateField
          name="expireAt"
          defaultValue={props.grocery?.expireAt.slice(0, 10)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          ref={refExpireAt}
        />

        <FieldError name="expireAt" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="blue-button">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default GroceryForm;
