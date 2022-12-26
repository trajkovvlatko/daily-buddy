import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { timeTag } from 'src/lib/formatters';

import type { DeleteRoomMutationVariables, FindRoomById } from 'types/graphql';

const DELETE_ROOM_MUTATION = gql`
  mutation DeleteRoomMutation($id: Int!) {
    deleteRoom(id: $id) {
      id
    }
  }
`;

interface Props {
  room: NonNullable<FindRoomById['room']>;
}

const Room = ({ room }: Props) => {
  const [deleteRoom] = useMutation(DELETE_ROOM_MUTATION, {
    onCompleted: () => {
      toast.success('Room deleted');
      navigate(routes.rooms());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteRoomMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete room ' + id + '?')) {
      deleteRoom({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Room {room.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{room.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{room.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(room.createdAt)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{room.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editRoom({ id: room.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
        <button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(room.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default Room;
