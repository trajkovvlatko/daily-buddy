import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { timeTag } from 'src/lib/formatters';

import type { DeleteDrawerMutationVariables, FindDrawerById } from 'types/graphql';

const DELETE_DRAWER_MUTATION = gql`
  mutation DeleteDrawerMutation($id: Int!) {
    deleteDrawer(id: $id) {
      id
    }
  }
`;

interface Props {
  drawer: NonNullable<FindDrawerById['drawer']>;
}

const Drawer = ({ drawer }: Props) => {
  const [deleteDrawer] = useMutation(DELETE_DRAWER_MUTATION, {
    onCompleted: () => {
      toast.success('Drawer deleted');
      navigate(routes.drawers());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteDrawerMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete drawer ' + id + '?')) {
      deleteDrawer({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Drawer {drawer.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{drawer.id}</td>
            </tr>
            <tr>
              <th>Level</th>
              <td>{drawer.level}</td>
            </tr>
            <tr>
              <th>Note</th>
              <td>{drawer.note}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(drawer.createdAt)}</td>
            </tr>
            <tr>
              <th>Storage unit id</th>
              <td>{drawer.storageUnitId}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{drawer.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editDrawer({ id: drawer.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
        <button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(drawer.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default Drawer;
