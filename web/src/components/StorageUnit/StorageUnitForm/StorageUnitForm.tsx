import { Form, FormError, FieldError, Label, TextField, Submit } from '@redwoodjs/forms';
import type { EditStorageUnitById, UpdateStorageUnitInput } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { navigate, routes } from '@redwoodjs/router';

const DELETE_STORAGE_UNIT_MUTATION = gql`
  mutation DeleteStorageUnitMutation($id: Int!) {
    deleteStorageUnit(id: $id) {
      id
    }
  }
`;

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

  const [deleteStorageUnit] = useMutation(DELETE_STORAGE_UNIT_MUTATION, {
    onCompleted: () => {
      toast.success('StorageUnit deleted');
      navigate(routes.inventory());
    },
    onError: (error) => {
      toast.error(error.message);
    },
    awaitRefetchQueries: true,
  });

  const onDeleteClick = () => {
    if (props.storageUnit && confirm('Are you sure you want to delete storageUnit ' + props.storageUnit.name + '?')) {
      deleteStorageUnit({ variables: { id: props.storageUnit.id } });
    }
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

        <div className="mt-3 flex justify-end">
          {props.storageUnit && (
            <div onClick={onDeleteClick} className="red-button mr-3">
              Delete
            </div>
          )}
          <Submit disabled={props.loading} className="blue-button">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default StorageUnitForm;
