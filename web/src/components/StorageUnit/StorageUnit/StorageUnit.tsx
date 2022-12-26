import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { timeTag } from 'src/lib/formatters';

import type { DeleteStorageUnitMutationVariables, FindStorageUnitById } from 'types/graphql';

const DELETE_STORAGE_UNIT_MUTATION = gql`
  mutation DeleteStorageUnitMutation($id: Int!) {
    deleteStorageUnit(id: $id) {
      id
    }
  }
`;

interface Props {
  storageUnit: NonNullable<FindStorageUnitById['storageUnit']>;
}

const StorageUnit = ({ storageUnit }: Props) => {
  const [deleteStorageUnit] = useMutation(DELETE_STORAGE_UNIT_MUTATION, {
    onCompleted: () => {
      toast.success('StorageUnit deleted');
      navigate(routes.storageUnits());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteStorageUnitMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete storageUnit ' + id + '?')) {
      deleteStorageUnit({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">StorageUnit {storageUnit.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{storageUnit.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{storageUnit.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(storageUnit.createdAt)}</td>
            </tr>
            <tr>
              <th>Room id</th>
              <td>{storageUnit.roomId}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{storageUnit.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editStorageUnit({ id: storageUnit.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
        <button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(storageUnit.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default StorageUnit;
