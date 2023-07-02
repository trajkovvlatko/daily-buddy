import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Grocery/GroceriesCell';
import { timeTag, truncate } from 'src/lib/formatters';

import type { DeleteGroceryMutationVariables, FindGroceries } from 'types/graphql';

const DELETE_GROCERY_MUTATION = gql`
  mutation DeleteGroceryMutation($id: Int!) {
    deleteGrocery(id: $id) {
      id
    }
  }
`;

const GroceriesList = ({ groceries }: FindGroceries) => {
  const [deleteGrocery] = useMutation(DELETE_GROCERY_MUTATION, {
    onCompleted: () => {
      toast.success('Grocery deleted');
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

  const onDeleteClick = (id: DeleteGroceryMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete grocery ' + id + '?')) {
      deleteGrocery({ variables: { id } });
    }
  };

  return (
    <div className="bg-white p-3">
      <h2 className="h-12 text-lg font-semibold">Groceries</h2>
      <table className="rw-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Bought at</th>
            <th>Expire at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {groceries.map((grocery) => (
            <tr key={grocery.id}>
              <td>{truncate(grocery.name)}</td>
              <td>{grocery.boughtAt.slice(0, 10)}</td>
              <td>{grocery.expireAt.slice(0, 10)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.editGrocery({ id: grocery.id })}
                    title={'Edit grocery ' + grocery.id}
                    className="blue-button mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete grocery ' + grocery.id}
                    className="red-button"
                    onClick={() => onDeleteClick(grocery.id)}
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

export default GroceriesList;
