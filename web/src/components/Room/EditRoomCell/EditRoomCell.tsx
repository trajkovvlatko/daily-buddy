import type { EditRoomById, UpdateRoomInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import RoomForm from 'src/components/Room/RoomForm';

export const QUERY = gql`
  query EditRoomById($id: Int!) {
    room: room(id: $id) {
      id
      name
    }
  }
`;
const UPDATE_ROOM_MUTATION = gql`
  mutation UpdateRoomMutation($id: Int!, $input: UpdateRoomInput!) {
    updateRoom(id: $id, input: $input) {
      id
      name
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ room }: CellSuccessProps<EditRoomById>) => {
  const [updateRoom, { loading, error }] = useMutation(UPDATE_ROOM_MUTATION, {
    onCompleted: () => {
      toast.success('Room updated');
      navigate(routes.rooms());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateRoomInput, id: EditRoomById['room']['id']) => {
    updateRoom({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Room {room?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <RoomForm room={room} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
