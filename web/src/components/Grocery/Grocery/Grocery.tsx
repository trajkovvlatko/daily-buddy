import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { timeTag } from 'src/lib/formatters';

import type { DeleteGroceryMutationVariables, FindGroceryById } from 'types/graphql';

const DELETE_GROCERY_MUTATION = gql`
  mutation DeleteGroceryMutation($id: Int!) {
    deleteGrocery(id: $id) {
      id
    }
  }
`;

interface Props {
  grocery: NonNullable<FindGroceryById['grocery']>;
}

const Grocery = ({ grocery }: Props) => {
  const [deleteGrocery] = useMutation(DELETE_GROCERY_MUTATION, {
    onCompleted: () => {
      toast.success('Grocery deleted');
      navigate(routes.groceries());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteGroceryMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete grocery ' + id + '?')) {
      deleteGrocery({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Grocery {grocery.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{grocery.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{grocery.name}</td>
            </tr>
            <tr>
              <th>Bought at</th>
              <td>{timeTag(grocery.boughtAt)}</td>
            </tr>
            <tr>
              <th>Expire at</th>
              <td>{timeTag(grocery.expireAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link to={routes.editGrocery({ id: grocery.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
        <button type="button" className="rw-button rw-button-red" onClick={() => onDeleteClick(grocery.id)}>
          Delete
        </button>
      </nav>
    </>
  );
};

export default Grocery;
