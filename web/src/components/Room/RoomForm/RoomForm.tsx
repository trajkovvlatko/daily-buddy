import type { EditRoomById, UpdateRoomInput } from 'types/graphql';

import { Form, FormError, FieldError, Label, TextField, Submit } from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';
import { back } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

type FormRoom = NonNullable<EditRoomById['room']>;

interface RoomFormProps {
  room?: EditRoomById['room'];
  onSave: (data: UpdateRoomInput, id?: FormRoom['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const DELETE_ROOM_MUTATION = gql`
  mutation DeleteRoomMutation($id: Int!) {
    deleteRoom(id: $id) {
      id
    }
  }
`;

const RoomForm = (props: RoomFormProps) => {
  const onSubmit = (data: FormRoom) => {
    props.onSave(data, props?.room?.id);
  };

  const [deleteRoom] = useMutation(DELETE_ROOM_MUTATION, {
    onCompleted: () => {
      toast.success('Room deleted');
      back();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    awaitRefetchQueries: true,
  });

  const onDeleteClick = () => {
    if (props.room && confirm('Are you sure you want to delete room ' + props.room.name + '?')) {
      deleteRoom({ variables: { id: props.room.id } });
    }
  };

  return (
    <div>
      <Form<FormRoom> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.room?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <FieldError name="userId" className="rw-field-error" />

        <div className="mt-3 flex justify-end">
          {props.room && (
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

export default RoomForm;
