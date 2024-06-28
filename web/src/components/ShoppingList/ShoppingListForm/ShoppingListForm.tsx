import type { EditShoppingListById, UpdateShoppingListInput } from 'types/graphql';

import { Form, FormError, FieldError, Label, TextField, Submit } from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';

type FormShoppingList = NonNullable<EditShoppingListById['shoppingList']>;

interface ShoppingListFormProps {
  shoppingList?: EditShoppingListById['shoppingList'];
  onSave: (data: UpdateShoppingListInput, id?: FormShoppingList['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const ShoppingListForm = (props: ShoppingListFormProps) => {
  const onSubmit = (data: FormShoppingList) => {
    props.onSave(data, props?.shoppingList?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormShoppingList> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.shoppingList?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default ShoppingListForm;
