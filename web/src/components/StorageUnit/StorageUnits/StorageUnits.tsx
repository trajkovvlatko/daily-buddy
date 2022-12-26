import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { QUERY } from 'src/components/StorageUnit/StorageUnitsCell';
import { truncate } from 'src/lib/formatters';
import type { DeleteStorageUnitMutationVariables, FindStorageUnits } from 'types/graphql';

const DELETE_STORAGE_UNIT_MUTATION = gql`
  mutation DeleteStorageUnitMutation($id: Int!) {
    deleteStorageUnit(id: $id) {
      id
    }
  }
`;

const StorageUnitsList = ({ storageUnits }: FindStorageUnits) => {
  const [deleteStorageUnit] = useMutation(DELETE_STORAGE_UNIT_MUTATION, {
    onCompleted: () => {
      toast.success('StorageUnit deleted');
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

  const onDeleteClick = (id: DeleteStorageUnitMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete storageUnit ' + id + '?')) {
      deleteStorageUnit({ variables: { id } });
    }
  };

  return (
    <ul>
      {storageUnits.map((storageUnit) => (
        <li key={storageUnit.id}>
          <Link to={routes.inventoryStorageUnit({ roomId: storageUnit.roomId, storageUnitId: storageUnit.id })}>
            {truncate(storageUnit.name)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default StorageUnitsList;
