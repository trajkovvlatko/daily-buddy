import { Form, FormError, FieldError, Label, TextField, Submit } from '@redwoodjs/forms';
import type { EditStorageUnitById, UpdateStorageUnitInput } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';

type FormStorageUnit = NonNullable<EditStorageUnitById['storageUnit']>;

interface StorageUnitFormProps {
  storageUnit?: EditStorageUnitById['storageUnit'];
  onSave: (data: UpdateStorageUnitInput, id?: FormStorageUnit['id']) => void;
  error: RWGqlError;
  loading: boolean;
  roomId?: number;
}

const StorageUnitForm = (props: StorageUnitFormProps) => {
  const onSubmit = (data: FormStorageUnit) => {
    const newRecord = props.roomId ? { ...data, roomId: props.roomId } : data;
    props.onSave(newRecord, props?.storageUnit?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormStorageUnit> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.storageUnit?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="blue-button">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default StorageUnitForm;