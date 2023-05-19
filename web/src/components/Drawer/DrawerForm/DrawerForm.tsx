import type { EditDrawerById, UpdateDrawerInput } from 'types/graphql';

import { Form, FormError, FieldError, Label, NumberField, TextField, Submit } from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';
import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const DELETE_DRAWER_MUTATION = gql`
  mutation DeleteDrawerMutation($id: Int!) {
    deleteDrawer(id: $id) {
      id
    }
  }
`;

type FormDrawer = NonNullable<EditDrawerById['drawer']>;

interface DrawerFormProps {
  drawer?: EditDrawerById['drawer'];
  onSave: (data: UpdateDrawerInput, id?: FormDrawer['id']) => void;
  error: RWGqlError;
  loading: boolean;
  storageUnitId?: number;
}

const DrawerForm = (props: DrawerFormProps) => {
  const onSubmit = (data: FormDrawer) => {
    const newRecord = props.storageUnitId ? { ...data, storageUnitId: props.storageUnitId } : data;
    props.onSave(newRecord, props?.drawer?.id);
  };

  const [deleteDrawer] = useMutation(DELETE_DRAWER_MUTATION, {
    onCompleted: () => {
      toast.success('Drawer deleted');
      navigate(routes.inventory());
    },
    onError: (error) => {
      toast.error(error.message);
    },
    awaitRefetchQueries: true,
  });

  const onDeleteClick = () => {
    if (props.drawer && confirm('Are you sure you want to delete drawer ' + props.drawer.note + '?')) {
      deleteDrawer({ variables: { id: props.drawer.id } });
    }
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormDrawer> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label name="level" className="rw-label" errorClassName="rw-label rw-label-error">
          Level
        </Label>

        <NumberField
          name="level"
          defaultValue={props.drawer?.level}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="level" className="rw-field-error" />

        <Label name="note" className="rw-label" errorClassName="rw-label rw-label-error">
          Note
        </Label>

        <TextField
          name="note"
          defaultValue={props.drawer?.note}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="note" className="rw-field-error" />

        <div className="mt-3 flex justify-end">
          {props.drawer && (
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

export default DrawerForm;
