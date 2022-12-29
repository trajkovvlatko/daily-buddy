import { Form, FormError, FieldError, Label, TextField, NumberField, Submit } from '@redwoodjs/forms';

import type { EditItemById, UpdateItemInput } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';

type FormItem = NonNullable<EditItemById['item']>;

interface ItemFormProps {
  item?: EditItemById['item'];
  onSave: (data: UpdateItemInput, id?: FormItem['id']) => void;
  error: RWGqlError;
  loading: boolean;
  drawerId?: number;
}

const ItemForm = (props: ItemFormProps) => {
  const onSubmit = (data: FormItem) => {
    const newRecord = props.drawerId ? { ...data, drawerId: props.drawerId } : data;
    props.onSave(newRecord, props?.item?.id);
  };

  return (
    <div>
      <Form<FormItem> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.item?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label name="colorId" className="rw-label" errorClassName="rw-label rw-label-error">
          Color id
        </Label>

        <NumberField
          name="colorId"
          defaultValue={props.item?.colorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="colorId" className="rw-field-error" />

        <Label name="itemTypeId" className="rw-label" errorClassName="rw-label rw-label-error">
          Item type id
        </Label>

        <NumberField
          name="itemTypeId"
          defaultValue={props.item?.itemTypeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="itemTypeId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default ItemForm;
