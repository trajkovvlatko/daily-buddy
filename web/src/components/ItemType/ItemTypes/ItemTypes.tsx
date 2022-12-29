import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { QUERY } from 'src/components/ItemType/ItemTypesCell';
import { truncate } from 'src/lib/formatters';
import type { DeleteItemTypeMutationVariables, FindItemTypes } from 'types/graphql';

const DELETE_ITEM_TYPE_MUTATION = gql`
  mutation DeleteItemTypeMutation($id: Int!) {
    deleteItemType(id: $id) {
      id
    }
  }
`;

const ItemTypesList = ({ itemTypes }: FindItemTypes) => {
  const [deleteItemType] = useMutation(DELETE_ITEM_TYPE_MUTATION, {
    onCompleted: () => {
      toast.success('ItemType deleted');
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

  const onDeleteClick = (id: DeleteItemTypeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete itemType ' + id + '?')) {
      deleteItemType({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Item type</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {itemTypes.map((itemType) => (
            <tr key={itemType.id}>
              <td>{truncate(itemType.id)}</td>
              <td>{truncate(itemType.itemType)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.itemType({ id: itemType.id })}
                    title={'Show itemType ' + itemType.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editItemType({ id: itemType.id })}
                    title={'Edit itemType ' + itemType.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete itemType ' + itemType.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(itemType.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTypesList;
