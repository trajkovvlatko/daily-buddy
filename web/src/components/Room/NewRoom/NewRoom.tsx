import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import RoomForm from 'src/components/Room/RoomForm';

import type { CreateRoomInput } from 'types/graphql';

const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoomMutation($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
    }
  }
`;

const NewRoom = ({ callback }: { callback: () => void }) => {
  const [createRoom, { loading, error }] = useMutation(CREATE_ROOM_MUTATION, {
    onCompleted: () => {
      toast.success('Room created');
      callback();
    },
    refetchQueries: ['FindRooms'],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateRoomInput) => {
    createRoom({ variables: { input } });
  };

  return <RoomForm onSave={onSave} loading={loading} error={error} />;
};

export default NewRoom;
