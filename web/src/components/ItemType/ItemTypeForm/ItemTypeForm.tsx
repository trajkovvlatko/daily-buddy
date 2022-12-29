import { Form, FormError, FieldError, Label, TextField, Submit } from '@redwoodjs/forms';
import type { EditItemTypeById, UpdateItemTypeInput } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';

type FormItemType = NonNullable<EditItemTypeById['itemType']>;

interface ItemTypeFormProps {
  itemType?: EditItemTypeById['itemType'];
  onSave: (data: UpdateItemTypeInput, id?: FormItemType['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const ItemTypeForm = (props: ItemTypeFormProps) => {
  const onSubmit = (data: FormItemType) => {
    props.onSave(data, props?.itemType?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormItemType> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label name="itemType" className="rw-label" errorClassName="rw-label rw-label-error">
          Item type
        </Label>

        <TextField
          name="itemType"
          defaultValue={props.itemType?.itemType}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="itemType" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default ItemTypeForm;
