import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { QUERY } from 'src/components/Room/RoomsCell';
import { truncate } from 'src/lib/formatters';
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
      {rooms.map((room) => {
        const active = location.pathname.includes(`/rooms/${room.id}`) ? 'bg-gray-100' : '';

        return (
          <li key={room.id}>
            <div className={`block cursor-pointer border-t-2 border-t-gray-100 ${active}`}>
              <Link to={routes.inventoryRoom({ roomId: room.id })} className="block py-4 pl-5 text-sm">
                {truncate(room.name)}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default RoomsList;
