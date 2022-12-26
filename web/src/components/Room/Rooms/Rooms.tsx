import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Room/RoomsCell';
import { timeTag, truncate } from 'src/lib/formatters';

import type { DeleteRoomMutationVariables, FindRooms } from 'types/graphql';

const DELETE_ROOM_MUTATION = gql`
  mutation DeleteRoomMutation($id: Int!) {
    deleteRoom(id: $id) {
      id
    }
  }
`;

const RoomsList = ({ rooms }: FindRooms) => {
  const [deleteRoom] = useMutation(DELETE_ROOM_MUTATION, {
    onCompleted: () => {
      toast.success('Room deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteRoomMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete room ' + id + '?')) {
      deleteRoom({ variables: { id } });
    }
  };

  return (
    <ul>
      {rooms.map((room) => (
        <li key={room.id}>
          <Link to={routes.inventoryRoom({ roomId: room.id })}>{truncate(room.name)}</Link>
        </li>
      ))}
    </ul>
  );
};

export default RoomsList;
