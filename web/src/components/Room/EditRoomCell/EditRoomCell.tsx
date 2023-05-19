import type { EditRoomById, UpdateRoomInput } from 'types/graphql';

import { back } from '@redwoodjs/router';
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
      back();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: UpdateRoomInput, id: EditRoomById['room']['id']) => {
    updateRoom({ variables: { id, input } });
  };

  return (
    <div>
      <h2 className="h2">Edit Room {room?.name}</h2>
      <div className="px-6">
        <RoomForm room={room} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  );
};
